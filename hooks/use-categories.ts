"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import type { Category } from "@/types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function useCategories() {
  const queryClient = useQueryClient();

  // Buscar todas as categorias
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      await delay(500);
      return [...MOCK_CATEGORIES] as Category[];
    },
  });

  // Mutação para adicionar categoria
  const addCategory = useMutation({
    mutationFn: async (name: string) => {
      await delay(500);
      return { id: Math.random().toString(), name } as Category;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada!", {
        description: `A categoria "${data.name}" foi criada com sucesso.`,
      });
    },
    onError: () => {
      toast.error("Erro ao criar categoria");
    },
  });

  return {
    categories,
    isLoading,
    addCategory,
  };
}
