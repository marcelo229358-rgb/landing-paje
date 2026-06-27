const depoimentos = [
  {
    nome: 'Ricardo Almeida',
    texto:
      'A Deploy criou a landing page da minha barbearia e em menos de um mês já triplicamos os agendamentos online. Profissionalismo total!',
    avaliacao: 5,
  },
  {
    nome: 'Mariana Costa',
    texto:
      'Contratei o SaaS de loja virtual e em duas semanas já estava vendendo. Plataforma intuitiva, suporte excelente. Recomendo demais!',
    avaliacao: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-4xl">
          O QUE NOSSOS CLIENTES DIZEM
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground sm:mt-3 sm:text-base">
          Resultados reais de quem confiou na Deploy
        </p>

        <div className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide snap-x snap-mandatory sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:pb-0">
          {depoimentos.map((d) => (
            <div key={d.nome} className="w-[85vw] shrink-0 snap-center rounded-xl border bg-white p-6 text-center sm:w-auto sm:shrink sm:rounded-lg sm:p-8">
              <Stars count={d.avaliacao} />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                &ldquo;{d.texto}&rdquo;
              </p>
              <p className="mt-6 font-semibold">{d.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
