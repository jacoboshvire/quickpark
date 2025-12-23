"use client"

export default function Loading() {
    return (
        <div
            role="status"
            aria-busy="true"
            className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        >
            {/* Sidebar skeleton */}
            <aside className="w-64 p-4 space-y-4 border-r border-gray-200 dark:border-gray-800 hidden md:block">
                <div className="h-10 w-36 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                <nav className="mt-6 space-y-3">
                    <div className="h-3 w-40 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    <div className="h-3 w-32 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    <div className="h-3 w-28 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    <div className="h-3 w-44 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                </nav>
            </aside>

            {/* Main area */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                        <div className="h-5 w-56 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-20 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                        <div className="h-8 w-8 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    </div>
                </header>

                {/* Content skeleton grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <article
                            key={i}
                            className="p-4 rounded-[10px] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="h-36 rounded-[10px] bg-[var(--subcolor)] animate-pulse mb-4" />
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                                <div className="h-3 w-1/2 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                                <div className="h-3 w-2/3 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                            </div>
                        </article>
                    ))}
                </section>

                {/* Footer / small controls */}
                <div className="mt-8 flex justify-end space-x-3">
                    <div className="h-9 w-28 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                    <div className="h-9 w-20 rounded-[10px] bg-[var(--subcolor)] animate-pulse" />
                </div>
            </main>
        </div>
    );
}