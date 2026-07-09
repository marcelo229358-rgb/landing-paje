import type { SiteConfig } from './config';
import type { Solucao } from '@/types/solucao';

export const mockSiteConfig: SiteConfig = {
  hero_title: 'TRANSFORME SUA IDEIA EM SOLUÇÃO DIGITAL',
  hero_subtitle:
    'Na Deploy Soluções Digitais criamos sites, landing pages e plataformas SaaS que impulsionam o crescimento do seu negócio.',
  hero_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90',
  whatsapp: '5581991821954',
  phone: '(81) 99182-1954',
  email: 'contato@deploysolucoes.com.br',
  address: 'Recife - PE | Atendimento em todo o Brasil',
  about_text:
    'A Deploy Soluções Digitais é especializada em criar presença digital de alto impacto — de landing pages a plataformas SaaS completas.',
  mission_text:
    'Nossa missão na Deploy Soluções Digitais é desenvolver soluções tecnológicas inovadoras que simplifiquem processos, aumentem a produtividade e impulsionem o crescimento dos nossos clientes. Buscamos entregar sistemas e plataformas SaaS com qualidade, segurança e inovação, criando valor por meio da tecnologia.',
  feature_1: 'Sites e landing pages de alta conversão',
  feature_2: 'Plataformas SaaS prontas para escalar',
  feature_3: 'Design moderno e responsivo',
  feature_4: 'Suporte e manutenção contínua',
};

