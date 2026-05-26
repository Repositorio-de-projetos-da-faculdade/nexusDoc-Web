"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mail, Lock, Loader2, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Campos obrigatórios", {
        description: "Preencha o e-mail e a senha para continuar.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success("Bem-vindo de volta!", {
        description: "Login realizado com sucesso.",
      });
      window.location.href = "/";
    } catch (err: any) {
      toast.error("Falha na Autenticação", {
        description: err.message || "Credenciais inválidas. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[var(--background)] overflow-hidden">
      {/* Lado Esquerdo - Branding/Hero (Oculto em telas pequenas) */}
      <div className="hidden lg:flex flex-1 relative bg-[var(--card)] border-r border-[var(--border)] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--background)] to-[var(--accent)]/20 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[100px] animate-pulse z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--brand-600)]/20 rounded-full blur-[100px] animate-pulse z-0 delay-1000"></div>

        <div className="relative z-10 flex flex-col justify-center items-start p-24 w-full h-full max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[var(--primary)] p-3 rounded-2xl shadow-lg shadow-[var(--primary)]/20">
              <FileText className="text-[var(--primary-foreground)] h-8 w-8" />
            </div>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight font-[family-name:var(--font-oxanium)]">
              Nexus<span className="text-[var(--primary)]">Doc</span>
            </h1>
          </div>

          <h2 className="text-5xl font-extrabold text-[var(--foreground)] leading-tight mb-6">
            A Gestão Inteligente <br/> de seus Contratos.
          </h2>

          <p className="text-lg text-[var(--muted-foreground)] mb-12 max-w-md leading-relaxed">
            Utilize Inteligência Artificial para auditar cláusulas, gerenciar vigências e otimizar processos legais.
          </p>

          <div className="flex items-center gap-4 bg-[var(--card)]/50 backdrop-blur-md p-5 rounded-2xl border border-[var(--border)] shadow-xl">
            <div className="bg-[var(--accent)] p-3 rounded-xl text-[var(--primary)] shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)]">Análise IA em Segundos</h4>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Extração automática de até 99% de precisão.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Form de Login */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative z-10 bg-[var(--background)]">
        <div className="w-full max-w-md">
          {/* Logo Mobile */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-[var(--primary)] p-2 rounded-xl shadow-lg">
              <FileText className="text-[var(--primary-foreground)] h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight font-[family-name:var(--font-oxanium)]">
              Nexus<span className="text-[var(--primary)]">Doc</span>
            </h1>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">Bem-vindo(a)</h2>
            <p className="text-[var(--muted-foreground)] text-sm">
              Insira suas credenciais para acessar a plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                  <Input 
                    type="email" 
                    placeholder="voce@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-[var(--card)] border-[var(--border)] focus:border-[var(--primary)] rounded-xl transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Senha</label>
                  <a href="#" className="text-xs font-medium text-[var(--primary)] hover:underline">Esqueceu a senha?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-[var(--card)] border-[var(--border)] focus:border-[var(--primary)] rounded-xl transition-all"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-[var(--primary)] text-white hover:bg-[var(--brand-600)] shadow-lg shadow-[var(--primary)]/20 text-base font-bold rounded-xl mt-6 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                "Entrar na Plataforma"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Ainda não tem uma conta?{' '}
              <Link href="/register" className="font-bold text-[var(--primary)] hover:underline transition-all">
                Crie seu workspace
              </Link>
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-xs">
            <ShieldCheck size={16} />
            <span>Ambiente seguro e criptografado de ponta a ponta.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
