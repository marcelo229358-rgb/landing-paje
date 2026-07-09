'use client';

import { useState } from 'react';

interface IntencaoCompraFormProps {
  solucaoNome: string;
  linkCompra: string;
}

export default function IntencaoCompraForm({ solucaoNome, linkCompra }: IntencaoCompraFormProps) {
  const [aberto, setAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      const body = new URLSearchParams({
        'form-name': 'captura-leads',
        nome: nome.trim(),
        whatsapp: whatsapp.trim(),
        solucao: solucaoNome,
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      window.location.href = linkCompra;
    } catch {
      setErro('Erro ao enviar dados. Tente novamente.');
      setEnviando(false);
    }
  };

  return (
    <div className="w-full">
      {!aberto && (
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Adquira agora
        </button>
      )}

      {aberto && (
        <div className="rounded-xl border bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Dados para compra</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Preencha para continuar ao pagamento seguro.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAberto(false)}
              disabled={enviando}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              aria-label="Fechar formulário"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form
            name="captura-leads"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input type="hidden" name="form-name" value="captura-leads" />
            <input type="hidden" name="solucao" value={solucaoNome} />

            <div>
              <input
                type="text"
                name="nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu Nome"
                className="block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <input
                type="tel"
                name="whatsapp"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Seu Zap"
                minLength={10}
                className="block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {erro && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enviando ? 'Enviando...' : 'Finalizar Compra'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
