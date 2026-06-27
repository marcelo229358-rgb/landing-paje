'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-accent">Ops!</h1>
      <h2 className="mt-4 text-2xl font-bold">Algo deu errado</h2>
      <p className="mt-2 text-muted-foreground">
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex h-12 items-center justify-center rounded bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Tentar novamente
      </button>
    </div>
  );
}
