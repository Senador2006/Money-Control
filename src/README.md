# Estrutura do Projeto Money Control

Este diretório contém a organização modular do backend da aplicação Money Control.

## 📁 Estrutura de Pastas

```
src/
├── controllers/          # Controladores (lógica de negócio)
│   ├── transactionController.js
│   ├── investmentController.js
│   ├── categoryController.js
│   ├── summaryController.js
│   └── profileController.js
├── models/              # Modelos de dados
│   └── data.js
├── routes/              # Definição das rotas
│   ├── transactionRoutes.js
│   ├── investmentRoutes.js
│   ├── categoryRoutes.js
│   ├── summaryRoutes.js
│   ├── profileRoutes.js
│   └── index.js
├── utils/               # Utilitários e funções auxiliares
│   └── investmentRecommendations.js
└── app.js              # Configuração principal da aplicação
```

## 🎯 Padrão MVC (Model-View-Controller)

### Models (`src/models/`)
- **data.js**: Gerencia todos os dados em memória
- Fornece funções para CRUD de transações, investimentos, categorias e perfil
- Centraliza o acesso aos dados

### Controllers (`src/controllers/`)
- **transactionController.js**: Lógica para transações financeiras
- **investmentController.js**: Lógica para investimentos
- **categoryController.js**: Lógica para categorias e orçamentos
- **summaryController.js**: Lógica para resumos financeiros
- **profileController.js**: Lógica para perfil do usuário

### Routes (`src/routes/`)
- **transactionRoutes.js**: Rotas `/api/transactions`
- **investmentRoutes.js**: Rotas `/api/investments`
- **categoryRoutes.js**: Rotas `/api/categories`
- **summaryRoutes.js**: Rotas `/api/summary`
- **profileRoutes.js**: Rotas `/api/user-profile`
- **index.js**: Centralizador de todas as rotas

### Utils (`src/utils/`)
- **investmentRecommendations.js**: Sistema de recomendações de investimento

## 🔧 Como Funciona

1. **server.js**: Ponto de entrada, importa e inicia a aplicação
2. **app.js**: Configura Express, middlewares e rotas
3. **routes/index.js**: Centraliza todas as rotas da API
4. **Controllers**: Processam requisições e chamam funções do modelo
5. **Models**: Gerenciam os dados e operações CRUD
6. **Utils**: Funções auxiliares e lógica de negócio complexa

## 📋 Vantagens da Estrutura Modular

- ✅ **Separação de Responsabilidades**: Cada arquivo tem uma função específica
- ✅ **Manutenibilidade**: Fácil de encontrar e modificar código
- ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades
- ✅ **Testabilidade**: Cada módulo pode ser testado independentemente
- ✅ **Reutilização**: Código pode ser reutilizado em diferentes contextos
- ✅ **Organização**: Código limpo e bem estruturado

## 🚀 Adicionando Novas Funcionalidades

Para adicionar uma nova funcionalidade:

1. **Model**: Adicione funções de dados em `src/models/data.js`
2. **Controller**: Crie um novo controller em `src/controllers/`
3. **Routes**: Crie as rotas em `src/routes/`
4. **Registre**: Adicione as rotas em `src/routes/index.js`

## 🔄 Fluxo de Dados

```
Request → Routes → Controller → Model → Response
```

1. Cliente faz requisição HTTP
2. Rota captura e direciona para controller
3. Controller processa e chama funções do model
4. Model manipula os dados
5. Controller retorna resposta para o cliente
