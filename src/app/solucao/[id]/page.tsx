import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSolucaoById } from '@/lib/solucao';
import { getSiteConfig } from '@/lib/config';
import { categoriaLabels } from '@/lib/solucao';
import AssinarPorEmail from '@/components/AssinarPorEmail';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const solucao = await getSolucaoById(Number(id));
  if (!solucao) return { title: 'Solucao nao encontrada' };
  return {
    title: solucao.nome,
    description: `${solucao.nome} - ${solucao.subtitulo}. ${solucao.descricao.slice(0, 120)}...`,
    openGraph: {
      title: solucao.nome,
      description: solucao.subtitulo,
      images: solucao.fotos[0] ? [{ url: solucao.fotos[0].url }] : [],
    },
  };
}

export default async function SolucaoDetalhePage({ params }: PageProps) {
  const { id } = await params;
  const solucao = await getSolucaoById(Number(id));

  if (!solucao) {
    notFound();
  }

  const siteConfig = await getSiteConfig();
  const wppUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Ola! Tenho interesse na solucao ${solucao.nome}. Gostaria de assinar.`
  )}`;

  const fotos = solucao.fotos.sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/solucoes" className="hover:text-foreground">Solucoes</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{solucao.nome}</span>
      </nav>

      <div className="lg:flex lg:gap-10">
        <div className="lg:w-3/5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-100">
            {fotos[0] && (
              <Image
                src={fotos[0].url}
                alt={solucao.nome}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            )}
          </div>

          {fotos.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {fotos.slice(1).map((foto) => (
                <div key={foto.id} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
                  <Image src={foto.url} alt="" fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 lg:mt-0 lg:w-2/5">
          <div className="lg:sticky lg:top-24">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {categoriaLabels[solucao.categoria]}
            </span>
            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{solucao.nome}</h1>
            <p className="mt-2 text-muted-foreground">{solucao.subtitulo}</p>

            <div className="mt-6 rounded-lg border bg-muted p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">O que esta incluso</h3>
              <ul className="mt-3 space-y-2">
                {solucao.funcionalidades.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">A partir de</p>
              <p className="mt-1 text-3xl font-bold text-accent">R$ 297<span className="text-base font-normal text-muted-foreground">/mes</span></p>
              <p className="mt-1 text-xs text-muted-foreground">+ R$ 800 de setup unico</p>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={wppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#25D366] text-sm font-semibold text-white transition-colors hover:bg-[#1da851]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Assinar Agora via WhatsApp
              </a>

              <AssinarPorEmail solucaoNome={solucao.nome} />

              <Link
                href="/contato"
                className="flex h-12 w-full items-center justify-center rounded border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold">Sobre esta solucao</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{solucao.descricao}</p>
      </div>
    </div>
  );
}