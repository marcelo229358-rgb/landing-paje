import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSolucaoById } from '@/lib/solucao';
import { categoriaLabels } from '@/lib/solucao';
import AssinarPorEmail from '@/components/AssinarPorEmail';
import AssinarSaaS from '@/components/AssinarSaaS';
import IntencaoCompraForm from '@/components/IntencaoCompraForm';
import { formatPrecoBr } from '@/lib/format';
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

  const isSaasAssinatura = solucao.categoria === 'saas' && solucao.saas_product && solucao.preco_mensal != null;
  const hasLinkCompra = Boolean(solucao.link_compra);
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
              {hasLinkCompra ? (
                <>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Disponível agora</p>
                  <p className="mt-1 text-3xl font-bold text-accent">Adquira agora</p>
                  <p className="mt-1 text-xs text-muted-foreground">Pagamento seguro via Kiwify</p>
                </>
              ) : solucao.preco_mensal != null ? (
                <>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">A partir de</p>
                  <p className="mt-1 text-3xl font-bold text-accent">
                    R$ {formatPrecoBr(solucao.preco_mensal)}
                    <span className="text-base font-normal text-muted-foreground">/mês</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">A partir de</p>
                  <p className="mt-1 text-3xl font-bold text-accent">Sob consulta</p>
                  <p className="mt-1 text-xs text-muted-foreground">Valores personalizados para o seu projeto</p>
                </>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {hasLinkCompra ? (
                <>
                  <IntencaoCompraForm linkCompra={solucao.link_compra!} />
                  <Link
                    href="/contato"
                    className="flex h-12 w-full items-center justify-center rounded border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Falar com Especialista
                  </Link>
                </>
              ) : isSaasAssinatura ? (
                <AssinarSaaS
                  nome={solucao.nome}
                  saasProduct={solucao.saas_product!}
                  precoMensal={solucao.preco_mensal!}
                />
              ) : (
                <>
                  <AssinarPorEmail solucaoNome={solucao.nome} />
                  <Link
                    href="/contato"
                    className="flex h-12 w-full items-center justify-center rounded border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Falar com Especialista
                  </Link>
                </>
              )}
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
