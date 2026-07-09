import { NextRequest, NextResponse } from 'next/server';
import {
  formatKiwifyPurchaseMessage,
  isKiwifyApprovedPurchase,
  sendWhatsAppNotification,
} from '@/lib/notify-whatsapp';

function isAuthorized(request: NextRequest): boolean {
  const expectedToken = process.env.KIWIFY_WEBHOOK_TOKEN;
  if (!expectedToken) return true;

  const queryToken = request.nextUrl.searchParams.get('token');
  const headerToken = request.headers.get('x-kiwify-token');

  return queryToken === expectedToken || headerToken === expectedToken;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await request.json();

    if (!isKiwifyApprovedPurchase(payload)) {
      return NextResponse.json({ ok: true, skipped: 'event_not_approved' });
    }

    const message = formatKiwifyPurchaseMessage(payload);
    const sent = await sendWhatsAppNotification(message);

    return NextResponse.json({ ok: true, whatsapp_sent: sent });
  } catch (error) {
    console.error('[kiwify-webhook]', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
