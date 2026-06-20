# 💉 Vacina Kids — Plataforma de Acompanhamento Vacinal Infantil

Este projeto foi desenvolvido como parte de um desafio técnico com o objetivo de criar uma plataforma para acompanhamento da jornada de vacinação infantil, permitindo que pais e responsáveis acompanhem vacinas, campanhas e histórico vacinal de seus filhos de forma simples e organizada.

Autor: **Wemerson Matheus**

---

## 🚀 Aplicação Publicada

🌐 **Deploy:** https://vacina-kids-zeta.vercel.app/

💻 **GitHub:** https://github.com/wemersonmatheuss/vacina-kids

---

## 📌 Objetivo

> Desenvolver uma aplicação web moderna para auxiliar responsáveis no acompanhamento da vacinação infantil, reduzindo a dependência da carteira física e facilitando o acesso às informações de saúde.

O projeto teve como objetivos principais:

* Implementar autenticação de usuários com Firebase Authentication
* Persistir dados em banco de dados Cloud Firestore
* Desenvolver um CRUD completo de crianças
* Exibir histórico e situação vacinal individual por criança
* Disponibilizar campanhas de vacinação e catálogo de vacinas
* Aplicar boas práticas de arquitetura e experiência do usuário

---

## 🧠 O que foi aplicado neste projeto

* Desenvolvimento de SPA utilizando Angular e Ionic
* Integração com Firebase Authentication
* Persistência de dados com Cloud Firestore
* Arquitetura organizada em Core, Shared, Features e Layout
* Componentes Standalone e Lazy Loading
* Controle de acesso através de Guards de rota
* Componentização e reutilização de componentes
* Estados de carregamento, erro e telas vazias
* Responsividade para desktop, tablet e dispositivos móveis
* Seed automático de dados para demonstração

---

## 🛠️ Tecnologias Utilizadas

### Front-end

* **Angular 20**
* **TypeScript 5**
* **Ionic 8**
* **RxJS**
* **AngularFire**
* **Capacitor**
* **SCSS**

### Back-end / Serviços

* **Firebase Authentication**
* **Cloud Firestore**

### Deploy

* **Vercel**
* **Firebase Hosting (configurado)**

---

## 🎨 Paleta de Cores

| Cor                | Hex     |
| ------------------ | ------- |
| Verde Principal    | #ABC270 |
| Amarelo Secundário | #FEC868 |
| Laranja Alerta     | #FDA769 |
| Marrom Escuro      | #473C33 |

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários
* Login com e-mail e senha
* Controle de sessão
* Proteção de rotas

### 🏠 Início

* Resumo geral da família
* Quantidade de crianças cadastradas
* Vacinas pendentes
* Campanhas ativas
* Alertas de vacinação atrasada
* Campanha em destaque

### 👶 Gerenciamento de Crianças

* Cadastro de crianças
* Edição de informações
* Exclusão de registros
* Busca por nome
* Histórico individual

### 💉 Controle Vacinal

* Visualização de vacinas aplicadas
* Identificação de vacinas pendentes
* Identificação de vacinas atrasadas
* Linha do tempo vacinal
* Indicadores de progresso

### 📢 Campanhas

* Listagem de campanhas
* Visualização de detalhes
* Destaque para campanhas ativas

### 👤 Perfil

* Atualização de nome
* Alteração de senha
* Logout

---

## 🗂️ Arquitetura do Projeto

```text
frontend/
├── src/app
│   ├── core
│   ├── shared
│   ├── features
│   └── layout
├── environments
├── firestore.rules
├── firebase.json
└── capacitor.config.ts
```

### Padrões adotados

* Componentes Standalone
* Lazy Loading de rotas
* Services centralizados
* Route Guards
* Componentes reutilizáveis
* Separação por domínio de negócio
* Estados de carregamento padronizados

---

## 📊 Cenários do Desafio Atendidos

| Cenário                        | Implementação                            |
| ------------------------------ | ---------------------------------------- |
| Vacinas concluídas e pendentes | Timeline, badges e indicadores visuais   |
| Vacinas atrasadas              | Status OVERDUE e alertas no Início       |
| Campanhas ativas               | Banner de destaque e página de campanhas |
| Múltiplos filhos               | Histórico individual por criança         |

---

## 🧪 Dados de Demonstração

O sistema popula automaticamente dados de exemplo para facilitar a avaliação do projeto.

### Crianças cadastradas

| Nome        | Nascimento |
| ----------- | ---------- |
| Lucas Silva | 12/05/2021 |
| Sofia Silva | 10/02/2023 |

### Situações simuladas

#### Lucas Silva

* Vacina BCG concluída
* Histórico vacinal preenchido

#### Sofia Silva

* Vacina Tríplice Viral atrasada
* Exemplo de pendência vacinal

### Campanhas de Demonstração

* Campanha Nacional de Influenza
* Campanha de Multivacinação 2026 (ativa)

Esses dados permitem visualizar todas as funcionalidades sem necessidade de cadastro manual.

---

## ⚠️ Limitação do Projeto

O sistema não possui painel administrativo.

Em um cenário real, apenas profissionais autorizados poderiam registrar aplicações de vacinas e atualizar registros clínicos.

Nesta versão:

* O responsável apenas consulta informações
* Não é possível marcar vacinas como aplicadas
* Os registros vacinais são simulados através do Seed Service
* O foco está no acompanhamento e visualização dos dados

Essa decisão foi tomada para manter o escopo do desafio focado na experiência do usuário e na organização das informações de saúde infantil.

---

## 🖥️ Como rodar o projeto localmente

### Pré-requisitos

* Node.js 18+
* npm
* Conta Firebase

### Clonar o projeto

```bash
git clone https://github.com/wemersonmatheuss/vacina-kids.git
```

### Acessar a pasta

```bash
cd vacina-kids/frontend
```

### Instalar dependências

```bash
npm install
```

### Configurar Firebase

Criar o arquivo:

```bash
src/environments/environment.ts
```

Preencher com as credenciais do Firebase.

### Executar o projeto

```bash
npm start
```

Aplicação disponível em:

```text
http://localhost:4200
```

### Build de produção

```bash
npm run build
```

---

## 📡 Rotas Principais

| Rota                 | Descrição             |
| -------------------- | --------------------- |
| /auth/login          | Login                 |
| /auth/register       | Cadastro              |
| /inicio              | Página inicial        |
| /criancas            | Listagem de crianças  |
| /criancas/nova       | Nova criança          |
| /criancas/:id        | Detalhes da criança   |
| /criancas/:id/editar | Editar criança        |
| /vacinas             | Catálogo de vacinas   |
| /campanhas           | Campanhas             |
| /campanhas/:id       | Detalhes da campanha  |
| /perfil              | Perfil do responsável |

---

## 💬 Considerações Finais

Este projeto representa a aplicação prática de conceitos modernos de desenvolvimento front-end, integração com serviços em nuvem e construção de interfaces responsivas voltadas para experiência do usuário.

Além das funcionalidades propostas no desafio, foram implementados recursos de autenticação, persistência real de dados, estados de carregamento e uma estrutura escalável para futuras evoluções da plataforma.

---

## 👨‍💻 Autor

**Wemerson Matheus**

Desenvolvedor Full Stack

GitHub: https://github.com/wemersonmatheuss

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e avaliação técnica.
