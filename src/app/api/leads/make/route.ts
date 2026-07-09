import { NextRequest, NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL =
  process.env.MAKE_WEBHOOK_URL ??
  'https://hook.us2.make.com/v7gcg31ztytov13mcqu4thd5k8nwcndb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nome = String(body.nome ?? '').trim();
    const whatsapp = String(body.whatsapp ?? '').trim();
    const solucao = String(body.solucao ?? '').trim();
    const checkout_url = String(body.checkout_url ?? '').trim();

    if (!nome || !whatsapp) {
      return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios' }, { status: 400 });
    }

    const payload = {
      nome,
      whatsapp,
      telefone: whatsapp,
      solucao,
      produto: solucao,
      origem: 'landing-page',
      checkout_url,
    };

    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => '');
      console.error('[make-webhook]', res.status, details);
      return NextResponse.json({ error: 'Falha ao enviar para o Make' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[make-webhook]', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
