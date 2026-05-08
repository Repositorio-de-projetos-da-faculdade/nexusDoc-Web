"use client";

import React, { createContext, useContext, useState } from "react";
import { MOCK_CONTRACTS, MOCK_CATEGORIES, MOCK_TEMPLATES } from "@/lib/mock-data";
import type { Contract, Category, Template } from "@/types";

interface DataContextType {
  contracts: Contract[];
  categories: Category[];
  templates: Template[];
  addContract: (contract: Omit<Contract, "id" | "lastUpdated">) => void;
  addCategory: (name: string) => void;
  addTemplate: (template: Omit<Template, "id">) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);

  const addContract = (contractData: Omit<Contract, "id" | "lastUpdated">) => {
    const newId = String(contracts.length > 0 ? Math.max(...contracts.map(c => parseInt(c.id))) + 1 : 1);
    const newContract: Contract = {
      ...contractData,
      id: newId,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setContracts([newContract, ...contracts]);
  };

  const addCategory = (name: string) => {
    const newId = String(categories.length > 0 ? Math.max(...categories.map(c => parseInt(c.id))) + 1 : 1);
    setCategories([...categories, { id: newId, name }]);
  };

  const addTemplate = (templateData: Omit<Template, "id">) => {
    const newId = String(templates.length > 0 ? Math.max(...templates.map(t => parseInt(t.id))) + 1 : 1);
    setTemplates([...templates, { ...templateData, id: newId }]);
  };

  return (
    <DataContext.Provider value={{ contracts, categories, templates, addContract, addCategory, addTemplate }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
