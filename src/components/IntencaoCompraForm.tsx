'use client';

import { useState } from 'react';

interface IntencaoCompraFormProps {
  linkCompra: string;
}

export default function IntencaoCompraForm({ linkCompra }: IntencaoCompraFormProps) {
  const [aberto, setAberto] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const nome = (form.elements.namedItem('nome') as HTMLInputElement).value.trim();
    const telefone = (form.elements.namedItem('telefone') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    if (!nome || !telefone || !email) {
      alert('Preencha todos os campos para continuar.');
      return;
    }

    window.location.href = linkCompra;
  }

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
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Fechar formulário"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="nome"
              required
              placeholder="Nome completo"
              className="block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="tel"
              name="telefone"
              required
              placeholder="Telefone com DDD"
              minLength={10}
              className="block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="E-mail"
              className="block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
            />

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Ir para pagamento
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
