'use client';

import { useState, useEffect } from 'react';
import { formatPrecoBr } from '@/lib/format';
import { createCheckout, fetchSaasCatalog } from '@/lib/masterApi';

interface AssinarSaaSProps {
  nome: string;
  saasProduct: string;
  precoMensal: number;
}

export default function AssinarSaaS({ nome, saasProduct, precoMensal }: AssinarSaaSProps) {
  const [aberto, setAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [planId, setPlanId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    company: '',
  });

  useEffect(() => {
    fetchSaasCatalog()
      .then((catalog) => {
        const item = catalog.find((p) => p.saas_product === saasProduct);
        if (item) setPlanId(item.plan_id);
      })
      .catch(() => {});
  }, [saasProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!planId) {
      setErro('Plano indisponível no momento. Tente novamente em instantes.');
      return;
    }

    setEnviando(true);

    try {
      const result = await createCheckout({
        name: form.name,
        email: form.email,
        phone: form.phone,
        document: form.document || undefined,
        company: form.company || undefined,
        plan_id: planId,
        saas_product: saasProduct,
      });

      if (result.checkout_url) {
        window.location.href = result.checkout_url;
        return;
      }

      setErro(result.message || 'Não foi possível iniciar o pagamento.');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao assinar');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="w-full">
      {!aberto ? (
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Assinar — R$ {formatPrecoBr(precoMensal)}/mês
        </button>
      ) : (
        <div className="rounded-xl border bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Finalizar assinatura</h3>
              <p className="text-xs text-muted-foreground">
                {nome} — R$ {formatPrecoBr(precoMensal)}/mês
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Você será redirecionado ao gateway de pagamento (PIX, cartão ou boleto).
              </p>
            </div>
            <button
              type="button"
              onClick={() => !enviando && setAberto(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>

          {erro && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nome completo *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">E-mail *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Empresa</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">CPF / CNPJ</label>
                <input
                  value={form.document}
                  onChange={(e) => setForm({ ...form, document: e.target.value })}
                  className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando || !planId}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {enviando ? 'Redirecionando ao pagamento...' : 'Ir para pagamento'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
