const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SaasCatalogItem {
  plan_id: number;
  saas_product: string;
  saas_label: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
}

export interface CheckoutPayload {
  name: string;
  email: string;
  phone: string;
  document?: string;
  company?: string;
  plan_id: number;
  saas_product: string;
}

export interface CheckoutResult {
  mode: 'checkout' | 'direct' | 'simulated';
  checkout_url?: string;
  message?: string;
  email?: string;
  url_acesso?: string;
  saas_label?: string;
  client_id?: number;
}

export async function fetchSaasCatalog(): Promise<SaasCatalogItem[]> {
  const res = await fetch(`${API_URL}/api/public/saas-catalog`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao carregar planos');
  return data;
}

export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  const res = await fetch(`${API_URL}/api/public/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro ao iniciar pagamento');
  }
  return data;
}

export async function fetchCheckoutStatus(sessionId: string) {
  const res = await fetch(
    `${API_URL}/api/public/checkout/status?session_id=${encodeURIComponent(sessionId)}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao verificar pagamento');
  return data;
}
