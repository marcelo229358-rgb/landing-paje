import { filterSolucoes } from '@/lib/solucao';
import CardSolucao from '@/components/CardSolucao';
import FiltrosSolucoes from './FiltrosSolucoes';
import type { FiltroSolucoes } from '@/lib/solucao';

interface ResultadosSolucoesProps {
  filtros: Partial<FiltroSolucoes>;
}

export default async function ResultadosSolucoes({ filtros }: ResultadosSolucoesProps) {
  const activeFilters = Object.fromEntries(
    Object.entries(filtros).filter(([, v]) => v !== undefined)
  ) as Partial<FiltroSolucoes>;
  const solucoes = await filterSolucoes(activeFilters);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Nossas Soluções</h1>
        <p className="mt-1 text-muted-foreground">
          {solucoes.length} soluç{solucoes.length !== 1 ? 'ões' : 'ão'} disponíve
          {solucoes.length !== 1 ? 'is' : 'l'}
        </p>
      </div>

      <div className="lg:flex lg:gap-8">
        <aside className="mb-8 lg:mb-0 lg:w-64 lg:shrink-0">
          <FiltrosSolucoes />
        </aside>

        <div className="flex-1">
          {solucoes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {solucoes.map((solucao) => (
                <CardSolucao key={solucao.id} solucao={solucao} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold">Nenhuma solução encontrada</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente ajustar os filtros para encontrar mais resultados.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
