# 💉 Vacina Kids — Plataforma de Acompanhamento Vacinal Infantil

Este projeto foi desenvolvido como parte de um desafio técnico com o objetivo de criar uma plataforma para acompanhamento da jornada de vacinação infantil, permitindo que pais e responsáveis visualizem informações sobre vacinas, campanhas e histórico vacinal de seus filhos.

Autor: Wemerson Matheus

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

* Desenvolvimento de aplicação SPA com Angular e Ionic
* Integração com Firebase Authentication e Cloud Firestore
* Arquitetura organizada em Core, Shared, Features e Layout
* Componentes Standalone e Lazy Loading
* Controle de acesso através de Route Guards
* Componentização e reutilização de interfaces
* Estados de carregamento, erro e telas vazias
* Responsividade para desktop, tablet e dispositivos móveis
* Seed automático de dados para demonstração do sistema

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

### 👶 Gerenciamento de Crianças

* Cadastro de crianças
* Edição de dados
* Exclusão de registros
* Busca por nome

### 💉 Controle Vacinal

* Visualização de vacinas aplicadas
* Identificação de vacinas pendentes
* Identificação de vacinas atrasadas
* Histórico vacinal individual

### 📊 Dashboard

* Resumo da família
* Quantidade de crianças cadastradas
* Vacinas pendentes
* Campanhas ativas
* Alertas de vacinação atrasada

### 📢 Campanhas

* Listagem de campanhas
* Detalhes completos
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
└── firebase.json
```

Padrões utilizados:

* Componentes Standalone
* Lazy Loading
* Services centralizados
* Route Guards
* Separação por domínio de negócio
* Componentes reutilizáveis

---

## 📊 Cenários do Desafio Atendidos

| Cenário                        | Implementação                    |
| ------------------------------ | -------------------------------- |
| Vacinas concluídas e pendentes | Timeline e indicadores visuais   |
| Vacinas atrasadas              | Status OVERDUE e alertas         |
| Campanhas ativas               | Banner de destaque e listagem    |
| Múltiplos filhos               | Histórico individual por criança |

---

## 🧪 Dados de Demonstração

O sistema popula automaticamente dados de exemplo para facilitar a avaliação.

### Crianças cadastradas

* Lucas Silva
* Sofia Silva

### Situações simuladas

* Vacina concluída
* Vacina pendente
* Vacina atrasada
* Campanha ativa em destaque

Esses dados permitem visualizar todas as funcionalidades sem necessidade de cadastro manual.

---

## ⚠️ Limitação do Projeto

O sistema não possui painel administrativo.

Nesta versão:

* O responsável apenas consulta informações
* Não é possível registrar aplicações de vacinas manualmente
* Os registros vacinais são simulados através do Seed Service

Essa decisão foi tomada para manter o foco do desafio na experiência do usuário e acompanhamento vacinal.

---

## 🖥️ Como rodar o projeto localmente

### Pré-requisitos

* Node.js 18+
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

Criar:

```bash
src/environments/environment.ts
```

Preencher com as credenciais do projeto Firebase.

### Executar

```bash
npm start
```

Aplicação disponível em:

```text
http://localhost:4200
```

### Build de Produção

```bash
npm run build
```

---

## 📡 Rotas Principais

| Rota           | Descrição            |
| -------------- | -------------------- |
| /auth/login    | Login                |
| /auth/register | Cadastro             |
| /inicio        | Dashboard            |
| /criancas      | Listagem de crianças |
| /criancas/:id  | Detalhes da criança  |
| /vacinas       | Catálogo de vacinas  |
| /campanhas     | Campanhas            |
| /perfil        | Perfil do usuário    |

---

## 💬 Considerações Finais

Este projeto representa a aplicação prática de conceitos modernos de desenvolvimento front-end, integração com serviços em nuvem e construção de interfaces responsivas voltadas para experiência do usuário.

Além das funcionalidades propostas no desafio, foram implementados recursos de autenticação, persistência real de dados, estados de carregamento e estrutura escalável para futuras evoluções da plataforma.

---

## 👨‍💻 Autor

Wemerson Matheus

Desenvolvedor Full Stack

GitHub:
https://github.com/wemersonmatheuss

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e avaliação técnica.
