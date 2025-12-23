// app/login/loading.jsx
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg animate-pulse space-y-6">
                {/* header skeleton (mimics layout header spacing) */}
                <div className="h-12 bg-gray-200 rounded-md" />

                {/* card skeleton for the login area */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="space-y-3 pt-2">
                        <div className="h-10 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="h-8 bg-gray-200 rounded w-24" />
                        <div className="h-8 bg-gray-200 rounded w-24" />
                    </div>
                </div>

                {/* footer spacing similar to layout */}
                <div className="h-6 bg-gray-200 rounded w-1/3" />
            </div>
        </div>
    );
}