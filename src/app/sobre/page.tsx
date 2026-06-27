import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';

export default async function SobrePage() {
  const config = await getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Sobre a Deploy Soluções Digitais</h1>
        <p className="mt-3 text-muted-foreground">
          {config.about_text || 'Transformamos ideias em soluções digitais de alto impacto.'}
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            alt="Equipe Deploy Soluções Digitais"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Nossa missão</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {config.mission_text}
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { numero: '50+', label: 'Projetos entregues' },
          { numero: '30+', label: 'Clientes ativos' },
          { numero: '99%', label: 'Satisfação dos clientes' },
          { numero: '7 dias', label: 'Prazo médio de entrega' },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border bg-white p-6 text-center">
            <p className="text-3xl font-bold text-accent">{item.numero}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Por que escolher a Deploy?</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              titulo: 'Design profissional',
              desc: 'Interfaces modernas, responsivas e alinhadas à identidade da sua marca.',
            },
            {
              titulo: 'Tecnologia de ponta',
              desc: 'Desenvolvimento com as melhores ferramentas do mercado para performance e escalabilidade.',
            },
            {
              titulo: 'Foco em conversão',
              desc: 'Cada página é pensada para transformar visitantes em clientes.',
            },
            {
              titulo: 'SaaS prontos para usar',
              desc: 'Plataformas completas para barbearias, e-commerce e presença profissional.',
            },
            {
              titulo: 'Suporte dedicado',
              desc: 'Equipe sempre disponível para manutenção, atualizações e dúvidas.',
            },
            {
              titulo: 'Preço justo',
              desc: 'Soluções acessíveis com excelente custo-benefício para o seu negócio.',
            },
          ].map((item) => (
            <div key={item.titulo} className="rounded-lg border bg-white p-6">
              <h3 className="font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-primary p-8 text-center text-white sm:p-12">
        <h2 className="text-2xl font-bold">Pronto para começar?</h2>
        <p className="mt-2 text-zinc-400">{config.address}</p>
        <p className="text-zinc-400">Seg-Sex: 8h às 18h | Sáb: 8h às 12h</p>
        <Link
          href="/contato"
          className="mt-6 inline-flex h-12 items-center justify-center rounded bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Solicitar orçamento
        </Link>
      </div>
    </div>
  );
}
