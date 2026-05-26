"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriesService } from "@/lib/services/categories.service";
import type { Category } from "@/types";
import type { CategoryResponse } from "@/types/api";

function toCategory(c: CategoryResponse): Category {
  return { id: c.id, name: c.name };
}

export function useCategories() {
  const queryClient = useQueryClient();

  // Buscar todas as categorias
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoriesService.listCategories();
      return response.results.map(toCategory);
    },
  });

  // Mutação para adicionar categoria
  const addCategory = useMutation({
    mutationFn: async (name: string) => {
      const response = await categoriesService.createCategory({ name });
      return toCategory(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada!", {
        description: `A categoria "${data.name}" foi criada com sucesso.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar categoria", {
        description: error.message,
      });
    },
  });

  return {
    categories,
    isLoading,
    addCategory,
  };
}
