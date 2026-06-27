export type OrigemLead = 'site' | 'whatsapp' | 'indicacao' | 'telefone';

export type TipoProjeto = 'landing-page' | 'site' | 'plataforma' | 'saas' | 'outro';

export interface PipelineStatus {
  id: number;
  nome: string;
  ordem: number;
  cor: string;
}

/** Lead capturado pelo site (contato, orçamento, etc.) */
export interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  solucao_id?: number | null;
  tipo_projeto?: TipoProjeto;
  origem: OrigemLead;
  mensagem?: string;
  status_id: number;
  created_at?: string;
  updated_at?: string;
}
