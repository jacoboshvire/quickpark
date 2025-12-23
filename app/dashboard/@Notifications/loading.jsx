"use client"
export default function Loading() {
    return (
        <div className="p-6 space-y-6" role="status" aria-busy="true">
            {/* Page header skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div
                        className="h-8 w-48 animate-pulse"
                        style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                    />
                    <div
                        className="h-4 w-36 animate-pulse"
                        style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                    />
                </div>
                <div
                    className="h-10 w-24 animate-pulse"
                    style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                />
            </div>
            <div className="mb-4 p-4" style={{ background: "var(--subcolor)", borderRadius: "10px" }} />
            {/* Notifications list skeleton */}
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-start space-x-4 p-4 rounded-lg shadow-sm"
                        style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                    >
                        {/* avatar */}
                        <div className="flex-shrink-0">
                            <div
                                className="h-10 w-10 animate-pulse"
                                style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                            />
                        </div>

                        {/* content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <div
                                    className="h-4 w-40 animate-pulse"
                                    style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                                />
                                <div
                                    className="h-3 w-16 animate-pulse"
                                    style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                                />
                            </div>

                            <div className="mt-2 space-y-2">
                                <div
                                    className="h-3 w-full max-w-[60%] animate-pulse"
                                    style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                                />
                                <div
                                    className="h-3 w-full max-w-[80%] animate-pulse"
                                    style={{ background: "var(--subcolor)", borderRadius: "10px" }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}