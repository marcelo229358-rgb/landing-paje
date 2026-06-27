export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-64 rounded bg-zinc-200" />
        <div className="h-5 w-96 rounded bg-zinc-200" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-white">
              <div className="aspect-[4/3] rounded-t-lg bg-zinc-200" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 rounded bg-zinc-200" />
                <div className="h-4 w-1/2 rounded bg-zinc-200" />
                <div className="h-6 w-1/3 rounded bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
