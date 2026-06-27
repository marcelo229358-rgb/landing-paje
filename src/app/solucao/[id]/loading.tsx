export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-4 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="mt-8 lg:flex lg:gap-10">
        <div className="lg:w-3/5">
          <div className="aspect-[16/10] animate-pulse rounded-lg bg-zinc-200" />
        </div>
        <div className="mt-8 lg:mt-0 lg:w-2/5">
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-zinc-200" />
            <div className="h-10 w-1/2 animate-pulse rounded bg-zinc-200" />
            <div className="h-40 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-12 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
