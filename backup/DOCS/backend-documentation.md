# Documentação do Backend - Warehouse Monitor

## Visão Geral
O projeto **backend-warehouse-monitor** é uma aplicação Node.js construída com **Express**, utilizando **TypeScript** e seguindo os princípios da **Clean Architecture**. O objetivo principal é gerenciar o monitoramento de armazéns, lidando com ambientes, dispositivos IoT, medições de sensores, usuários e notificações.

A aplicação serve como uma API REST para o frontend e também se comunica com um Broker MQTT para receber dados de sensores em tempo real.

## Estrutura do Projeto
O projeto segue uma estrutura baseada em camadas (Clean Architecture):

- **src/application**: Contém as regras de negócio da aplicação (Use Cases). Cada funcionalidade tem seu próprio Use Case (ex: `CriarAmbienteUseCase`, `CadastrarMedicaoUseCase`).
- **src/domain**: Contém as entidades e interfaces do domínio (ex: `Ambiente`, `Dispositivo`, `Medicao`, `Usuario`). Aqui residem as interfaces dos repositórios.
- **src/infra**: Implementação da infraestrutura.
    - **database**: Configuração e implementações dos repositórios usando **Mongoose** (MongoDB).
    - **http**: Configuração do servidor Express e definição das Rotas.
    - **mqtt**: Cliente e assinante MQTT para comunicação com dispositivos.
    - **smtp**: Implementação de envio de e-mails com **Nodemailer**.
- **src/interface**: Adaptadores de interface, contendo os Controllers que recebem as requisições HTTP e chamam os Use Cases.

## Dependências Principais
As principais tecnologias e bibliotecas utilizadas são:

- **Runtime**: Node.js
- **Linguagem**: TypeScript
- **Framework Web**: Express (`express`, `@types/express`)
- **Banco de Dados**: MongoDB (via `mongoose`)
- **Comunicação IoT**: MQTT (`mqtt`)
- **Autenticação**: JSON Web Token (`jsonwebtoken`) e BCrypt (`bcrypt`) para hash de senhas.
- **Validação**: Zod (`zod`)
- **E-mail**: Nodemailer (`nodemailer`)
- **Utilitários**: UUID (`uuid`), Dotenv (`dotenv`), Cookie Parser (`cookie-parser`), CORS (`cors`).

## Módulos e Entidades Principais

### 1. Ambiente
Gerencia os espaços físicos monitorados (ex: galpões, salas refrigeradas).
- **Atributos**: Nome, descrição, limites de temperatura/umidade.
- **Funcionalidades**: Criar, Listar, Atualizar, Remover.

### 2. Dispositivo
Representa os equipamentos IoT (sensores/controladores) instalados nos ambientes.
- **Atributos**: ID, Nome, Ambiente vinculado.
- **Funcionalidades**: Cadastrar, Listar, Atualizar, Remover.
- **Integração MQTT**: A aplicação assina tópicos específicos de cada dispositivo para receber medições.

### 3. Medição
Registra os dados coletados pelos dispositivos.
- **Atributos**: Temperatura, Umidade, Data/Hora, Dispositivo.
- **Funcionalidades**: Cadastrar (via MQTT ou HTTP), Buscar histórico, Buscar última medição.
- **Alertas**: Ao cadastrar uma medição, o sistema verifica se os valores estão fora dos limites do ambiente e gera alertas/notificações.

### 4. Usuário e Autenticação
Gerenciamento de acesso e perfis.
- **Funcionalidades**: Cadastro, Login, Atualização de perfil, Ativar/Desativar recebimento de e-mail.

### 5. Notificação e Alerta
Sistema de avisos para os usuários quando condições críticas são detectadas (ex: temperatura alta).

## API Endpoints (Rotas)

A aplicação expõe as seguintes rotas principais:

### Ambiente (`/ambiente`)
- `POST /`: Criar ambiente
- `GET /`: Listar ambientes
- `PATCH /:id`: Atualizar ambiente
- `DELETE /:id`: Remover ambiente

### Dispositivo (`/dispositivo`)
- `POST /`: Cadastrar dispositivo
- `GET /`: Listar dispositivos
- `PATCH /:id`: Atualizar dispositivo
- `DELETE /:id`: Remover dispositivo

### Medição (`/medicao`)
- `POST /buscar`: Buscar medições (com filtros)
- `POST /buscar-ultima`: Buscar última medição de um dispositivo

### Usuário (`/usuario`)
- `POST /`: Criar usuário
- `PATCH /:id`: Atualizar usuário
- `DELETE /:id`: Remover usuário
- `PATCH /:id/ativar-email`: Ativar recebimento de e-mails
- `PATCH /:id/desativar-email`: Desativar recebimento de e-mails

### Autenticação (`/autenticacao`)
- `POST /`: Realizar Login

### Notificação (`/notificacao`)
- `GET /usuario/:usuarioId`: Listar notificações de um usuário
- `PATCH /:id/lida`: Marcar notificação como lida

## Execução
O ponto de entrada da aplicação é o arquivo `src/main.ts`, que inicializa:
1. Conexão com MongoDB.
2. Cliente MQTT e assinaturas.
3. Transporter de E-mail.
4. Repositórios, Use Cases e Controllers.
5. Servidor HTTP.
