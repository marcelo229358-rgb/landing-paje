export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-64 rounded bg-zinc-200" />
        <div className="h-5 w-96 rounded bg-zinc-200" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-[4/3] rounded-lg bg-zinc-200" />
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-3/4 rounded bg-zinc-200" />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-6">
              <div className="h-10 w-20 rounded bg-zinc-200" />
              <div className="mt-2 h-4 w-32 rounded bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
