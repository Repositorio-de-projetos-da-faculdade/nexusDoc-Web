import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALERTS = [
  {
    id: 1,
    type: "expiring",
    title: "Consultoria Jurídica",
    message: "Vence em 12 dias",
    urgency: "high",
  },
  {
    id: 2,
    type: "pending",
    title: "Fornecimento ERP",
    message: "Aguardando assinatura",
    urgency: "medium",
  },
  {
    id: 3,
    type: "expiring",
    title: "Seguro Empresarial",
    message: "Vence em 45 dias",
    urgency: "low",
  },
];

const URGENCY_STYLES = {
  high: {
    dot: "bg-red-500",
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
  },
  medium: {
    dot: "bg-amber-500",
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
  },
  low: {
    dot: "bg-blue-400",
    border: "border-l-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
} as const;

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Alertas</CardTitle>
          <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full px-2 py-0.5 font-semibold">
            {ALERTS.length} ativos
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {ALERTS.map((alert) => {
        const styles = URGENCY_STYLES[alert.urgency as keyof typeof URGENCY_STYLES];
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border-l-2",
                styles.bg,
                styles.border
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full mt-1.5 shrink-0",
                  styles.dot
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {alert.title}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {alert.message}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0 h-7 px-2 text-xs">
                Ver
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
