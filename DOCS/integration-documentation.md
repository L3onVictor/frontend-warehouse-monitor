# Documentação de Integração - Backend & Frontend

## Visão Geral da Comunicação
A comunicação entre o **Backend** e o **Frontend** é realizada via protocolo **HTTP (REST)**.
- O **Backend** expõe uma API na porta `3000` (padrão) ou conforme configurado no ambiente.
- O **Frontend** consome essa API através de funções utilitárias localizadas em `frontend/services/api.ts`.

## Padrão de Integração
O frontend utiliza um padrão de **Service Layer** para centralizar as chamadas HTTP. Isso desacopla os componentes React da lógica de rede.

### Arquivo: `frontend/services/api.ts`
Este arquivo contém:
1. **Configuração Base**: Define a `API_URL` (ex: `http://localhost:3000`).
2. **Wrapper `apiFetch`**: Uma função que envolve o `fetch` nativo para:
    - Adicionar cabeçalhos padrões (`Content-Type: application/json`).
    - Incluir credenciais (cookies/sessão) automaticamente (`credentials: "include"`).
    - Tratar erros de resposta (lança exceções se `!response.ok`).
3. **Tipagem**: Exporta interfaces TypeScript que espelham as entidades do backend (ex: `Dispositivo`, `Ambiente`, `Medicao`), garantindo segurança de tipos.

## Exemplo Detalhado: CRUD de Dispositivo

Abaixo descrevemos o fluxo completo de uma operação, pegando como exemplo a **Listagem de Dispositivos**.

### 1. Frontend: Componente React
No arquivo `app/dispositivos/DispositivosClient.tsx`:
- O componente utiliza o hook `useEffect` para carregar dados ao montar.
- Chama a função `listarDispositivos()` importada de `@/services/api`.

```typescript
// app/dispositivos/DispositivosClient.tsx
import { listarDispositivos } from "@/services/api";

// ... dentro do componente
useEffect(() => {
    const fetchData = async () => {
        const devicesData = await listarDispositivos();
        setDevices(devicesData);
    };
    fetchData();
}, []);
```

### 2. Frontend: Service Layer
No arquivo `services/api.ts`, a função executa a requisição HTTP GET:

```typescript
// services/api.ts
export async function listarDispositivos(): Promise<Dispositivo[]> {
    // Faz GET para http://localhost:3000/dispositivo
    const response = await apiFetch(`/dispositivo`, {
      method: "GET",
      cache: "no-store", // Evita cache para dados em tempo real
    });
    
    // Processa a resposta JSON
    const data = await response.json();
    return data.dispositivos; // Backend retorna objeto { dispositivos: [...] }
}
```

### 3. Backend: Rota e Controller
O Backend recebe a requisição na rota `/dispositivo`.
- **Rota**: Definida em `src/infra/http/routes/routes.ts`, mapeia `/dispositivo` para `DispositivoRoutes`.
- **Controller**: `ListarDispositivosController` recebe o request.

### 4. Backend: Casos de Uso e Banco de Dados
- O Controller invoca o **Use Case** `ListarDispositivosUseCase`.
- O Use Case chama o **Repositório** `MongooseDispositivoRepository`.
- O Repositório consulta o banco **MongoDB** e retorna os documentos.
- O dado faz o caminho inverso até ser devolvido como JSON para o frontend.

## Pontos de Atenção na Integração

### Autenticação
- O sistema utiliza autenticação (provavelmente baseada em Cookies/Sessão ou JWT transparente), já que o `apiFetch` define `credentials: "include"`.
- Se a resposta for `401 Unauthorized`, o frontend pode redirecionar para `/login`.

### Tratamento de Datas
- Há uma observação importante no código sobre filtros de data: o backend espera objetos Date, mas o JSON trafega strings. O frontend possui uma correção temporária que remove filtros de data para evitar erros de validação (`api.ts` linhas 68-73). Isso é um ponto de dívida técnica identificado na integração.

### Real-time vs Polling
- Embora o backend suporte MQTT para comunicação com dispositivos, a comunicação Backend -> Frontend para atualização de dados (ex: nova medição) parece ser feita via **Polling** (requisições periódicas ou recarregamento de página/componente) ou atualização manual pelo usuário, já que não foram identificados WebSockets ou Server-Sent Events (SSE) no código do frontend analisado.
