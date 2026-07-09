export type CategoriaSolucao = 'saas' | 'landing-page' | 'site' | 'plataforma';

export type StatusSolucao = 'disponivel' | 'em_desenvolvimento' | 'sob_consulta';

export interface FotoSolucao {
  id: number;
  solucao_id: number;
  url: string;
  ordem: number;
  principal: boolean;
}

export interface Solucao {
  id: number;
  nome: string;
  slug: string;
  categoria: CategoriaSolucao;
  subtitulo: string;
  status: StatusSolucao;
  destaque: boolean;
  descricao: string;
  funcionalidades: string[];
  fotos: FotoSolucao[];
  preco_mensal?: number;
  saas_product?: string;
  link_compra?: string;
  created_at?: string;
  updated_at?: string;
}
