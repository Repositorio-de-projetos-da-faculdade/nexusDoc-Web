"use client";

import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useAlerts } from "@/contexts/alerts-context";

export default function AlertasPage() {
  const { alerts, markAsRead, markAllAsRead } = useAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <span className="text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">🚨</span>;
      case "warning":
        return <span className="text-amber-500 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">⚠️</span>;
      default:
        return <span className="text-blue-500 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">ℹ️</span>;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Alertas e Notificações"
        subtitle="Acompanhe vencimentos e pendências importantes"
        action={
          <Button size="sm" variant="outline" onClick={markAllAsRead}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Marcar todos como lido
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              Você não possui novos alertas.
            </div>
          ) : (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex gap-4 p-4 rounded-[var(--radius)] border transition-all duration-200 ${
                  alert.read 
                    ? "bg-[var(--card)] border-[var(--border)] opacity-70" 
                    : "bg-[var(--accent)]/50 border-[var(--primary)]/30 shadow-sm"
                }`}
              >
                <div className="shrink-0 pt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-sm ${alert.read ? "text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>
                      {alert.title}
                    </h3>
                    <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap ml-4">
                      {new Date(alert.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${alert.read ? "text-[var(--muted-foreground)]" : "text-[var(--foreground)]/80"}`}>
                    {alert.description}
                  </p>
                </div>
                {!alert.read && (
                  <div className="shrink-0 flex items-center">
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                      Lido
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
