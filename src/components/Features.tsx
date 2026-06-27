const features = [
  {
    titulo: 'Sites de Alta Conversão',
    descricao:
      'Landing pages e sites institucionais projetados para transformar visitantes em clientes.',
    icone: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titulo: 'Plataformas SaaS',
    descricao:
      'Sistemas prontos para barbearias, lojas virtuais e presença profissional no LinkedIn.',
    icone: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    titulo: 'Entrega Rápida',
    descricao:
      'Projetos entregues com agilidade, sem abrir mão da qualidade e do design profissional.',
    icone: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    titulo: 'Suporte Contínuo',
    descricao:
      'Manutenção, atualizações e suporte dedicado para manter sua presença digital sempre ativa.',
    icone: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-4xl">
          POR QUE ESCOLHER A DEPLOY?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground sm:mt-3 sm:text-base">
          Soluções digitais completas para levar seu negócio ao próximo nível
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.titulo}
              className="group rounded-xl border bg-white p-4 text-center transition-shadow hover:shadow-lg sm:rounded-lg sm:p-6"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white sm:h-16 sm:w-16">
                {item.icone}
              </div>
              <h3 className="mt-3 text-xs font-semibold sm:mt-5 sm:text-base">{item.titulo}</h3>
              <p className="mt-1 hidden text-sm text-muted-foreground sm:mt-2 sm:block">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
