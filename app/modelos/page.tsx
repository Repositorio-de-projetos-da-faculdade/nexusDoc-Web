"use client";

import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useTemplates } from "@/hooks/use-templates";

export default function ModelosPage() {
  const { templates } = useTemplates();

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <Topbar 
        title="Modelos de Contrato" 
        subtitle="Gerencie modelos padronizados de documentos"
        action={
          <Button size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Modelo
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div 
              key={t.id} 
              className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-5 hover:border-[var(--primary)] transition-colors duration-200 cursor-pointer flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-base text-[var(--foreground)] line-clamp-2">{t.title}</h3>
                <span className="text-[10px] bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded-full font-mono shrink-0 ml-2">
                  ID: {t.id}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-4 flex-1">
                {t.description}
              </p>
              
              <div className="border-t border-[var(--border)] pt-4 mt-auto flex justify-between items-center">
                <Button variant="outline" size="sm" className="h-8 text-xs">Editar</Button>
                <Button size="sm" className="h-8 text-xs">Usar Modelo</Button>
              </div>
            </div>
          ))}

          {/* New template placeholder */}
          <div className="border-2 border-dashed border-[var(--border)] rounded-[var(--radius)] p-5 flex flex-col items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors duration-200 cursor-pointer min-h-[200px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="font-medium">Criar Modelo Base</span>
          </div>
        </div>
      </div>
    </div>
  );
}
