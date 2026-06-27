import type { MetadataRoute } from 'next';
import { mockSolucoes } from '@/lib/mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/solucoes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/contato`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  let solucoes = mockSolucoes;

  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/api/solucoes`);
      if (res.ok) solucoes = await res.json();
    } catch {}
  }

  const solucaoPages = solucoes.map((s) => ({
    url: `${BASE_URL}/solucao/${s.id}`,
    lastModified: new Date(s.updated_at || s.created_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...solucaoPages];
}
