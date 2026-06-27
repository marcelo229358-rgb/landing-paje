import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Página não encontrada</h2>
      <p className="mt-2 text-muted-foreground">
        A página que você procura não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
