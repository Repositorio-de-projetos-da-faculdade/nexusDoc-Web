"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { useCategories } from "@/hooks/use-categories";
import { useTemplates } from "@/hooks/use-templates";
import { useContracts } from "@/hooks/use-contracts";
import type { ContractStatus } from "@/types";

export default function NovoContratoPage() {
  const router = useRouter();
  const { categories } = useCategories();
  const { templates } = useTemplates();
  const { addContract } = useContracts();

  const [title, setTitle] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !counterparty || !categoryId || !startDate || !endDate) return;

    addContract.mutate({
      title,
      counterparty,
      categoryId,
      templateId: templateId || undefined,
      value: Number(value) || 0,
      startDate,
      endDate,
      status: "draft" as ContractStatus,
      owner: "Usuário Logado",
      tags: [],
    }, {
      onSuccess: () => {
        router.push("/contratos");
      },
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <Topbar title="Novo Contrato" />

      <div className="p-6 max-w-2xl mx-auto w-full mt-4 overflow-y-auto">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-1">Cadastrar Contrato</h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Preencha os dados básicos do contrato para adicioná-lo ao sistema.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Título do Contrato *</label>
              <Input 
                placeholder="Ex: Contrato de Prestação de Serviços" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Parte Contrária (Fornecedor/Cliente) *</label>
              <Input 
                placeholder="Ex: Empresa ABC Ltda." 
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Categoria *</label>
                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="" disabled>Selecione uma categoria...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Vincular a Modelo (Opcional)</label>
                <Select value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                  <option value="">Sem modelo associado</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Valor (R$)</label>
              <Input 
                type="number"
                placeholder="Ex: 50000" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Data de Início *</label>
                <Input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Data de Fim *</label>
                <Input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t border-[var(--border)] mt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Contrato
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
