'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import type { CategoriaSolucao } from '@/types/solucao';
import { categoriaLabels } from '@/lib/solucao';

export default function FiltrosSolucoes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [aberto, setAberto] = useState(false);

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/solucoes?${params.toString()}`);
    },
    [router, searchParams]
  );

  const limpar = useCallback(() => {
    router.push('/solucoes');
  }, [router]);

  const temFiltros = Array.from(searchParams.entries()).length > 0;

  return (
    <div className="rounded-xl border bg-white lg:rounded-lg">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className="flex w-full items-center justify-between p-4 text-left lg:hidden"
      >
        <span className="text-sm font-semibold uppercase tracking-wider">Filtros</span>
        <svg
          className={`h-5 w-5 transition-transform ${aberto ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`p-4 pt-0 lg:block lg:p-6 ${aberto ? 'block' : 'hidden'}`}>
        <div className="hidden items-center justify-between lg:flex">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Filtros</h3>
          {temFiltros && (
            <button
              onClick={limpar}
              className="text-xs text-accent transition-colors hover:text-accent-hover"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="mt-0 space-y-4 lg:mt-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Buscar</label>
            <input
              type="text"
              value={searchParams.get('busca') ?? ''}
              onChange={(e) => setParam('busca', e.target.value || undefined)}
              placeholder="Nome da solução..."
              className="mt-1 block w-full rounded-lg border bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-primary sm:rounded-md sm:py-2 sm:text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Categoria</label>
            <select
              value={searchParams.get('categoria') ?? ''}
              onChange={(e) => setParam('categoria', e.target.value || undefined)}
              className="mt-1 block w-full rounded-lg border bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-primary sm:rounded-md sm:py-2 sm:text-sm"
            >
              <option value="">Todas</option>
              {(Object.keys(categoriaLabels) as CategoriaSolucao[]).map((cat) => (
                <option key={cat} value={cat}>
                  {categoriaLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Ordenar por</label>
            <select
              value={searchParams.get('ordenarPor') ?? ''}
              onChange={(e) => setParam('ordenarPor', e.target.value || undefined)}
              className="mt-1 block w-full rounded-lg border bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-primary sm:rounded-md sm:py-2 sm:text-sm"
            >
              <option value="">Padrão</option>
              <option value="nome_asc">Nome: A-Z</option>
            </select>
          </div>

          {temFiltros && (
            <button
              onClick={limpar}
              className="w-full rounded-lg border py-2.5 text-sm font-medium text-accent lg:hidden"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
