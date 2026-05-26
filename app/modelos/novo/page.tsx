"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTemplates } from "@/hooks/use-templates";

export default function NovoModeloPage() {
  const router = useRouter();
  const { addTemplate } = useTemplates();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addTemplate.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        content,
      },
      {
        onSuccess: () => {
          router.push("/modelos");
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <Topbar title="Novo Modelo" subtitle="Crie um modelo reutilizável de contrato" />

      <div className="p-6 max-w-2xl mx-auto w-full mt-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Nome do Modelo</label>
              <Input
                placeholder="Ex: Acordo de Confidencialidade"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Descrição</label>
              <Input
                placeholder="Resumo do modelo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Conteúdo (Markdown)</label>
              <textarea
                className="w-full min-h-[260px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder={"CONTRATO DE PRESTAÇÃO DE SERVIÇOS\n\nCláusula 1: ..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim() || addTemplate.isPending}
              >
                {addTemplate.isPending ? "Salvando…" : "Salvar Modelo"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
