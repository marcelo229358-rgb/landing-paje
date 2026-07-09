import { NextRequest, NextResponse } from 'next/server';
import {
  formatKiwifyPurchaseMessage,
  isKiwifyApprovedPurchase,
  isWhatsAppConfigured,
  normalizeKiwifyPayload,
  sendWhatsAppNotification,
  type KiwifyWebhookPayload,
} from '@/lib/notify-whatsapp';

function isAuthorized(request: NextRequest, payload?: KiwifyWebhookPayload): boolean {
  const expectedToken = process.env.KIWIFY_WEBHOOK_TOKEN;
  if (!expectedToken) return true;

  const queryToken = request.nextUrl.searchParams.get('token');
  const headerToken = request.headers.get('x-kiwify-token');
  const bodyToken = payload?.token;

  return (
    queryToken === expectedToken ||
    headerToken === expectedToken ||
    bodyToken === expectedToken
  );
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    webhook: 'ativo',
    whatsapp_configured: isWhatsAppConfigured(),
    notify_phone: process.env.WHATSAPP_NOTIFY_PHONE ?? '5581991821954',
    token_required: Boolean(process.env.KIWIFY_WEBHOOK_TOKEN),
  });
}

export async function POST(request: NextRequest) {
  let payload: KiwifyWebhookPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!isAuthorized(request, payload)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const normalized = normalizeKiwifyPayload(payload);

    if (!isKiwifyApprovedPurchase(normalized)) {
      return NextResponse.json({
        ok: true,
        skipped: 'event_not_approved',
        event: normalized.webhook_event_type ?? normalized.order_status ?? normalized.status,
      });
    }

    if (!isWhatsAppConfigured()) {
      console.error('[kiwify-webhook] WhatsApp não configurado no servidor');
      return NextResponse.json(
        {
          ok: false,
          error: 'whatsapp_not_configured',
          message: 'Configure CALLMEBOT_API_KEY ou Z-API nas variáveis do Netlify',
        },
        { status: 503 }
      );
    }

    const message = formatKiwifyPurchaseMessage(normalized);
    const result = await sendWhatsAppNotification(message);

    if (!result.sent) {
      console.error('[kiwify-webhook] Falha ao enviar WhatsApp:', result.error);
      return NextResponse.json(
        {
          ok: false,
          error: 'whatsapp_send_failed',
          provider: result.provider,
          details: result.error,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      whatsapp_sent: true,
      provider: result.provider,
    });
  } catch (error) {
    console.error('[kiwify-webhook]', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
