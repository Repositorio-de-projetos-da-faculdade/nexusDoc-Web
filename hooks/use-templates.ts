"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MOCK_TEMPLATES } from "@/lib/mock-data";
import type { Template } from "@/types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function useTemplates() {
  const queryClient = useQueryClient();

  // Buscar todos os modelos
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      await delay(600);
      return [...MOCK_TEMPLATES] as Template[];
    },
  });

  // Mutação para adicionar modelo
  const addTemplate = useMutation({
    mutationFn: async (templateData: Omit<Template, "id">) => {
      await delay(500);
      return { ...templateData, id: Math.random().toString() } as Template;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Modelo criado!", {
        description: `O modelo "${data.title}" foi criado com sucesso.`,
      });
    },
    onError: () => {
      toast.error("Erro ao criar modelo");
    },
  });

  return {
    templates,
    isLoading,
    addTemplate,
  };
}
