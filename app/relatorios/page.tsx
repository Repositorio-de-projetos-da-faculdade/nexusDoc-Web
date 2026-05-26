"use client";

import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { MOCK_REPORTS } from "@/lib/mock-data";

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar
        title="Relatórios"
        subtitle="Visualização e exportação de dados do sistema"
        action={
          <Button size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Gerar Novo Relatório
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Quick Stats / Summary for Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Total Gerados</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{MOCK_REPORTS.length}</p>
          </div>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Prontos p/ Download</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{MOCK_REPORTS.filter(r => r.status === 'Pronto').length}</p>
          </div>
          <div className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
            <p className="text-xs text-[var(--muted-foreground)] uppercase font-semibold">Em Processamento</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">{MOCK_REPORTS.filter(r => r.status === 'Gerando').length}</p>
          </div>
        </div>

        <div className="border border-[var(--border)] rounded-[var(--radius)] overflow-hidden bg-[var(--card)]">
          <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-[var(--foreground)]">Histórico de Relatórios</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Título do Relatório</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Data de Geração</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Gerado Por</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {MOCK_REPORTS.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm">
                      Nenhum relatório encontrado.
                    </td>
                  </tr>
                ) : (
                  MOCK_REPORTS.map((report, idx) => (
                    <tr
                      key={report.id}
                      className={`border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors duration-100 ${
                        idx % 2 === 0 ? "" : "bg-[var(--muted)]/20"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-[var(--muted-foreground)]">{report.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]">
                            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                          </svg>
                          <p className="font-medium text-[var(--foreground)] truncate max-w-[200px]">{report.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[var(--muted-foreground)]">{report.generatedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center inline-flex gap-1.5 ${
                          report.status === "Pronto" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : 
                          report.status === "Gerando" ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" :
                          "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        }`}>
                          {report.status === "Gerando" && (
                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" disabled={report.status !== "Pronto"}>
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
