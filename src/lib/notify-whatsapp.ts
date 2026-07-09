interface KiwifyProduct {
  product_name?: string;
  name?: string;
}

interface KiwifyCustomer {
  full_name?: string;
  name?: string;
  first_name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
}

interface KiwifyPurchase {
  original_offer_price?: number;
  charge_amount?: number;
  payment_method?: string;
}

export interface KiwifyWebhookPayload {
  webhook_event_type?: string;
  order_id?: string;
  order_ref?: string;
  order_status?: string;
  status?: string;
  token?: string;
  product?: KiwifyProduct;
  Product?: KiwifyProduct;
  customer?: KiwifyCustomer;
  Customer?: KiwifyCustomer;
  purchase?: KiwifyPurchase;
  Commissions?: {
    charge_amount?: number;
  };
  data?: Record<string, unknown>;
}

export function normalizeKiwifyPayload(payload: KiwifyWebhookPayload): KiwifyWebhookPayload {
  if (!payload.data || typeof payload.data !== 'object') {
    return payload;
  }

  const data = payload.data as KiwifyWebhookPayload;
  return {
    ...payload,
    ...data,
    webhook_event_type: payload.webhook_event_type ?? data.webhook_event_type ?? payload.status,
    order_id: payload.order_id ?? data.order_id ?? data.order_ref,
    order_status: payload.order_status ?? data.order_status ?? data.status,
    product: payload.product ?? payload.Product ?? data.product ?? data.Product,
    customer: payload.customer ?? payload.Customer ?? data.customer ?? data.Customer,
    purchase: payload.purchase ?? data.purchase,
    Commissions: payload.Commissions ?? data.Commissions,
  };
}

export function formatKiwifyPurchaseMessage(payload: KiwifyWebhookPayload): string {
  const normalized = normalizeKiwifyPayload(payload);
  const customer = normalized.customer ?? normalized.Customer;
  const product = normalized.product ?? normalized.Product;
  const productName = product?.product_name ?? product?.name ?? 'Produto';
  const customerName =
    (customer?.full_name ??
      customer?.name ??
      [customer?.first_name].filter(Boolean).join(' ')) || 'Cliente';
  const customerEmail = customer?.email ?? '—';
  const customerPhone = customer?.mobile ?? customer?.phone ?? '—';
  const orderId = normalized.order_id ?? normalized.order_ref ?? '—';
  const price =
    normalized.purchase?.original_offer_price ??
    (normalized.purchase?.charge_amount != null
      ? normalized.purchase.charge_amount / 100
      : undefined) ??
    (normalized.Commissions?.charge_amount != null
      ? normalized.Commissions.charge_amount / 100
      : undefined);

  const priceText = price != null ? `R$ ${price.toFixed(2).replace('.', ',')}` : '—';

  return [
    '✅ Nova compra na Kiwify!',
    '',
    `Produto: ${productName}`,
    `Cliente: ${customerName}`,
    `E-mail: ${customerEmail}`,
    `Telefone: ${customerPhone}`,
    `Valor: ${priceText}`,
    `Pedido: ${orderId}`,
  ].join('\n');
}

export function isKiwifyApprovedPurchase(payload: KiwifyWebhookPayload): boolean {
  const normalized = normalizeKiwifyPayload(payload);
  const eventType = normalized.webhook_event_type?.toLowerCase();
  const status = (normalized.order_status ?? normalized.status)?.toLowerCase();

  if (
    eventType === 'compra_aprovada' ||
    eventType === 'order_approved' ||
    eventType === 'paid' ||
    eventType === 'approved'
  ) {
    return true;
  }

  return status === 'paid' || status === 'approved';
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.CALLMEBOT_API_KEY ||
      (process.env.ZAPI_INSTANCE_ID && process.env.ZAPI_TOKEN)
  );
}

function formatNotifyPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55')) return `+${digits}`;
  return `+55${digits}`;
}

function isCallMeBotSuccess(body: string): boolean {
  const text = body.toLowerCase();
  return (
    text.includes('queue') ||
    text.includes('sent') ||
    text.includes('added') ||
    text.includes('ok')
  );
}

export async function sendWhatsAppNotification(message: string): Promise<{
  sent: boolean;
  provider?: string;
  error?: string;
}> {
  const phone = formatNotifyPhone(process.env.WHATSAPP_NOTIFY_PHONE ?? '5581991821954');
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;

  if (callMeBotKey) {
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone', phone);
    url.searchParams.set('text', message);
    url.searchParams.set('apikey', callMeBotKey);
    url.searchParams.set('source', 'deploy-landing');

    const res = await fetch(url.toString());
    const body = await res.text().catch(() => '');

    if (!res.ok || !isCallMeBotSuccess(body)) {
      return {
        sent: false,
        provider: 'callmebot',
        error: body || `HTTP ${res.status}`,
      };
    }

    return { sent: true, provider: 'callmebot' };
  }

  const zApiInstance = process.env.ZAPI_INSTANCE_ID;
  const zApiToken = process.env.ZAPI_TOKEN;
  const zApiClientToken = process.env.ZAPI_CLIENT_TOKEN;

  if (zApiInstance && zApiToken) {
    const res = await fetch(
      `https://api.z-api.io/instances/${zApiInstance}/token/${zApiToken}/send-text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(zApiClientToken ? { 'Client-Token': zApiClientToken } : {}),
        },
        body: JSON.stringify({ phone, message }),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { sent: false, provider: 'z-api', error: body || `HTTP ${res.status}` };
    }

    return { sent: true, provider: 'z-api' };
  }

  return {
    sent: false,
    error: 'Configure CALLMEBOT_API_KEY ou Z-API no Netlify',
  };
}

export async function sendEmailNotification(
  subject: string,
  message: string,
  replyTo?: string
): Promise<{ sent: boolean; provider?: string; error?: string }> {
  const notifyEmail = process.env.NOTIFY_EMAIL ?? 'contato@deploysolucoes.com.br';

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        message,
        _replyto: replyTo,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { sent: false, provider: 'email', error: body || `HTTP ${res.status}` };
    }

    return { sent: true, provider: 'email' };
  } catch (error) {
    return {
      sent: false,
      provider: 'email',
      error: error instanceof Error ? error.message : 'Erro ao enviar e-mail',
    };
  }
}

export async function sendLeadNotification(message: string, options?: { replyTo?: string }) {
  const whatsapp = await sendWhatsAppNotification(message);
  if (whatsapp.sent) {
    return { ok: true, channels: ['whatsapp'], whatsapp };
  }

  const email = await sendEmailNotification(
    'Nova intenção de compra - Deploy Soluções',
    message,
    options?.replyTo
  );

  if (email.sent) {
    return { ok: true, channels: ['email'], whatsapp, email };
  }

  return { ok: false, whatsapp, email };
}
