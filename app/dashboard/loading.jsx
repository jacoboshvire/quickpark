"use client"
export default function loading() {
  return (
    <>
      <div className="s-layout">
        <header className="s-header skeleton" />

        <div className="s-body">
          <aside className="s-sidebar">
            <div className="s-profile">
              <div className="s-avatar skeleton" />
              <div>
                <div className="s-line skeleton short" />
                <div className="s-line skeleton shorter" />
              </div>
            </div>

            <nav className="s-nav">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="s-nav-item skeleton" />
              ))}
            </nav>
          </aside>

          <main className="s-main">
            <div className="s-controls">
              <div className="s-line skeleton small" />
              <div className="s-line skeleton medium" />
            </div>

            <section className="s-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <article key={i} className="s-card">
                  <div className="s-card-title skeleton" />
                  <div className="s-card-row skeleton" />
                  <div className="s-card-row skeleton shorter" />
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>

      <style jsx>{`
        .s-layout {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fafafa;
          color: #222;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
            Arial;
        }

        .s-header {
          height: 64px;
          padding: 12px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .s-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .s-sidebar {
          width: 240px;
          min-width: 160px;
          padding: 20px;
          border-right: 1px solid rgba(0,0,0,0.04);
          box-sizing: border-box;
        }

        .s-profile {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .s-avatar {
          width: 48px;
          height: 48px;
          border-radius: 8px;
        }

        .s-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .s-nav-item {
          height: 14px;
          border-radius: 6px;
        }

        .s-main {
          flex: 1;
          padding: 24px;
          overflow: auto;
        }

        .s-controls {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .s-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .s-card {
          padding: 16px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 1px 0 rgba(0,0,0,0.02);
        }

        .s-card-title {
          height: 16px;
          width: 60%;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .s-card-row {
          height: 12px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .s-line {
          height: 12px;
          border-radius: 6px;
        }

        /* size helpers */
        .short { width: 120px; }
        .shorter { width: 80px; }
        .small { width: 100px; }
        .medium { width: 200px; }

        /* skeleton shimmer */
        .skeleton {
          position: relative;
          background: linear-gradient(90deg, #eeeeee 25%, #e0e0e0 37%, #eeeeee 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* apply requested background and border radius to divs */
        div {
          background: var(--subcolor) !important;
          border-radius: 10px;
        }

        /* responsive */
        @media (max-width: 800px) {
          .s-sidebar { display: none; }
          .s-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        }
      `}</style>
    </>
  );
}
