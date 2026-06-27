'use client';

import { useState } from 'react';
import { mockSiteConfig } from '@/lib/mock-data';

interface AssinarPorEmailProps {
  solucaoNome?: string;
  variant?: 'default' | 'hero' | 'light';
}

export default function AssinarPorEmail({
  solucaoNome,
  variant = 'default',
}: AssinarPorEmailProps) {
  const [aberto, setAberto] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assunto = solucaoNome
      ? `Assinatura: ${solucaoNome}`
      : 'Assinatura - Deploy Soluções Digitais';

    const corpo = [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
      solucaoNome ? `Solução: ${solucaoNome}` : '',
      mensagem ? `Mensagem: ${mensagem}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${mockSiteConfig.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
    setAberto(false);
  };

  const buttonClass =
    variant === 'hero'
      ? 'flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 text-sm font-semibold text-white backdrop-blur-sm transition-all active:scale-[0.98] hover:bg-white/20 sm:inline-flex sm:h-14 sm:w-auto sm:px-8'
      : variant === 'light'
        ? 'flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white'
        : 'flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-primary bg-white text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white';

  if (enviado) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center">
        <svg className="mx-auto h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-sm font-medium">App de e-mail aberto!</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Envie a mensagem para concluir sua assinatura.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-3 text-xs text-accent underline"
        >
          Enviar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!aberto && (
        <button type="button" onClick={() => setAberto(true)} className={buttonClass}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Assinar por e-mail
        </button>
      )}

      {aberto && (
        <div className="rounded-xl border bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">Assinar por e-mail</h3>
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
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Telefone</label>
              <input
                type="tel"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Mensagem (opcional)</label>
              <textarea
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Conte um pouco sobre seu projeto..."
                className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar assinatura
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
