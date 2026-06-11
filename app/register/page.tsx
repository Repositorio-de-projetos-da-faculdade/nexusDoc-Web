"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mail, Lock, Loader2, FileText, Sparkles, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !workspaceName) {
      toast.error("Campos obrigatórios", {
        description: "Preencha todos os campos para continuar.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await register({ name, email, password, workspace_name: workspaceName });
      toast.success("Conta criada!", {
        description: "Seu workspace foi criado com sucesso.",
      });
      window.location.href = "/";
    } catch (err: any) {
      toast.error("Falha ao criar conta", {
        description: err.message || "Verifique os dados e tente novamente.",
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="bg-[var(--primary)] p-3 rounded-2xl shadow-lg shadow-[var(--primary)]/20">
              <FileText className="text-[var(--primary-foreground)] h-8 w-8" />
            </div>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight font-[family-name:var(--font-oxanium)]">
              Gra<span className="text-[var(--primary)]">con</span>
            </h1>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold text-[var(--foreground)] leading-tight mb-6"
          >
            Transforme sua gestão <br/> de Contratos.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-[var(--muted-foreground)] mb-12 max-w-md leading-relaxed"
          >
            Crie seu ambiente exclusivo e convide sua equipe para colaborar com inteligência artificial.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 bg-[var(--card)]/50 backdrop-blur-md p-5 rounded-2xl border border-[var(--border)] shadow-xl"
          >
            <div className="bg-[var(--accent)] p-3 rounded-xl text-[var(--primary)] shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)]">Workspace Exclusivo</h4>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Multi-tenancy nativo. Controle total dos seus dados.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lado Direito - Form de Registro */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative z-10 bg-[var(--background)]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo Mobile */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-[var(--primary)] p-2 rounded-xl shadow-lg">
              <FileText className="text-[var(--primary-foreground)] h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight font-[family-name:var(--font-oxanium)]">
              Gra<span className="text-[var(--primary)]">con</span>
            </h1>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">Criar Conta</h2>
            <p className="text-[var(--muted-foreground)] text-sm">
              Preencha os dados abaixo para configurar sua empresa.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">Seu Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                <Input 
                  type="text" 
                  placeholder="Ex: João da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-[var(--card)] border-[var(--border)] focus:border-[var(--primary)] rounded-xl transition-all"
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">Nome da Empresa (Workspace)</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
                <Input 
                  type="text" 
                  placeholder="Nome do seu time ou empresa"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="pl-10 h-12 bg-[var(--card)] border-[var(--border)] focus:border-[var(--primary)] rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">Senha Segura</label>
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

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-[var(--primary)] text-white hover:bg-[var(--brand-600)] shadow-lg shadow-[var(--primary)]/20 text-base font-bold rounded-xl mt-6 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Meu Workspace"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Já possui uma conta?{' '}
              <Link href="/login" className="font-bold text-[var(--primary)] hover:underline transition-all">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-xs">
            <ShieldCheck size={16} />
            <span>Ambiente seguro e criptografado de ponta a ponta.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
