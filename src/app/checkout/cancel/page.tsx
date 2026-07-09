import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Pagamento cancelado</h1>
      <p className="mt-3 text-muted-foreground">
        Você pode tentar novamente quando quiser. Nenhuma cobrança foi realizada.
      </p>
      <Link
        href="/solucoes"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        Ver soluções
      </Link>
    </main>
  );
}
