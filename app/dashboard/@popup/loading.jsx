"use client"
export default function Loading() {
    return (
        <div
            className="popup-loading"
            role="status"
            aria-label="Loading"
            aria-busy="true"
            style={{ background: "var(--subcolor)", borderRadius: "10px" }}
        >
            <div className="panel">
                <header className="panel-header">
                    <div className="avatar skeleton" />
                    <div className="meta">
                        <div className="skeleton title" />
                        <div className="skeleton subtitle" />
                    </div>
                </header>

                <main className="panel-body">
                    <div className="cards">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="card" key={i}>
                                <div className="thumb skeleton" />
                                <div className="card-body">
                                    <div className="skeleton line short" />
                                    <div className="skeleton line" />
                                    <div className="skeleton line tiny" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="actions">
                        <div className="skeleton btn" />
                        <div className="skeleton btn muted" />
                    </div>
                </main>
            </div>

            <style jsx>{`
                .popup-loading {
                    min-width: 320px;
                    max-width: 680px;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: var(--subcolor);
                    border-radius: 10px;
                }

                .panel {
                    width: 100%;
                    background: white;
                    border-radius: 12px;
                    padding: 18px;
                    box-shadow: 0 6px 18px rgba(20, 20, 30, 0.08);
                }

                .panel-header {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    margin-bottom: 14px;
                }

                .avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    flex: 0 0 48px;
                }

                .meta {
                    flex: 1;
                }

                .title {
                    width: 45%;
                    height: 14px;
                    margin-bottom: 8px;
                    border-radius: 6px;
                }

                .subtitle {
                    width: 30%;
                    height: 12px;
                    border-radius: 6px;
                }

                .panel-body {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    gap: 12px;
                }

                .card {
                    display: flex;
                    gap: 10px;
                    align-items: flex-start;
                    padding: 10px;
                    border-radius: 10px;
                    background: #fbfbfb;
                }

                .thumb {
                    width: 64px;
                    height: 64px;
                    border-radius: 8px;
                    flex: 0 0 64px;
                }

                .card-body {
                    flex: 1;
                }

                .line {
                    height: 10px;
                    border-radius: 6px;
                    margin-bottom: 8px;
                    width: 100%;
                }

                .line.short {
                    width: 60%;
                }

                .line.tiny {
                    width: 40%;
                    height: 8px;
                }

                .actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 6px;
                }

                .btn {
                    width: 92px;
                    height: 36px;
                    border-radius: 8px;
                }

                .btn.muted {
                    width: 72px;
                    height: 32px;
                }

                /* skeleton shimmer */
                .skeleton {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(90deg, #efefef 25%, #f7f7f7 50%, #efefef 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.2s linear infinite;
                }

                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }

                /* small responsive tweak */
                @media (max-width: 420px) {
                    .cards {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}