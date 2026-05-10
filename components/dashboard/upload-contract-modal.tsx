"use client";

import { useState, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContracts } from "@/hooks/use-contracts";
import { FileUp, Loader2, FileType, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadContractModal() {
  const [open, setOpen] = useState(false);
  const { uploadContract } = useContracts();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    await uploadContract.mutateAsync(file);
    setOpen(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-none border-none">
          <FileUp size={16} className="mr-2" />
          Subir Contrato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Análise Inteligente de Contratos</DialogTitle>
          <DialogDescription>
            Suba o PDF do contrato. Nossa IA irá extrair automaticamente todas as cláusulas, datas e contrapartes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all",
              file 
                ? "border-[var(--primary)] bg-[var(--primary)]/5" 
                : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]"
            )}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
            />
            
            {file ? (
              <div className="text-center animate-in fade-in zoom-in duration-300">
                <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="text-[var(--primary)] h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{file.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • PDF pronto para análise
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 text-xs h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Trocar arquivo
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto mb-3">
                  <FileType className="text-[var(--muted-foreground)] h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">Clique para selecionar ou arraste o PDF</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Apenas arquivos PDF são aceitos para análise</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={uploadContract.isPending}
          >
            Cancelar
          </Button>
          <Button 
            disabled={!file || uploadContract.isPending}
            onClick={handleSubmit}
            className="min-w-[120px]"
          >
            {uploadContract.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              "Iniciar Análise"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
