import { NextRequest, NextResponse } from 'next/server';
import {
  isWhatsAppConfigured,
  sendLeadNotification,
} from '@/lib/notify-whatsapp';

interface IntencaoCompraBody {
  nome?: string;
  email?: string;
  telefone?: string;
  solucaoNome?: string;
  linkCompra?: string;
}

function formatIntencaoCompraMessage(data: Required<IntencaoCompraBody>): string {
  return [
    '🛒 Nova intenção de compra!',
    '',
    `Produto: ${data.solucaoNome}`,
    `Nome: ${data.nome}`,
    `Telefone: ${data.telefone}`,
    `E-mail: ${data.email}`,
    '',
    'Cliente direcionado para o pagamento.',
  ].join('\n');
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    whatsapp_configured: isWhatsAppConfigured(),
    notify_phone: process.env.WHATSAPP_NOTIFY_PHONE ?? '5581991821954',
    notify_email: process.env.NOTIFY_EMAIL ?? 'contato@deploysolucoes.com.br',
    email_fallback: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntencaoCompraBody;
    const nome = body.nome?.trim();
    const email = body.email?.trim();
    const telefone = body.telefone?.trim();
    const solucaoNome = body.solucaoNome?.trim();
    const linkCompra = body.linkCompra?.trim();

    if (!nome || !email || !telefone || !solucaoNome || !linkCompra) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const telefoneDigits = telefone.replace(/\D/g, '');
    if (telefoneDigits.length < 10) {
      return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
    }

    const message = formatIntencaoCompraMessage({
      nome,
      email,
      telefone,
      solucaoNome,
      linkCompra,
    });

    const result = await sendLeadNotification(message, { replyTo: email });

    if (!result.ok) {
      console.error('[intencao-compra] Falha em todos os canais:', result);
    }

    return NextResponse.json({
      ok: true,
      notified: result.ok,
      channels: result.channels ?? [],
      whatsapp_configured: isWhatsAppConfigured(),
    });
  } catch (error) {
    console.error('[intencao-compra]', error);
    return NextResponse.json({ error: 'Erro ao processar intenção de compra' }, { status: 500 });
  }
}
