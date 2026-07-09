interface KiwifyWebhookPayload {
  webhook_event_type?: string;
  order_id?: string;
  order_status?: string;
  product?: {
    product_name?: string;
    name?: string;
  };
  Product?: {
    product_name?: string;
    name?: string;
  };
  customer?: {
    full_name?: string;
    name?: string;
    email?: string;
    mobile?: string;
    phone?: string;
  };
  Customer?: {
    full_name?: string;
    name?: string;
    email?: string;
    mobile?: string;
    phone?: string;
  };
  purchase?: {
    original_offer_price?: number;
    charge_amount?: number;
    payment_method?: string;
  };
  Commissions?: {
    charge_amount?: number;
  };
}

export function formatKiwifyPurchaseMessage(payload: KiwifyWebhookPayload): string {
  const customer = payload.customer ?? payload.Customer;
  const product = payload.product ?? payload.Product;
  const productName = product?.product_name ?? product?.name ?? 'Produto';
  const customerName = customer?.full_name ?? customer?.name ?? 'Cliente';
  const customerEmail = customer?.email ?? '—';
  const customerPhone = customer?.mobile ?? customer?.phone ?? '—';
  const orderId = payload.order_id ?? '—';
  const price =
    payload.purchase?.original_offer_price ??
    (payload.purchase?.charge_amount != null ? payload.purchase.charge_amount / 100 : undefined) ??
    (payload.Commissions?.charge_amount != null ? payload.Commissions.charge_amount / 100 : undefined);

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
  const eventType = payload.webhook_event_type?.toLowerCase();
  const status = payload.order_status?.toLowerCase();

  if (eventType === 'compra_aprovada' || eventType === 'order_approved') {
    return true;
  }

  return status === 'paid' || status === 'approved';
}

export async function sendWhatsAppNotification(message: string): Promise<boolean> {
  const phone = process.env.WHATSAPP_NOTIFY_PHONE ?? '5581991821954';
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;

  if (callMeBotKey) {
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone', phone);
    url.searchParams.set('text', message);
    url.searchParams.set('apikey', callMeBotKey);

    const res = await fetch(url.toString());
    return res.ok;
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
    return res.ok;
  }

  console.warn('[whatsapp] Nenhuma integração configurada (CALLMEBOT_API_KEY ou Z-API)');
  return false;
}
