"use client"

export default function Loading() {
    return (
        <div
            role="status"
            aria-busy="true"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                background: "var(--subcolor)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 860,
                    background: "var(--subcolor)",
                    borderRadius: 10,
                    padding: 28,
                    boxShadow: "0 6px 30px rgba(16,24,40,0.06)",
                }}
            >
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <div
                        className="skeleton avatar"
                        aria-hidden="true"
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            flex: "0 0 64px",
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ width: "40%", height: 16, borderRadius: 6, marginBottom: 8 }}
                        />
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ width: "24%", height: 12, borderRadius: 6 }}
                        />
                    </div>
                </div>

                <hr style={{ margin: "20px 0", border: "none", height: 1, background: "var(--muted, #eef1f7)" }} />

                <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", gap: 12 }}>
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ flex: 1, height: 44, borderRadius: 8 }}
                        />
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ width: 120, height: 44, borderRadius: 8 }}
                        />
                    </div>

                    <div
                        className="skeleton"
                        aria-hidden="true"
                        style={{ height: 160, borderRadius: 8 }}
                    />

                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ width: 100, height: 40, borderRadius: 8 }}
                        />
                        <div
                            className="skeleton"
                            aria-hidden="true"
                            style={{ width: 160, height: 40, borderRadius: 8 }}
                        />
                    </div>
                </div>

                <style>{`
                    .skeleton {
                        position: relative;
                        overflow: hidden;
                        border-radius: 10px;
                        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.04) 50%, rgba(255,255,255,0) 100%), var(--subcolor);
                        animation: pulse 1.4s ease-in-out infinite;
                    }

                    .skeleton.avatar {
                        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0) 100%), var(--subcolor);
                    }

                    @keyframes pulse {
                        0% { transform: translateZ(0) }
                        50% { opacity: 0.7 }
                        100% { transform: translateZ(0) }
                    }

                    @media (max-width: 520px) {
                        div[role="status"] > div {
                            padding: 20px;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}