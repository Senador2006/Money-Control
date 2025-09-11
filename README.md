# 💰 Money Control

Sistema de controle financeiro pessoal desenvolvido em Node.js com MongoDB.

## 🚀 Funcionalidades

- **Gestão de Transações**: Controle de receitas e despesas
- **Categorização**: Organize suas transações por categorias
- **Orçamentos**: Defina limites de gastos por categoria
- **Investimentos**: Acompanhe seus investimentos e performance
- **Relatórios**: Visualize resumos e análises financeiras
- **Recomendações**: Receba sugestões de investimento baseadas no seu perfil

## 🛠️ Tecnologias

- **Backend**: Node.js, Express.js
- **Banco de Dados**: MongoDB
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Containerização**: Docker, Docker Compose

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou Atlas)
- Docker e Docker Compose (opcional)

## 🚀 Instalação e Execução

### Método 1: Execução Local

1. **Clone o repositório**
```bash
   git clone https://github.com/seu-usuario/money-control.git
   cd money-control
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Execute a aplicação**
```bash
   # Desenvolvimento
   npm run dev
   
   # Produção
npm start
```

5. **Acesse a aplicação**
   - URL: http://localhost:3000

### Método 2: Docker

1. **Clone o repositório**
```bash
   git clone https://github.com/seu-usuario/money-control.git
   cd money-control
   ```

2. **Execute com Docker Compose**
   ```bash
   # Iniciar todos os serviços
   npm run docker:up
   
   # Ver logs
   npm run docker:logs
   
   # Parar serviços
   npm run docker:down
   ```

3. **Acesse a aplicação**
   - Aplicação: http://localhost:3000
   - MongoDB Express: http://localhost:8081

## 🐳 Comandos Docker

```bash
# Construir imagem
npm run docker:build

# Executar container
npm run docker:run

# Iniciar todos os serviços
npm run docker:up

# Parar serviços
npm run docker:down

# Ver logs
npm run docker:logs

# Reiniciar serviços
npm run docker:restart

# Limpar volumes e containers
npm run docker:clean
```

## 📁 Estrutura do Projeto

```
money-control/
├── public/                 # Arquivos estáticos (frontend)
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/                   # Código fonte do backend
│   ├── controllers/       # Controladores
│   ├── models/           # Modelos de dados
│   ├── routes/           # Rotas da API
│   └── utils/            # Utilitários
├── mongo-init/           # Scripts de inicialização do MongoDB
├── docker-compose.yml    # Configuração do Docker Compose
├── Dockerfile           # Configuração do Docker
├── .dockerignore        # Arquivos ignorados pelo Docker
├── .gitignore          # Arquivos ignorados pelo Git
└── package.json        # Dependências e scripts
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `env.example`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/moneycontrol

# Segurança
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

### MongoDB

#### Opção 1: MongoDB Local
```bash
# Instalar MongoDB localmente
# Configurar MONGODB_URI=mongodb://localhost:27017/moneycontrol
```

#### Opção 2: MongoDB Atlas
```bash
# Criar cluster no MongoDB Atlas
# Configurar MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
```

#### Opção 3: Docker
```bash
# Usar o MongoDB do Docker Compose
# MONGODB_URI=mongodb://mongo:27017/moneycontrol
```

## 📊 API Endpoints

### Transações
- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Deletar transação

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

### Investimentos
- `GET /api/investments` - Listar investimentos
- `POST /api/investments` - Criar investimento
- `PUT /api/investments/:id` - Atualizar investimento
- `DELETE /api/investments/:id` - Deletar investimento
- `GET /api/investments/types` - Listar tipos de investimento
- `GET /api/investments/summary` - Resumo de investimentos
- `GET /api/investments/recommendations` - Recomendações

### Resumos
- `GET /api/summary` - Resumo financeiro geral

### Perfil
- `GET /api/user-profile` - Obter perfil do usuário
- `PUT /api/user-profile` - Atualizar perfil do usuário

## 🧪 Testes

```bash
# Testar conexão com MongoDB
npm run test-connection

# Alternar para MongoDB Atlas
npm run switch-atlas

# Alternar para MongoDB local
npm run switch-local
```

## 🚀 Deploy

### Docker
1. Construa a imagem:
   ```bash
   docker build -t money-control .
   ```
2. Execute o container:
   ```bash
   docker run -p 3000:3000 money-control
   ```

### VPS/Cloud
1. Faça clone do repositório
2. Configure as variáveis de ambiente
3. Execute com Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu.email@exemplo.com

## 🙏 Agradecimentos

- MongoDB Atlas
- Node.js Community
- Express.js Team
- Docker Team