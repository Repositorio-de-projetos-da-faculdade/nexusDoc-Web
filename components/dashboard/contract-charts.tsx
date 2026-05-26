"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  BillingEntry,
  ExpenseCategory,
  ClauseType,
} from "@/lib/contract-analysis-data";
import { formatCurrency } from "@/lib/utils";

// =====================================================
// Custom Tooltip
// =====================================================

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-semibold text-[var(--foreground)] mb-1.5">{label}</p>
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center gap-2 py-0.5">
          <div
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--muted-foreground)]">{entry.name}:</span>
          <span className="font-semibold text-[var(--foreground)] ml-auto">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 shadow-xl text-xs">
      <div className="flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: item.payload.color }}
        />
        <span className="font-semibold text-[var(--foreground)]">
          {item.name}
        </span>
      </div>
      <p className="text-[var(--muted-foreground)] mt-1">
        {item.value} cláusula{item.value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// =====================================================
// Billing Area Chart
// =====================================================

export function BillingChart({ data }: { data: BillingEntry[] }) {
  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
        Faturamento Mensal
      </h3>
      <p className="text-[10px] text-[var(--muted-foreground)] mb-4">
        Comparativo entre valores faturados e previstos
      </p>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradFaturado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d5ba" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d5ba" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPrevisto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              iconType="circle"
              iconSize={8}
            />
            <Area
              type="monotone"
              dataKey="previsto"
              name="Previsto"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#gradPrevisto)"
              strokeDasharray="6 3"
            />
            <Area
              type="monotone"
              dataKey="faturado"
              name="Faturado"
              stroke="#34d5ba"
              strokeWidth={2.5}
              fill="url(#gradFaturado)"
              dot={{ r: 3, fill: "#34d5ba", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#34d5ba", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// =====================================================
// Expense Bar Chart
// =====================================================

export function ExpenseBarChart({ data }: { data: ExpenseCategory[] }) {
  const COLORS = ["#34d5ba", "#8b5cf6", "#3b82f6", "#f59e0b", "#ef4444", "#ec4899"];

  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
        Despesas por Categoria
      </h3>
      <p className="text-[10px] text-[var(--muted-foreground)] mb-4">
        Distribuição de custos do contrato
      </p>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="valor" name="Valor" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// =====================================================
// Clause Pie Chart
// =====================================================

export function ClausePieChart({ data }: { data: ClauseType[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
        Tipos de Cláusulas
      </h3>
      <p className="text-[10px] text-[var(--muted-foreground)] mb-4">
        Distribuição por tipo no contrato
      </p>
      <div className="h-[280px] w-full flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              dataKey="count"
              nameKey="type"
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "11px" }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: "var(--foreground)", fontSize: "11px" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-2">
        <span className="text-2xl font-bold text-[var(--foreground)]">{total}</span>
        <span className="text-xs text-[var(--muted-foreground)] ml-1">cláusulas</span>
      </div>
    </div>
  );
}
