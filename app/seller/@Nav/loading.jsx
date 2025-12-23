"use client"
export default function loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* page title */}
      <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
      <>
        <style>{`
          .animate-pulse > div,
          .animate-pulse div {
            background: var(--subcolor) !important;
            border-radius: 10px !important;
          }
        `}</style>
      </>
      {/* profile header */}
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
      </div>

      {/* two-column content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* list/items */}
      <div className="mt-4 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  )
}