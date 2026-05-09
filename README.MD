# 🚤 Rota do Boto - Frontend

[![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)](https://react.dev/learn)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/docs/installation)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge\&logo=firebase\&logoColor=black)](https://firebase.google.com/docs)

Este é o frontend do projeto Rota do Boto, desenvolvido com React.js e integrado ao Firebase (Firestore).

---

### 📌 Visão Geral

O **Rota do Boto** é uma aplicação que simula a compra de passagens de viagens fluviais, permitindo ao usuário:

* Criar conta e autenticar-se
* Buscar viagens disponíveis
* Selecionar assentos
* Adicionar ao carrinho
* Finalizar compra
* Visualizar histórico de pedidos

O projeto foi desenvolvido com foco em **boas práticas de arquitetura**, separando frontend, backend e banco de dados.

---

### 🧠 Arquitetura do Sistema

```
Frontend (React)
        ↓
API Backend (FastAPI - Python)
        ↓
Firebase (Firestore + Auth)
```

---

### ⚙️ Tecnologias Utilizadas

 **`🖥️ Frontend`**

* React.js
* React Router DOM
* Tailwind CSS
* Context API

 **`🔐 Backend`**

* Python
* FastAPI
* Firebase Admin SDK

**`☁️ Backend-as-a-Service`**

* Firebase Authentication
* Cloud Firestore

---

Link para o repositório Backend do Rota do Boto: https://github.com/Mikael-rms/rota-do-boto-backend.git

---

### 🔄 Fluxo da Aplicação

```
Login/Cadastro
      ↓
Busca de viagens
      ↓
Seleção de assentos
      ↓
Carrinho
      ↓
Finalização da compra (API Python)
      ↓
Atualização no Firestore
      ↓
Histórico de pedidos
```

---

### 🧾 Estrutura do Banco de Dados (Firestore)

 **`📁 users`**

```json
{
  "nome": "Mikael Ramos",
  "email": "mikael@email.com"
}
```

**`📁 trips`**

```json
{
  "origem": "Manaus",
  "destino": "Maués",
  "price": 120,
  "occupiedSeats": [1, 2, 3, 10]
}
```

**`📁 orders`**

```json
{
  "userId": "uid_do_usuario",
  "tripId": "lancha123",
  "seats": [4, 5],
  "total": 240,
  "status": "confirmado",
  "origem": "Manaus",
  "destino": "Maués",
  "createdAt": "timestamp"
}
```

---

### 🔥 Funcionalidades

* Autenticação de usuários (Firebase Auth)
* Proteção de rotas privadas
* Cadastro com persistência no Firestore
* Navbar dinâmica (baseada em login)
* Seleção múltipla de assentos
* Carrinho de compras
* Histórico de pedidos
* Integração com backend Python
* Validação de assentos ocupados
* Atualização de dados no banco

---

### 🛡️ Regra de Negócio

A compra não é feita diretamente pelo frontend:

```
Frontend ❌ → Firestore
Frontend ✅ → Backend → Firestore
```

Isso garante:

* Segurança
* Consistência dos dados
* Prevenção de conflitos de assentos

---

### 🚀 Backend (API)

**`Endpoint principal:`**

```
POST /buy
```

### Responsabilidades:

* Validar se assentos já estão ocupados
* Atualizar `occupiedSeats`
* Criar pedido em `orders`
* Retornar sucesso ou erro

---

### 🧪 Como rodar o projeto

**`🔹 Frontend`**

```bash
git clone https://github.com/Mikael-rms/rota-do-boto-frontend.git
cd rota-do-boto-frontend/frontend
```

```bash
npm i firebase
npm run dev
```

---

### 📈 Melhorias Futuras

* Atualização em tempo real dos assentos
* Autenticação no backend (JWT)
* Integração com pagamento (Stripe)
* Dashboard administrativo
* Versão mobile

---

### 📌 Observações

Projeto desenvolvido com foco em:

* Arquitetura full stack
* Integração entre sistemas
* Uso de serviços cloud (Firebase)
* Boas práticas de desenvolvimento
* Este readme será atualizado conforme o desenvolvimento do projeto

---

### 👨‍💻 Autor

Desenvolvido por **Mikael Ramos**
