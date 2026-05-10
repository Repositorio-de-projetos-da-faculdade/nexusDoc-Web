import type { Contract, Document, Party, Alert, Report, Category, Template } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Tecnologia" },
  { id: "2", name: "Imóveis" },
  { id: "3", name: "Software" },
  { id: "4", name: "Jurídico" },
  { id: "5", name: "Marketing" },
  { id: "6", name: "Facilities" },
  { id: "7", name: "RH" },
  { id: "8", name: "Seguros" },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Prestação de Serviços Padrão",
    description: "Modelo base para qualquer contratação de prestação de serviços B2B.",
    content: "CONTRATO DE PRESTAÇÃO DE SERVIÇOS...\n\nCláusula 1: O contratado obriga-se a..."
  },
  {
    id: "2",
    title: "Contrato de Locação Comercial",
    description: "Para locação de galpões e lajes corporativas.",
    content: "CONTRATO DE LOCAÇÃO COMERCIAL...\n\nOs signatários firmam o presente..."
  },
  {
    id: "3",
    title: "Acordo de Confidencialidade (NDA)",
    description: "Non-Disclosure Agreement padrão para parceiros.",
    content: "TERMO DE CONFIDENCIALIDADE...\n\nNenhuma informação poderá ser vazada..."
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços — TI",
    counterparty: "Acme Tecnologia Ltda.",
    status: "active",
    value: 84000,
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    categoryId: "1",
    owner: "Lucas Ferreira",
    tags: ["TI", "SLA", "Renovação Automática"],
    lastUpdated: "2025-04-10",
  },
  {
    id: "2",
    title: "Locação de Espaço Corporativo",
    counterparty: "Imóveis Prime S/A",
    status: "active",
    value: 156000,
    startDate: "2024-07-01",
    endDate: "2026-06-30",
    categoryId: "2",
    owner: "Ana Beatriz",
    tags: ["Imóvel", "Sede", "Longo Prazo"],
    lastUpdated: "2025-03-22",
  },
  {
    id: "3",
    title: "Fornecimento de Software ERP",
    counterparty: "OmegaSoft Brasil",
    status: "pending",
    value: 48000,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
    categoryId: "3",
    owner: "Lucas Ferreira",
    tags: ["ERP", "Licença", "Suporte"],
    lastUpdated: "2025-04-18",
  },
  {
    id: "4",
    title: "Consultoria Jurídica Mensal",
    counterparty: "Carvalho & Associados",
    status: "active",
    value: 36000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    categoryId: "4",
    owner: "Mariana Costa",
    tags: ["Jurídico", "Mensal"],
    lastUpdated: "2025-01-05",
  },
  {
    id: "5",
    title: "Serviços de Marketing Digital",
    counterparty: "Growth Agency Ltda.",
    status: "expired",
    value: 60000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    categoryId: "5",
    owner: "Carlos Lima",
    tags: ["Marketing", "Digital", "Expirado"],
    lastUpdated: "2025-01-01",
  },
  {
    id: "6",
    title: "Manutenção Predial — Sede SP",
    counterparty: "BuildFix Serviços",
    status: "draft",
    value: 24000,
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    categoryId: "6",
    owner: "Ana Beatriz",
    tags: ["Manutenção", "Facilities"],
    lastUpdated: "2025-04-20",
  },
  {
    id: "7",
    title: "Plano de Saúde Corporativo",
    counterparty: "SaudePlan Operadora",
    status: "active",
    value: 192000,
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    categoryId: "7",
    owner: "Mariana Costa",
    tags: ["RH", "Benefícios", "Coletivo"],
    lastUpdated: "2025-02-15",
  },
  {
    id: "8",
    title: "Seguro Empresarial — Frota",
    counterparty: "SecuraBrasil Seguros",
    status: "pending",
    value: 28800,
    startDate: "2025-05-15",
    endDate: "2026-05-14",
    categoryId: "8",
    owner: "Carlos Lima",
    tags: ["Seguro", "Frota"],
    lastUpdated: "2025-04-22",
  },
];

export const STATUS_CONFIG = {
  active: {
    label: "Ativo",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pendente",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    dot: "bg-amber-500",
  },
  expired: {
    label: "Expirado",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    dot: "bg-red-500",
  },
  draft: {
    label: "Rascunho",
    color: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    dot: "bg-gray-400",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    dot: "bg-gray-300",
  },
} as const;

export const MOCK_DOCUMENTS: Document[] = [
  { id: "1", title: "Contrato Assinado.pdf", type: "PDF", contractId: "1", uploadedBy: "Lucas Ferreira", uploadDate: "2025-04-10", size: "2.4 MB" },
  { id: "2", title: "Aditivo_01.docx", type: "Word", contractId: "1", uploadedBy: "Ana Beatriz", uploadDate: "2025-04-12", size: "1.1 MB" },
  { id: "3", title: "CNPJ_Comprovante.pdf", type: "PDF", contractId: "2", uploadedBy: "Mariana Costa", uploadDate: "2025-03-20", size: "0.5 MB" },
  { id: "4", title: "Proposta Comercial.pdf", type: "PDF", uploadedBy: "Carlos Lima", uploadDate: "2025-04-20", size: "3.2 MB" },
];

export const MOCK_PARTIES: Party[] = [
  { id: "1", name: "Acme Tecnologia Ltda.", type: "Fornecedor", contact: "João Silva", email: "joao@acme.com.br", status: "Ativo" },
  { id: "2", name: "Imóveis Prime S/A", type: "Fornecedor", contact: "Maria Oliveira", email: "maria@imoveisprime.com", status: "Ativo" },
  { id: "3", name: "Growth Agency Ltda.", type: "Parceiro", contact: "Pedro Santos", email: "pedro@growth.com", status: "Inativo" },
  { id: "4", name: "Cliente VIP S/A", type: "Cliente", contact: "Ana Costa", email: "ana.costa@vip.com", status: "Ativo" },
];

export const MOCK_ALERTS: Alert[] = [
  { id: "1", title: "Vencimento Próximo", description: "O contrato 5 expira em 5 dias.", date: "2025-04-25", read: false, type: "critical" },
  { id: "2", title: "Assinatura Pendente", description: "Falta a assinatura do Diretor no contrato 3.", date: "2025-04-24", read: false, type: "warning" },
  { id: "3", title: "Novo Documento", description: "Aditivo_01.docx foi adicionado ao contrato 1.", date: "2025-04-23", read: true, type: "info" },
];

export const MOCK_REPORTS: Report[] = [
  { id: "1", title: "Relatório de Vencimentos - Maio/2025", date: "2025-04-25", generatedBy: "Lucas Ferreira", status: "Pronto" },
  { id: "2", title: "Despesas por Categoria - Q1", date: "2025-04-01", generatedBy: "Mariana Costa", status: "Pronto" },
  { id: "3", title: "Auditoria de Acessos", date: "2025-04-26", generatedBy: "Sistema", status: "Gerando" },
];
