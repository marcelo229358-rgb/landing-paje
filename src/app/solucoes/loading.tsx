export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded bg-zinc-200" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-zinc-200" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border bg-white">
            <div className="aspect-[4/3] rounded-t-lg bg-zinc-200" />
            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 rounded bg-zinc-200" />
              <div className="h-4 w-full rounded bg-zinc-200" />
              <div className="h-6 w-1/2 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