export const mockSolucoes: Solucao[] = [
  {
    id: 7,
    nome: 'SysContabel',
    slug: 'syscontabel',
    categoria: 'saas',
    subtitulo: 'Gestão de empréstimos, parcelas e juros para empresas',
    status: 'disponivel',
    destaque: true,
    saas_product: 'syscontabel',
    link_compra: 'https://pay.kiwify.com.br/UoFUCCi',
    descricao:
      'Plataforma multi-tenant para gestão de empréstimos e parcelamentos. Cálculo automático de juros e multas, geração de boletos e contratos em PDF, notificações por WhatsApp e dashboard financeiro completo.',
    funcionalidades: [
      'Gestão de contratos e parcelas',
      'Cálculo automático de juros e multa',
      'Geração de contratos e recibos em PDF',
      'Notificações automáticas por WhatsApp',
      'Dashboard financeiro com indicadores',
      'Multi-empresa (multi-tenant)',
    ],
    fotos: [
      { id: 10, solucao_id: 7, url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80', ordem: 1, principal: true },
      { id: 11, solucao_id: 7, url: '/upgrade/contabel.webp', ordem: 2, principal: false },
    ],
  },
  {
    id: 1,
    nome: 'SaaS Barbearia',
    slug: 'saas-barbearia',
    categoria: 'saas',
    subtitulo: 'Agendamento, gestão de clientes e controle financeiro',
    status: 'disponivel',
    destaque: true,
    preco_mensal: 49.9,
    saas_product: 'agenda-barbe',
    descricao:
      'Plataforma completa para barbearias e salões de beleza. Agendamento online, gestão de clientes, controle de comissões, relatórios financeiros e painel administrativo intuitivo.',
    funcionalidades: [
      'Agendamento online 24h',
      'Gestão de clientes e histórico',
      'Controle de comissões',
      'Relatórios financeiros',
      'Notificações por WhatsApp',
      'Painel administrativo completo',
    ],
    fotos: [
      { id: 1, solucao_id: 1, url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80', ordem: 1, principal: true },
      { id: 2, solucao_id: 1, url: 'https://images.unsplash.com/photo-1585747860715-2b37c95b0818?w=900&q=80', ordem: 2, principal: false },
    ],
  },
  {
    id: 2,
    nome: 'SaaS Loja Virtual',
    slug: 'saas-loja-virtual',
    categoria: 'saas',
    subtitulo: 'E-commerce completo com gestão de produtos e pagamentos',
    status: 'disponivel',
    destaque: true,
    preco_mensal: 99.9,
    saas_product: 'loja-virtual',
    descricao:
      'Loja virtual profissional com catálogo de produtos, carrinho, checkout integrado, gestão de estoque e painel para acompanhar vendas em tempo real.',
    funcionalidades: [
      'Catálogo de produtos ilimitado',
      'Carrinho e checkout otimizado',
      'Integração com gateways de pagamento',
      'Gestão de estoque',
      'Cupons e promoções',
      'Relatórios de vendas',
    ],
    fotos: [
      { id: 3, solucao_id: 2, url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', ordem: 1, principal: true },
      { id: 4, solucao_id: 2, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80', ordem: 2, principal: false },
    ],
  },
  {
    id: 3,
    nome: 'LinkScore',
    slug: 'linkscore',
    categoria: 'saas',
    subtitulo: 'Link na bio, métricas e página profissional',
    status: 'disponivel',
    destaque: true,
    preco_mensal: 24.99,
    saas_product: 'linkscore',
    descricao:
      'Plataforma de link na bio com analytics, página profissional personalizável e captação de leads. Ideal para criadores, profissionais e pequenos negócios.',
    funcionalidades: [
      'Links ilimitados',
      'Analytics de cliques',
      'Página profissional',
      'Formulário de captação',
      'Domínio customizado',
      'Métricas em tempo real',
    ],
    fotos: [
      { id: 5, solucao_id: 3, url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80', ordem: 1, principal: true },
      { id: 6, solucao_id: 3, url: 'https://images.unsplash.com/photo-1521737711864-e3b97375f902?w=900&q=80', ordem: 2, principal: false },
    ],
  },
  {
    id: 4,
    nome: 'Landing Page',
    slug: 'landing-page',
    categoria: 'landing-page',
    subtitulo: 'Página de alta conversão para captar clientes',
    status: 'disponivel',
    destaque: false,
    descricao:
      'Landing page profissional focada em conversão. Design exclusivo, formulários integrados, otimização para SEO e performance máxima em dispositivos móveis.',
    funcionalidades: [
      'Design exclusivo e responsivo',
      'Formulários de captação',
      'Otimização SEO',
      'Integração com WhatsApp',
      'Analytics configurado',
      'Entrega em até 7 dias',
    ],
    fotos: [
      { id: 7, solucao_id: 4, url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80', ordem: 1, principal: true },
    ],
  },
  {
    id: 5,
    nome: 'Site Institucional',
    slug: 'site-institucional',
    categoria: 'site',
    subtitulo: 'Presença digital completa para sua empresa',
    status: 'disponivel',
    destaque: false,
    descricao:
      'Site institucional profissional com múltiplas páginas, blog, área de contato e design alinhado à identidade visual da sua marca.',
    funcionalidades: [
      'Até 8 páginas',
      'Blog integrado',
      'Formulário de contato',
      'Mapa e informações da empresa',
      'Painel de administração',
      'Hospedagem inclusa no 1º ano',
    ],
    fotos: [
      { id: 8, solucao_id: 5, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80', ordem: 1, principal: true },
    ],
  },
  {
    id: 6,
    nome: 'Plataforma Sob Medida',
    slug: 'plataforma-sob-medida',
    categoria: 'plataforma',
    subtitulo: 'Sistema personalizado para o seu negócio',
    status: 'sob_consulta',
    destaque: false,
    descricao:
      'Desenvolvimento de plataforma 100% personalizada. Análise de requisitos, arquitetura escalável, painel administrativo e integrações sob demanda.',
    funcionalidades: [
      'Análise de requisitos',
      'Arquitetura escalável',
      'Painel administrativo',
      'API e integrações',
      'Suporte dedicado',
      'Manutenção evolutiva',
    ],
    fotos: [
      { id: 9, solucao_id: 6, url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80', ordem: 1, principal: true },
    ],
  },
];
