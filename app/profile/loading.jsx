"use client";

export default function Loading() {
  return (
    <div className="layout-skeleton" aria-hidden="true">
      <header className="header skeleton" />
      <div className="body">
        <aside className="sidebar">
          <div className="avatar skeleton" />
          <nav className="nav">
            <div className="nav-line skeleton" />
            <div className="nav-line skeleton" />
            <div className="nav-line skeleton" />
            <div className="nav-line skeleton" />
          </nav>
        </aside>

        <main className="main">
          <div className="hero skeleton" />
          <section className="controls">
            <div className="control skeleton" />
            <div className="control skeleton" />
          </section>

          <section className="grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card skeleton" />
            ))}
          </section>
        </main>
      </div>

      <footer className="footer skeleton" />

      <style jsx>{`
        :root {
          --bg: #f6f6f6;
          --bg-2: #eaeaea;
          --subcolor: var(--bg);
          --shine: linear-gradient(90deg, var(--bg) 25%, #fff 37%, var(--bg) 63%);
          --radius: 10px;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #2b2b2b;
            --bg-2: #303030;
            --subcolor: var(--bg-2);
            --shine: linear-gradient(90deg, var(--bg) 25%, #3a3a3a 37%, var(--bg) 63%);
          }
        }

        .layout-skeleton {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          background: var(--subcolor);
          border-radius: 10px;
        }

        .header {
          height: 64px;
          border-radius: 12px;
        }

        .body {
          display: flex;
          gap: 20px;
          flex: 1;
          align-items: flex-start;
        }

        .sidebar {
          width: 220px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-line {
          height: 14px;
          width: 100%;
          border-radius: 8px;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero {
          height: 160px;
          border-radius: 12px;
        }

        .controls {
          display: flex;
          gap: 12px;
        }

        .control {
          width: 140px;
          height: 36px;
          border-radius: 8px;
        }

        .grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }

        .card {
          height: 140px;
          border-radius: var(--radius);
        }

        .footer {
          height: 56px;
          border-radius: 10px;
        }

        .skeleton {
          background: var(--shine);
          background-size: 400% 100%;
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

        /* Responsive adjustments to match typical layout.jsx behavior */
        @media (max-width: 880px) {
          .body {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            flex-direction: row;
            align-items: center;
          }
          .avatar {
            width: 56px;
            height: 56px;
          }
          .nav {
            flex: 1;
            display: flex;
            gap: 8px;
            overflow: hidden;
          }
          .nav-line {
            height: 12px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
