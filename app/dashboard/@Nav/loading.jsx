"use client"

export default function Loading() {
  return (
    <div
      className="loading-root"
      role="status"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <header className="topbar">
        <div className="logo skeleton" />
        <div className="search skeleton" />
        <div className="avatar skeleton" />
      </header>

      <div className="body">
        <aside className="sidebar">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="side-item skeleton" />
          ))}
        </aside>

        <main className="content">
          <div className="cards">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card skeleton">
                <div className="title skeleton" />
                <div className="line skeleton" />
                <div className="line short skeleton" />
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        .loading-root {
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          box-sizing: border-box;
          background: #f6f7f9;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
            Arial;
        }

        .topbar {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 8px 12px;
        }

        .logo {
          width: 120px;
          height: 28px;
          border-radius: 6px;
        }

        .search {
          flex: 1;
          height: 36px;
          border-radius: 8px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        .body {
          display: flex;
          gap: 16px;
          flex: 1;
          min-height: 0;
        }

        .sidebar {
          width: 220px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 8px;
        }

        .side-item {
          height: 42px;
          border-radius: 8px;
        }

        .content {
          flex: 1;
          padding: 8px;
          overflow: auto;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .card {
          padding: 12px;
          border-radius: 10px;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .title {
          width: 50%;
          height: 18px;
          border-radius: 6px;
        }

        .line {
          width: 100%;
          height: 12px;
          border-radius: 6px;
        }

        .line.short {
          width: 70%;
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #ececec 25%,
            #f5f5f5 50%,
            #ececec 75%
          );
          background-size: 200% 100%;
          animation: pulse 1.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (max-width: 720px) {
          .body {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            flex-direction: row;
            overflow: auto;
          }
          .side-item {
            min-width: 120px;
            height: 36px;
          }
          .cards {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}