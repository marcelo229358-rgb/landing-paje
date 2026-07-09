import Image from 'next/image';
import Link from 'next/link';
import type { Solucao } from '@/types/solucao';
import { categoriaLabels } from '@/lib/solucao';
import { formatPrecoBr } from '@/lib/format';

interface CardSolucaoProps {
  solucao: Solucao;
}

export default function CardSolucao({ solucao }: CardSolucaoProps) {
  const fotoPrincipal = solucao.fotos.find((f) => f.principal) ?? solucao.fotos[0];

  return (
    <Link
      href={`/solucao/${solucao.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {fotoPrincipal && (
          <Image
            src={fotoPrincipal.url}
            alt={solucao.nome}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <span className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-xs font-semibold text-white">
          {categoriaLabels[solucao.categoria]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold">{solucao.nome}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{solucao.subtitulo}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {solucao.funcionalidades.slice(0, 2).map((f) => (
            <span key={f} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {f}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-3 text-sm font-semibold text-accent">
          {solucao.link_compra || solucao.slug === 'syscontabel'
            ? 'Adquira agora →'
            : solucao.preco_mensal != null
              ? `R$ ${formatPrecoBr(solucao.preco_mensal)}/mês →`
              : 'Solicitar orçamento →'}
        </p>
      </div>
    </Link>
  );
}
