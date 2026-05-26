"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { templatesService } from "@/lib/services/templates.service";
import type { Template } from "@/types";
import type { TemplateResponse } from "@/types/api";

function mapTemplate(t: TemplateResponse): Template {
  return {
    id: t.id,
    title: t.name,
    description: t.description ?? "",
    content: t.body ?? "",
  };
}

export function useTemplates() {
  const queryClient = useQueryClient();

  // Buscar todos os modelos
  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await templatesService.listTemplates();
      return res.results.map(mapTemplate);
    },
  });

  // Mutação para adicionar modelo
  const addTemplate = useMutation({
    mutationFn: async (templateData: Omit<Template, "id">) => {
      const res = await templatesService.createTemplate({
        name: templateData.title,
        description: templateData.description,
        body: templateData.content,
        variables: [],
      });
      return mapTemplate(res.data);
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

  // Mutação para atualizar
  const updateTemplate = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Omit<Template, "id">> }) => {
      const res = await templatesService.updateTemplate(id, {
        ...(data.title !== undefined && { name: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.content !== undefined && { body: data.content }),
      });
      return mapTemplate(res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Modelo atualizado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar modelo");
    },
  });

  // Mutação para excluir
  const deleteTemplate = useMutation({
    mutationFn: async (id: string) => {
      await templatesService.deleteTemplate(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Modelo removido!");
    },
    onError: () => {
      toast.error("Erro ao remover modelo");
    },
  });

  return {
    templates,
    isLoading,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  };
}
