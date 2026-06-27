import { mockSiteConfig } from './mock-data';

export interface SiteConfig {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  about_text: string;
  mission_text: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!API_URL || USE_MOCK) {
    return mockSiteConfig;
  }

  try {
    const res = await fetch(`${API_URL}/api/public/config`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const data = await res.json();
      return { ...mockSiteConfig, ...data };
    }
  } catch {}

  return mockSiteConfig;
}
