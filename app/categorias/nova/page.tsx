"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/use-categories";

export default function NovaCategoriaPage() {
  const router = useRouter();
  const { addCategory } = useCategories();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addCategory.mutate(name.trim(), {
      onSuccess: () => {
        router.push("/contratos");
      },
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <Topbar title="Nova Categoria" />

      <div className="p-6 max-w-xl mx-auto w-full mt-8">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-1">Cadastrar Categoria</h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Crie uma nova categoria para organizar seus contratos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Nome da Categoria</label>
              <Input 
                placeholder="Ex: Recursos Humanos" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!name.trim()}>
                Salvar Categoria
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
