import { Suspense } from 'react';
import ResultadosSolucoes from './ResultadosSolucoes';
import type { CategoriaSolucao } from '@/types/solucao';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

type OrdenarPor = 'nome_asc';

export default async function SolucoesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filtros = {
    categoria: params.categoria as CategoriaSolucao | undefined,
    busca: params.busca,
    ordenarPor: params.ordenarPor as OrdenarPor | undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="mb-8">
            <div className="h-9 w-48 animate-pulse rounded bg-zinc-200" />
            <div className="mt-2 h-5 w-64 animate-pulse rounded bg-zinc-200" />
          </div>
        }
      >
        <ResultadosSolucoes filtros={filtros} />
      </Suspense>
    </div>
  );
}
