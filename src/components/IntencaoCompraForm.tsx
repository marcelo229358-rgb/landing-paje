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
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      const res = await fetch('/api/leads/intencao-compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          solucaoNome,
          linkCompra,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível registrar sua intenção de compra.');
      }

      window.location.href = linkCompra;
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao enviar dados. Tente novamente.');
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

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nome completo</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Telefone com DDD</label>
              <input
                type="tel"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(81) 99999-9999"
                minLength={10}
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
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
              {enviando ? 'Enviando...' : 'Confirmar e ir para pagamento'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
