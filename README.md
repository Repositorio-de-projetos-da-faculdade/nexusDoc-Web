
## 💻 [Gracon] — Aplicação Web (Frontend)

Painel administrativo e dashboard do MVP. Interface construída com React e Next.js para consumo dos dados extraídos pela nossa API de contratos.

## 🛠 Tecnologias

* **Framework:** Next.js 14 (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Componentes base:** shadcn/ui
* **Requisições:** Fetch API / React Query

## 🚀 Como rodar localmente (Setup)

### Pré-requisitos
* Node.js v20+ instalado.
* API do Backend rodando localmente (necessário para os endpoints reais).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:Repositorio-de-projetos-da-faculdade/gracon-Web.git
   cd gracon-Web

2. **Instale as dependencias:**
   ```bash
      npm install

3. **Configure as variáveis de ambiente:**
   ```bash
      cp .env.local.example .env.local
Certifique-se de que a variável NEXT_PUBLIC_API_URL aponte para http://localhost:3000.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
    npm run dev
Abra http://localhost:3000 (ou a porta informada no terminal) no seu navegador.

###🧩 Adicionando novos componentes UI.

Estamos utilizando o shadcn/ui para acelerar o desenvolvimento. Para adicionar um novo componente base (ex: um botão ou um modal), utilize o CLI na raiz do projeto:

    npx shadcn-ui@latest add button
    npx shadcn-ui@latest add dialog
Os componentes serão instalados na pasta components/ui e você pode estilizá-los com Tailwind livremente.

##⚠️ Padrões da Equipe

Commits: Padrão convencional (ex: ui: update dashboard layout).

Deploy: Feito automaticamente via Vercel a cada merge na branch main.
