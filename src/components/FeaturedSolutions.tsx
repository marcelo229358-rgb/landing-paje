import Image from 'next/image';
import Link from 'next/link';
import { getSolucoesDestaque } from '@/lib/solucao';
import { categoriaLabels } from '@/lib/solucao';
import { formatPrecoBr } from '@/lib/format';

export default async function FeaturedSolutions() {
  const solucoes = await getSolucoesDestaque(3);

  return (
    <section className="bg-primary py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-white sm:text-4xl">
          SOLUÇÕES EM DESTAQUE
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-400 sm:mt-3 sm:text-base">
          Plataformas SaaS prontas para o seu negócio
        </p>

        {/* Mobile: carrossel horizontal */}
        <div className="-mx-4 mt-8 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 scrollbar-hide snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {solucoes.map((s) => {
            const foto = s.fotos.find((f) => f.principal) ?? s.fotos[0];
            return (
              <Link
                key={s.id}
                href={`/solucao/${s.id}`}
                className="group w-[82vw] shrink-0 snap-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-shadow hover:shadow-xl hover:shadow-accent/10 sm:w-auto sm:shrink sm:snap-align-none sm:rounded-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {foto && (
                    <Image
                      src={foto.url}
                      alt={s.nome}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, 33vw"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                    {categoriaLabels[s.categoria]}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{s.nome}</h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-zinc-400 sm:text-sm">{s.subtitulo}</p>
                  <p className="mt-3 text-sm font-semibold text-accent sm:mt-4">
                    {s.link_compra || s.slug === 'syscontabel'
                      ? 'Adquira agora →'
                      : s.preco_mensal != null
                        ? `R$ ${formatPrecoBr(s.preco_mensal)}/mês →`
                        : 'Solicitar orçamento →'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            href="/solucoes"
            className="inline-flex h-11 w-full max-w-xs items-center justify-center rounded-lg border border-white/20 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-auto sm:px-8"
          >
            VER TODAS AS SOLUÇÕES
          </Link>
        </div>
      </div>
    </section>
  );
}
