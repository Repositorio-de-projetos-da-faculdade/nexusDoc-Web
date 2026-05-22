

// ============================================================
// Contract AI Analysis — Mock data simulating backend/AI JSON
// ============================================================

export interface SuspiciousClause {
  id: string;
  clause: string;
  excerpt: string;
  severity: "alta" | "média" | "baixa";
  recommendation: string;
}

export interface BillingEntry {
  month: string;
  faturado: number;
  previsto: number;
}

export interface ExpenseCategory {
  category: string;
  valor: number;
}

export interface ClauseType {
  type: string;
  count: number;
  color: string;
}

export interface ContractAnalysis {
  contractId: string;
  riskScore: number;
  validityStatus: "vigente" | "próximo_vencimento" | "expirado" | "pendente";
  daysRemaining: number;
  totalDays: number;
  percentElapsed: number;
  aiSummary: string;
  suspiciousClauses: SuspiciousClause[];
  billingHistory: BillingEntry[];
  expenseBreakdown: ExpenseCategory[];
  clauseBreakdown: ClauseType[];
  recommendations: string[];
  keyMetrics: {
    totalPaid: number;
    totalRemaining: number;
    avgMonthly: number;
    renewalProbability: number;
  };
}

export const MOCK_CONTRACT_ANALYSES: Record<string, ContractAnalysis> = {
  "1": {
    contractId: "1",
    riskScore: 28,
    validityStatus: "vigente",
    daysRemaining: 235,
    totalDays: 350,
    percentElapsed: 33,
    aiSummary:
      "O contrato de Prestação de Serviços de TI com a Acme Tecnologia apresenta baixo risco geral. A vigência está dentro do esperado e os pagamentos estão em dia. Foram identificadas 2 cláusulas que merecem atenção na próxima renovação, relacionadas a multa rescisória e SLA de atendimento. O faturamento mensal está consistente com a previsão orçamentária.",
    suspiciousClauses: [
      {
        id: "sc1",
        clause: "Cláusula 8.3 — Multa Rescisória",
        excerpt:
          "Em caso de rescisão antecipada por qualquer das partes, a parte rescindente pagará multa equivalente a 50% do valor restante do contrato...",
        severity: "média",
        recommendation:
          "Renegociar para multa proporcional ao tempo restante, limitada a 20% do valor remanescente.",
      },
      {
        id: "sc2",
        clause: "Cláusula 12.1 — SLA de Atendimento",
        excerpt:
          "O tempo máximo de resposta para chamados críticos será de 48 horas úteis...",
        severity: "baixa",
        recommendation:
          "Considerar reduzir para 24 horas úteis em chamados críticos para alinhar com padrão de mercado.",
      },
    ],
    billingHistory: [
      { month: "Jan", faturado: 7000, previsto: 7000 },
      { month: "Fev", faturado: 7000, previsto: 7000 },
      { month: "Mar", faturado: 7200, previsto: 7000 },
      { month: "Abr", faturado: 6800, previsto: 7000 },
      { month: "Mai", faturado: 7000, previsto: 7000 },
      { month: "Jun", faturado: 7100, previsto: 7000 },
      { month: "Jul", faturado: 7000, previsto: 7000 },
      { month: "Ago", faturado: 7300, previsto: 7000 },
      { month: "Set", faturado: 7000, previsto: 7000 },
      { month: "Out", faturado: 0, previsto: 7000 },
      { month: "Nov", faturado: 0, previsto: 7000 },
      { month: "Dez", faturado: 0, previsto: 7000 },
    ],
    expenseBreakdown: [
      { category: "Licenças", valor: 28000 },
      { category: "Suporte", valor: 18000 },
      { category: "Consultoria", valor: 22000 },
      { category: "Infraestrutura", valor: 16000 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 12, color: "#34d5ba" },
      { type: "Penalidades", count: 5, color: "#f59e0b" },
      { type: "Confidencialidade", count: 3, color: "#8b5cf6" },
      { type: "Propriedade Intelectual", count: 4, color: "#3b82f6" },
      { type: "Rescisão", count: 2, color: "#ef4444" },
    ],
    recommendations: [
      "Renegociar cláusula de multa rescisória antes da próxima renovação",
      "Solicitar redução do SLA de chamados críticos para 24h úteis",
      "Incluir cláusula de reajuste anual pelo IPCA",
      "Adicionar métricas de performance mensuráveis ao SLA",
    ],
    keyMetrics: {
      totalPaid: 63400,
      totalRemaining: 20600,
      avgMonthly: 7044,
      renewalProbability: 85,
    },
  },
  "2": {
    contractId: "2",
    riskScore: 15,
    validityStatus: "vigente",
    daysRemaining: 412,
    totalDays: 730,
    percentElapsed: 44,
    aiSummary:
      "O contrato de Locação de Espaço Corporativo com Imóveis Prime apresenta risco muito baixo. Contrato de longo prazo com cláusulas padrão de mercado. Os pagamentos estão regulares e o reajuste anual foi aplicado conforme previsto.",
    suspiciousClauses: [
      {
        id: "sc3",
        clause: "Cláusula 5.2 — Reajuste Extraordinário",
        excerpt:
          "O locador poderá aplicar reajuste extraordinário em caso de valorização acima de 15% do metro quadrado na região...",
        severity: "baixa",
        recommendation:
          "Limitar reajuste extraordinário a no máximo 10% acima do IGPM anual.",
      },
    ],
    billingHistory: [
      { month: "Jan", faturado: 13000, previsto: 13000 },
      { month: "Fev", faturado: 13000, previsto: 13000 },
      { month: "Mar", faturado: 13000, previsto: 13000 },
      { month: "Abr", faturado: 13000, previsto: 13000 },
      { month: "Mai", faturado: 13200, previsto: 13000 },
      { month: "Jun", faturado: 13200, previsto: 13000 },
      { month: "Jul", faturado: 13200, previsto: 13200 },
      { month: "Ago", faturado: 13200, previsto: 13200 },
      { month: "Set", faturado: 0, previsto: 13200 },
      { month: "Out", faturado: 0, previsto: 13200 },
      { month: "Nov", faturado: 0, previsto: 13200 },
      { month: "Dez", faturado: 0, previsto: 13200 },
    ],
    expenseBreakdown: [
      { category: "Aluguel", valor: 96000 },
      { category: "IPTU", valor: 24000 },
      { category: "Condomínio", valor: 18000 },
      { category: "Manutenção", valor: 18000 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 8, color: "#34d5ba" },
      { type: "Penalidades", count: 3, color: "#f59e0b" },
      { type: "Garantias", count: 4, color: "#8b5cf6" },
      { type: "Reajuste", count: 2, color: "#3b82f6" },
      { type: "Rescisão", count: 2, color: "#ef4444" },
    ],
    recommendations: [
      "Negociar teto para reajuste extraordinário",
      "Incluir cláusula de preferência na renovação",
      "Verificar cobertura do seguro predial",
    ],
    keyMetrics: {
      totalPaid: 104800,
      totalRemaining: 51200,
      avgMonthly: 13100,
      renewalProbability: 92,
    },
  },
  "3": {
    contractId: "3",
    riskScore: 55,
    validityStatus: "pendente",
    daysRemaining: 365,
    totalDays: 365,
    percentElapsed: 0,
    aiSummary:
      "O contrato de Fornecimento de Software ERP com OmegaSoft está pendente de ativação. A análise identificou cláusulas com risco moderado, especialmente relacionadas a lock-in de dados e limites de licença. Recomenda-se revisão jurídica antes da assinatura.",
    suspiciousClauses: [
      {
        id: "sc4",
        clause: "Cláusula 3.1 — Propriedade dos Dados",
        excerpt:
          "Todos os dados inseridos na plataforma serão armazenados em formato proprietário do fornecedor...",
        severity: "alta",
        recommendation:
          "Exigir exportação em formato aberto (CSV/JSON) e cláusula de portabilidade de dados.",
      },
      {
        id: "sc5",
        clause: "Cláusula 7.2 — Limite de Usuários",
        excerpt:
          "A licença contempla até 50 usuários. Cada usuário adicional será cobrado a R$ 150/mês sem limite...",
        severity: "média",
        recommendation:
          "Negociar pacotes de usuários adicionais com desconto progressivo e teto de cobrança.",
      },
      {
        id: "sc6",
        clause: "Cláusula 14.1 — Foro Competente",
        excerpt:
          "Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer dúvidas...",
        severity: "baixa",
        recommendation:
          "Verificar se o foro de SP é conveniente para a empresa ou solicitar alteração.",
      },
    ],
    billingHistory: [
      { month: "Jan", faturado: 0, previsto: 0 },
      { month: "Fev", faturado: 0, previsto: 0 },
      { month: "Mar", faturado: 0, previsto: 0 },
      { month: "Abr", faturado: 0, previsto: 0 },
      { month: "Mai", faturado: 0, previsto: 4000 },
      { month: "Jun", faturado: 0, previsto: 4000 },
      { month: "Jul", faturado: 0, previsto: 4000 },
      { month: "Ago", faturado: 0, previsto: 4000 },
      { month: "Set", faturado: 0, previsto: 4000 },
      { month: "Out", faturado: 0, previsto: 4000 },
      { month: "Nov", faturado: 0, previsto: 4000 },
      { month: "Dez", faturado: 0, previsto: 4000 },
    ],
    expenseBreakdown: [
      { category: "Licença Base", valor: 24000 },
      { category: "Implantação", valor: 12000 },
      { category: "Treinamento", valor: 6000 },
      { category: "Suporte Premium", valor: 6000 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 10, color: "#34d5ba" },
      { type: "Penalidades", count: 6, color: "#f59e0b" },
      { type: "Dados/PI", count: 5, color: "#8b5cf6" },
      { type: "Licenciamento", count: 4, color: "#3b82f6" },
      { type: "Rescisão", count: 3, color: "#ef4444" },
    ],
    recommendations: [
      "URGENTE: Exigir portabilidade de dados em formato aberto",
      "Negociar pacotes de usuários adicionais com desconto",
      "Adicionar SLA de disponibilidade (99.5% uptime)",
      "Incluir cláusula de penalidade por indisponibilidade",
      "Solicitar período de teste de 30 dias antes da ativação",
    ],
    keyMetrics: {
      totalPaid: 0,
      totalRemaining: 48000,
      avgMonthly: 4000,
      renewalProbability: 60,
    },
  },
  "4": {
    contractId: "4",
    riskScore: 42,
    validityStatus: "expirado",
    daysRemaining: 0,
    totalDays: 365,
    percentElapsed: 100,
    aiSummary:
      "O contrato de Consultoria Jurídica com Carvalho & Associados expirou em dezembro de 2024. Os serviços continuam sendo prestados sob aditivo tácito. Recomenda-se formalizar a renovação com novos termos e valores atualizados.",
    suspiciousClauses: [
      {
        id: "sc7",
        clause: "Cláusula 9.1 — Renovação Tácita",
        excerpt:
          "Na ausência de manifestação contrária com 90 dias de antecedência, o contrato será renovado automaticamente pelo mesmo período e valores...",
        severity: "média",
        recommendation:
          "Formalizar novo contrato com valores reajustados e escopo atualizado.",
      },
    ],
    billingHistory: [
      { month: "Jan", faturado: 3000, previsto: 3000 },
      { month: "Fev", faturado: 3000, previsto: 3000 },
      { month: "Mar", faturado: 3500, previsto: 3000 },
      { month: "Abr", faturado: 3000, previsto: 3000 },
      { month: "Mai", faturado: 3000, previsto: 3000 },
      { month: "Jun", faturado: 4000, previsto: 3000 },
      { month: "Jul", faturado: 3000, previsto: 3000 },
      { month: "Ago", faturado: 3000, previsto: 3000 },
      { month: "Set", faturado: 2500, previsto: 3000 },
      { month: "Out", faturado: 3000, previsto: 3000 },
      { month: "Nov", faturado: 3000, previsto: 3000 },
      { month: "Dez", faturado: 3000, previsto: 3000 },
    ],
    expenseBreakdown: [
      { category: "Consultoria", valor: 24000 },
      { category: "Pareceres", valor: 6000 },
      { category: "Contencioso", valor: 4000 },
      { category: "Compliance", valor: 2000 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 6, color: "#34d5ba" },
      { type: "Honorários", count: 4, color: "#f59e0b" },
      { type: "Confidencialidade", count: 3, color: "#8b5cf6" },
      { type: "Rescisão", count: 2, color: "#ef4444" },
    ],
    recommendations: [
      "Formalizar renovação urgentemente",
      "Atualizar escopo de serviços",
      "Incluir KPIs de performance jurídica",
      "Renegociar honorários com base em benchmark de mercado",
    ],
    keyMetrics: {
      totalPaid: 37000,
      totalRemaining: 0,
      avgMonthly: 3083,
      renewalProbability: 78,
    },
  },
  "5": {
    contractId: "5",
    riskScore: 72,
    validityStatus: "expirado",
    daysRemaining: 0,
    totalDays: 365,
    percentElapsed: 100,
    aiSummary:
      "O contrato de Marketing Digital com Growth Agency expirou e não foi renovado. Análise pós-contrato identificou cláusulas abusivas e performance abaixo do esperado. Os resultados de ROI ficaram 40% abaixo da meta contratual.",
    suspiciousClauses: [
      {
        id: "sc8",
        clause: "Cláusula 4.2 — Exclusividade",
        excerpt:
          "O contratante compromete-se a não contratar serviços similares de terceiros durante a vigência e por 12 meses após o término...",
        severity: "alta",
        recommendation:
          "Cláusula abusiva. Período de não-competição pós-contrato não é usual para serviços de marketing.",
      },
      {
        id: "sc9",
        clause: "Cláusula 6.1 — Meta de Resultados",
        excerpt:
          "As metas de performance são indicativas e não constituem obrigação de resultado...",
        severity: "alta",
        recommendation:
          "Em futuros contratos, vincular parte do pagamento ao atingimento de metas mensuráveis.",
      },
    ],
    billingHistory: [
      { month: "Jan", faturado: 5000, previsto: 5000 },
      { month: "Fev", faturado: 5000, previsto: 5000 },
      { month: "Mar", faturado: 5000, previsto: 5000 },
      { month: "Abr", faturado: 5000, previsto: 5000 },
      { month: "Mai", faturado: 5000, previsto: 5000 },
      { month: "Jun", faturado: 5500, previsto: 5000 },
      { month: "Jul", faturado: 5500, previsto: 5000 },
      { month: "Ago", faturado: 5000, previsto: 5000 },
      { month: "Set", faturado: 5000, previsto: 5000 },
      { month: "Out", faturado: 5000, previsto: 5000 },
      { month: "Nov", faturado: 5000, previsto: 5000 },
      { month: "Dez", faturado: 5000, previsto: 5000 },
    ],
    expenseBreakdown: [
      { category: "Mídia Paga", valor: 30000 },
      { category: "Criação", valor: 15000 },
      { category: "Gestão", valor: 10000 },
      { category: "Ferramentas", valor: 5000 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 8, color: "#34d5ba" },
      { type: "Exclusividade", count: 3, color: "#f59e0b" },
      { type: "Resultados", count: 4, color: "#8b5cf6" },
      { type: "Pagamento", count: 3, color: "#3b82f6" },
      { type: "Rescisão", count: 2, color: "#ef4444" },
    ],
    recommendations: [
      "NÃO renovar nas condições anteriores",
      "Remover cláusula de exclusividade pós-contrato",
      "Vincular 30% do pagamento a metas de resultado",
      "Buscar novos fornecedores com benchmark comparativo",
    ],
    keyMetrics: {
      totalPaid: 61000,
      totalRemaining: 0,
      avgMonthly: 5083,
      renewalProbability: 15,
    },
  },
  "6": {
    contractId: "6",
    riskScore: 20,
    validityStatus: "pendente",
    daysRemaining: 365,
    totalDays: 365,
    percentElapsed: 0,
    aiSummary:
      "Contrato de Manutenção Predial em fase de rascunho. As cláusulas estão dentro dos padrões de mercado. Risco baixo identificado.",
    suspiciousClauses: [],
    billingHistory: [
      { month: "Jun", faturado: 0, previsto: 2000 },
      { month: "Jul", faturado: 0, previsto: 2000 },
      { month: "Ago", faturado: 0, previsto: 2000 },
      { month: "Set", faturado: 0, previsto: 2000 },
      { month: "Out", faturado: 0, previsto: 2000 },
      { month: "Nov", faturado: 0, previsto: 2000 },
      { month: "Dez", faturado: 0, previsto: 2000 },
      { month: "Jan", faturado: 0, previsto: 2000 },
      { month: "Fev", faturado: 0, previsto: 2000 },
      { month: "Mar", faturado: 0, previsto: 2000 },
      { month: "Abr", faturado: 0, previsto: 2000 },
      { month: "Mai", faturado: 0, previsto: 2000 },
    ],
    expenseBreakdown: [
      { category: "Mão de obra", valor: 14400 },
      { category: "Materiais", valor: 6000 },
      { category: "Equipamentos", valor: 3600 },
    ],
    clauseBreakdown: [
      { type: "Obrigações", count: 6, color: "#34d5ba" },
      { type: "Penalidades", count: 2, color: "#f59e0b" },
      { type: "Garantias", count: 3, color: "#8b5cf6" },
    ],
    recommendations: [
      "Incluir cláusula de emergência com SLA diferenciado",
      "Definir checklist de vistoria mensal",
    ],
    keyMetrics: {
      totalPaid: 0,
      totalRemaining: 24000,
      avgMonthly: 2000,
      renewalProbability: 70,
    },
  },
  "7": {
    contractId: "7",
    riskScore: 18,
    validityStatus: "vigente",
    daysRemaining: 262,
    totalDays: 365,
    percentElapsed: 28,
    aiSummary:
      "O Plano de Saúde Corporativo com SaudePlan está vigente e com baixo risco. Boa cobertura e atendimento regular. Recomenda-se análise comparativa antes da renovação para garantir melhores condições.",
    suspiciousClauses: [
      {
        id: "sc10",
        clause: "Cláusula 11.3 — Reajuste Anual",
        excerpt:
          "O reajuste anual será baseado na sinistralidade do grupo, podendo ser superior ao índice da ANS...",
        severity: "baixa",
        recommendation:
          "Negociar teto de reajuste atrelado ao índice da ANS + margem máxima de 5%.",
      },
    ],
    billingHistory: [
      { month: "Fev", faturado: 16000, previsto: 16000 },
      { month: "Mar", faturado: 16000, previsto: 16000 },
      { month: "Abr", faturado: 16200, previsto: 16000 },
      { month: "Mai", faturado: 16000, previsto: 16000 },
      { month: "Jun", faturado: 0, previsto: 16000 },
      { month: "Jul", faturado: 0, previsto: 16000 },
      { month: "Ago", faturado: 0, previsto: 16000 },
      { month: "Set", faturado: 0, previsto: 16000 },
      { month: "Out", faturado: 0, previsto: 16000 },
      { month: "Nov", faturado: 0, previsto: 16000 },
      { month: "Dez", faturado: 0, previsto: 16000 },
      { month: "Jan", faturado: 0, previsto: 16000 },
    ],
    expenseBreakdown: [
      { category: "Plano Básico", valor: 120000 },
      { category: "Plano Executivo", valor: 48000 },
      { category: "Odontológico", valor: 24000 },
    ],
    clauseBreakdown: [
      { type: "Cobertura", count: 8, color: "#34d5ba" },
      { type: "Carência", count: 3, color: "#f59e0b" },
      { type: "Reajuste", count: 2, color: "#8b5cf6" },
      { type: "Rescisão", count: 2, color: "#ef4444" },
    ],
    recommendations: [
      "Fazer cotação com pelo menos 3 operadoras antes da renovação",
      "Negociar teto de reajuste baseado na ANS",
      "Avaliar inclusão de telemedicina no plano",
    ],
    keyMetrics: {
      totalPaid: 64200,
      totalRemaining: 127800,
      avgMonthly: 16050,
      renewalProbability: 88,
    },
  },
  "8": {
    contractId: "8",
    riskScore: 35,
    validityStatus: "pendente",
    daysRemaining: 365,
    totalDays: 365,
    percentElapsed: 0,
    aiSummary:
      "O Seguro Empresarial de Frota com SecuraBrasil está pendente de ativação. Análise identificou cobertura adequada, mas com franquias acima da média de mercado.",
    suspiciousClauses: [
      {
        id: "sc11",
        clause: "Cláusula 6.4 — Franquia",
        excerpt:
          "A franquia por sinistro será de 15% do valor do veículo, com mínimo de R$ 3.000...",
        severity: "média",
        recommendation:
          "Negociar franquia de 10% com mínimo de R$ 1.500, conforme padrão de mercado.",
      },
    ],
    billingHistory: [
      { month: "Mai", faturado: 0, previsto: 2400 },
      { month: "Jun", faturado: 0, previsto: 2400 },
      { month: "Jul", faturado: 0, previsto: 2400 },
      { month: "Ago", faturado: 0, previsto: 2400 },
      { month: "Set", faturado: 0, previsto: 2400 },
      { month: "Out", faturado: 0, previsto: 2400 },
      { month: "Nov", faturado: 0, previsto: 2400 },
      { month: "Dez", faturado: 0, previsto: 2400 },
      { month: "Jan", faturado: 0, previsto: 2400 },
      { month: "Fev", faturado: 0, previsto: 2400 },
      { month: "Mar", faturado: 0, previsto: 2400 },
      { month: "Abr", faturado: 0, previsto: 2400 },
    ],
    expenseBreakdown: [
      { category: "Seguro Veicular", valor: 18000 },
      { category: "Rastreamento", valor: 4800 },
      { category: "Assistência 24h", valor: 3600 },
      { category: "Vidros", valor: 2400 },
    ],
    clauseBreakdown: [
      { type: "Cobertura", count: 10, color: "#34d5ba" },
      { type: "Franquia", count: 4, color: "#f59e0b" },
      { type: "Exclusões", count: 6, color: "#8b5cf6" },
      { type: "Sinistro", count: 3, color: "#3b82f6" },
    ],
    recommendations: [
      "Negociar redução da franquia para 10%",
      "Verificar cobertura para terceiros",
      "Incluir cobertura para veículos reserva",
    ],
    keyMetrics: {
      totalPaid: 0,
      totalRemaining: 28800,
      avgMonthly: 2400,
      renewalProbability: 75,
    },
  },
};
