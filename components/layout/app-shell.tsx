import { Sidebar } from "./sidebar";
import { AlertsProvider } from "@/contexts/alerts-context";
import { DataProvider } from "@/contexts/data-context";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <DataProvider>
      <AlertsProvider>
        <div className="flex h-screen overflow-hidden bg-[var(--background)]">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
        </div>
      </AlertsProvider>
    </DataProvider>
  );
}
