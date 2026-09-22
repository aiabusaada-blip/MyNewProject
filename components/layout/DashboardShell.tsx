export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

import Sidebar from "./Sidebar";
import Header from "./Header";
