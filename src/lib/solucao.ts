import type { Solucao, CategoriaSolucao } from '@/types/solucao';
import { mockSolucoes } from './mock-data';

export interface FiltroSolucoes {
  categoria?: CategoriaSolucao;
  busca?: string;
  ordenarPor?: 'nome_asc';
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

async function apiFetch<T>(path: string): Promise<T> {
  if (!API_URL || USE_MOCK) {
    throw new Error('Using mock data');
  }
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 30 } });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function filterMockSolucoes(filtros: Partial<FiltroSolucoes>): Solucao[] {
  let result = [...mockSolucoes];

  if (filtros.categoria) {
    result = result.filter((s) => s.categoria === filtros.categoria);
  }
  if (filtros.busca) {
    const q = filtros.busca.toLowerCase();
    result = result.filter(
      (s) =>
        s.nome.toLowerCase().includes(q) ||
        s.subtitulo.toLowerCase().includes(q) ||
        s.descricao.toLowerCase().includes(q)
    );
  }

  if (filtros.ordenarPor === 'nome_asc') {
    result.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  return result;
}

export async function getSolucoes(): Promise<Solucao[]> {
  try {
    return await apiFetch<Solucao[]>('/api/solucoes');
  } catch {
    return filterMockSolucoes({});
  }
}

export async function getSolucaoById(id: number): Promise<Solucao | undefined> {
  try {
    return await apiFetch<Solucao>(`/api/solucoes/${id}`);
  } catch {
    return mockSolucoes.find((s) => s.id === id);
  }
}

export async function getSolucoesDestaque(limit = 3): Promise<Solucao[]> {
  try {
    return await apiFetch<Solucao[]>(`/api/solucoes/destaque?limit=${limit}`);
  } catch {
    return mockSolucoes.filter((s) => s.destaque).slice(0, limit);
  }
}

export async function getCategoriasDisponiveis(): Promise<CategoriaSolucao[]> {
  try {
    return await apiFetch<CategoriaSolucao[]>('/api/solucoes/categorias');
  } catch {
    return [...new Set(mockSolucoes.map((s) => s.categoria))];
  }
}

export async function filterSolucoes(filtros: Partial<FiltroSolucoes>): Promise<Solucao[]> {
  try {
    const params = new URLSearchParams();
    if (filtros.categoria) params.set('categoria', filtros.categoria);
    if (filtros.busca) params.set('busca', filtros.busca);
    if (filtros.ordenarPor) params.set('ordenarPor', filtros.ordenarPor);

    const query = params.toString();
    return await apiFetch<Solucao[]>(`/api/solucoes${query ? `?${query}` : ''}`);
  } catch {
    return filterMockSolucoes(filtros);
  }
}

export const categoriaLabels: Record<CategoriaSolucao, string> = {
  saas: 'SaaS',
  'landing-page': 'Landing Page',
  site: 'Site',
  plataforma: 'Plataforma',
};
