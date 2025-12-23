"use client"
export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" aria-busy="true" aria-live="polite">
      {/* Header / Post meta skeleton */}
      <div className="flex items-center space-x-4 animate-pulse">
        <div
          className="h-12 w-12"
          style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
        />
        <div className="flex-1 space-y-2 py-1">
          <div
            className="h-4 w-3/4"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
          <div
            className="h-3 w-1/2"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
        </div>
      </div>
      <div
        className="h-4 w-full animate-pulse"
        style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
      />
      {/* Hero image skeleton */}
      <div
        className="h-64 animate-pulse"
        style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
      />

      {/* Title + intro skeleton */}
      <div className="space-y-4">
        <div
          className="h-6 w-1/3 animate-pulse"
          style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
        />
        <div className="space-y-2">
          <div
            className="h-4 w-full animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
          <div
            className="h-4 w-5/6 animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
          <div
            className="h-4 w-2/3 animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <main className="md:col-span-2 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i} className="p-4 border rounded-md bg-transparent">
              <div
                className="h-4 w-1/3 mb-3 animate-pulse"
                style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
              />
              <div className="space-y-2">
                <div
                  className="h-3 w-full animate-pulse"
                  style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
                />
                <div
                  className="h-3 w-11/12 animate-pulse"
                  style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
                />
                <div
                  className="h-3 w-4/5 animate-pulse"
                  style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
                />
              </div>
            </article>
          ))}
        </main>

        <aside className="space-y-4">
          <div
            className="p-4 h-28 animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
          <div
            className="p-4 h-12 animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
          <div
            className="p-4 h-12 animate-pulse"
            style={{ backgroundColor: "var(--subcolor)", borderRadius: "10px" }}
          />
        </aside>
      </div>
    </div>
  )
}