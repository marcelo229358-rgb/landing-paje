'use client';

import Image from 'next/image';
import { useState } from 'react';
import { mockSolucoes, mockSiteConfig } from '@/lib/mock-data';

export default function OrcamentoForm() {
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('');
  const [solucaoId, setSolucaoId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const solucao = solucaoId
      ? mockSolucoes.find((s) => s.id === Number(solucaoId))
      : null;
    const mensagem = [
      `Olá! Meu nome é ${nome}.`,
      `Tenho interesse em: ${tipoProjeto || 'projeto digital'}.`,
      solucao ? `Solução: ${solucao.nome}.` : '',
      `E-mail: ${email} | Telefone: ${telefone}`,
    ]
      .filter(Boolean)
      .join(' ');

    window.open(
      `https://wa.me/${mockSiteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      '_blank'
    );
    setEnviado(true);
  };

  if (enviado) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 text-center">
          <svg className="mx-auto h-14 w-14 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-6 text-2xl font-bold">Solicitação enviada!</h2>
          <p className="mt-3 text-muted-foreground">
            Você será redirecionado ao WhatsApp. Entraremos em contato em breve com uma proposta personalizada.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <form onSubmit={handleSubmit} className="order-1 space-y-4 lg:order-2 lg:space-y-5">
            <h2 className="text-xl font-bold lg:hidden">Solicite um orçamento</h2>
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 block w-full rounded-lg border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-accent sm:rounded-md sm:py-3 sm:text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telefone</label>
              <input
                type="tel"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-1 block w-full rounded-lg border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-accent sm:rounded-md sm:py-3 sm:text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-accent sm:rounded-md sm:py-3 sm:text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo de projeto</label>
              <select
                required
                value={tipoProjeto}
                onChange={(e) => setTipoProjeto(e.target.value)}
                className="mt-1 block w-full rounded-lg border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-accent sm:rounded-md sm:py-3 sm:text-sm"
              >
                <option value="">Selecione o tipo</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Site Institucional">Site Institucional</option>
                <option value="Plataforma / SaaS">Plataforma / SaaS</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Solução de interesse (opcional)</label>
              <select
                value={solucaoId}
                onChange={(e) => setSolucaoId(e.target.value)}
                className="mt-1 block w-full rounded-lg border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-accent sm:rounded-md sm:py-3 sm:text-sm"
              >
                <option value="">Selecione uma solução</option>
                {mockSolucoes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white transition-colors active:scale-[0.98] hover:bg-accent-hover"
            >
              SOLICITAR ORÇAMENTO
            </button>
          </form>

          <div className="relative order-2 hidden overflow-hidden rounded-xl sm:order-1 sm:block">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=90"
              alt="Desenvolvimento digital"
              width={700}
              height={500}
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/60">
              <h2 className="text-center text-2xl font-bold text-white drop-shadow-lg sm:text-4xl">
                SOLICITE UM ORÇAMENTO
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
