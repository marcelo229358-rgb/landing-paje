export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-64 rounded bg-zinc-200" />
        <div className="h-5 w-96 rounded bg-zinc-200" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-zinc-200" />
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-zinc-200" />
                  <div className="h-4 w-48 rounded bg-zinc-200" />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-white p-8">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-10 rounded bg-zinc-200" />
                <div className="h-10 rounded bg-zinc-200" />
              </div>
              <div className="h-10 rounded bg-zinc-200" />
              <div className="h-10 rounded bg-zinc-200" />
              <div className="h-24 rounded bg-zinc-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
