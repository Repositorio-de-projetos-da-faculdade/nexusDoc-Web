"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { contractsService } from "@/lib/services/contracts.service";

/**
 * O backend hoje gera relatórios sob demanda (`GET /contracts/report`) e
 * devolve o arquivo diretamente — não há histórico persistido. Esta página
 * dispara a geração e baixa o arquivo no navegador. Quando o backend
 * expuser `GET /reports` com histórico, popular a tabela abaixo.
 */
export default function RelatoriosPage() {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await contractsService.downloadReport();
      toast.success("Relatório gerado e baixado.");
    } catch (err) {
      toast.error("Não foi possível gerar o relatório.", {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Relatórios"
        subtitle="Geração e exportação de dados do sistema"
        action={
          <Button size="sm" onClick={handleGenerate} disabled={generating}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {generating ? "Gerando..." : "Gerar Novo Relatório"}
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Total Gerados</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">—</p>
          </div>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Prontos p/ Download</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">—</p>
          </div>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Em Processamento</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">—</p>
          </div>
        </div>

        <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)]">
          <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-[var(--foreground)]">Histórico de Relatórios</h3>
          </div>
          <div className="px-4 py-16 text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">
              Histórico de relatórios ainda não disponível.
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              Use o botão acima para gerar e baixar um relatório consolidado dos contratos do workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
