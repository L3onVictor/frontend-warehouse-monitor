# Documentação do Frontend - Warehouse Monitor

## Visão Geral
O projeto **frontend-warehouse-monitor** é uma aplicação web moderna construída com **Next.js 16** (App Router), focada em fornecer uma interface intuitiva para o monitoramento de armazéns e dispositivos IoT. A aplicação consome a API do backend para exibir dados em tempo real (via polling ou recarregamento) e gerenciar cadastros.

## Estrutura do Projeto
O projeto utiliza a estrutura do Next.js App Router:

- **app/**: Contém as rotas e páginas da aplicação.
    - **(private)**: Área protegida que requer autenticação (provável estrutura, embora pastas como `ambientes` e `dispositivos` estejam na raiz de `app`).
    - **ambientes/**: Páginas para listagem, criação e edição de ambientes.
    - **dispositivos/**: Páginas para gerenciamento de dispositivos.
    - **login/**: Página de autenticação.
    - **components/**: Componentes de UI reutilizáveis (ex: Cards, Gráficos, Inputs).
    - **services/**: Camada de comunicação com a API (HTTP Clients).
    - **contexts/**: Gerenciamento de estado global (se aplicável).

## Dependências Principais
- **Framework**: Next.js 16 (`next`)
- **Biblioteca UI**: React 19 (`react`, `react-dom`)
- **Estilização**: Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/postcss`)
- **Gráficos**: Recharts (`recharts`) para visualização de dados de temperatura e umidade.
- **Linguagem**: TypeScript.

## Funcionalidades e Rotas

### 1. Dashboard / Home (`/`)
Visão geral do sistema.

### 2. Dispositivos (`/dispositivos`)
- **Listagem**: Exibe todos os dispositivos, organizados por ambiente ou status.
    - Componente Principal: `DispositivosClient` (`app/dispositivos/DispositivosClient.tsx`).
    - Exibe cards com informações do dispostivo.
- **Novo Dispositivo** (`/dispositivos/novo`): Formulário para cadastro.
- **Detalhes/Monitoramento** (`/dispositivos/[id]` ou `/dispositivos/[id]/monitorar`): Exibe gráficos e histórico de medições.
- **Edição** (`/dispositivos/[id]/editar`): Alterar dados do dispositivo.

### 3. Ambientes (`/ambientes`)
- **Listagem**: Gerenciamento dos locais monitorados.
- **Cadastro/Edição**: Configuração de limites de temperatura e umidade para alertas.

### 4. Autenticação
- **Login** (`/login`): Acesso ao sistema.
- **Perfil** (`/perfil`): Gerenciamento de dados do usuário (ex: alterar senha, configurações de e-mail).
- **Esqueci/Redefinir Senha**: Processos de recuperação de conta.

## Componentes Chave
- **DeviceCard**: Exibe o resumo de um dispositivo na listagem.
- **Gráficos (Chart Components)**: Utilizam `recharts` para plotar histórico de temperatura/umidade.
- **Layout**: Estrutura global da aplicação (Sidebar, Navbar).

## Estilização
O projeto utiliza **Tailwind CSS** para estilização utilitária, garantindo um design responsivo e consistente. Um arquivo `globals.css` define estilos base e variáveis de tema.

## Autenticação e Controle de Acesso

O sistema gerencia o acesso às rotas através do componente `AppShell` e do contexto `AuthContext`. O mapeamento de permissões é definido da seguinte forma:

### Rotas Públicas (Acesso Livre)
Estas rotas podem ser acessadas por qualquer usuário, mesmo sem autenticação:
- **/login**: Página de acesso ao sistema.
- **/cadastro-usuario**: Página para novos registros.
- **/esqueci-senha**: Solicitação de recuperação de acesso.
- **/redefinir-senha**: Definição de nova senha.

### Rotas Privadas (Requer Autenticação)
Todas as demais rotas são protegidas e exigem que o usuário esteja logado. O layout da aplicação (Sidebar e Navbar) só é renderizado para estas rotas:
- **/** (Dashboard): Painel principal.
- **/dispositivos**: Listagem e gerenciamento de dispositivos.
- **/dispositivos/novo**: Cadastro de dispositivo.
- **/dispositivos/[id]**: Detalhes e monitoramento.
- **/ambientes**: Gerenciamento de ambientes.
- **/perfil**: (Se implementado) Configurações do usuário.
- **/configuracoes**: Configurações gerais.

### Mecanismo de Proteção
1. **Frontend**: O componente `AppShell` verifica o `pathname`. Se não for uma rota pública, ele renderiza a estrutura logada. O `AuthContext` verifica a sessão ativa chamando o backend.
2. **Integração**: Ao tentar fazer chamadas para a API em rotas protegidas sem sessão válida, o backend retorna `401 Unauthorized`, o que deve instruir o frontend a redirecionar o usuário para o login.
