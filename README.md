# Money Control 💰

Sistema de controle financeiro pessoal para gerenciar receitas, despesas e orçamentos de forma inteligente.

## 🚀 Funcionalidades

- **Dashboard Financeiro**: Visão geral das suas finanças com receitas, despesas e saldo
- **Gestão de Transações**: Adicione, edite e remova receitas e despesas
- **Orçamentos por Categoria**: Defina limites de gastos para diferentes categorias
- **Categorização Inteligente**: Organize seus gastos em categorias predefinidas
- **Relatórios Visuais**: Acompanhe seus gastos com gráficos e indicadores
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 📋 Categorias Pré-definidas

- 🍽️ Alimentação
- 🚗 Transporte  
- 💼 Investimentos
- 🎮 Lazer
- 🏥 Saúde
- 📚 Educação
- 📦 Outros

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Estilização**: CSS Grid, Flexbox, Gradientes
- **Ícones**: Font Awesome
- **Armazenamento**: Dados em memória (JSON)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
```bash
cd MoneyControl
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o MongoDB Atlas** (Recomendado)
   - Siga o guia detalhado em `MONGODB_ATLAS_SETUP.md`
   - Ou use MongoDB local (veja seção abaixo)

4. **Execute o servidor**
```bash
npm start
```

5. **Acesse a aplicação**
Abra seu navegador e acesse: `http://localhost:3000`

### Modo Desenvolvimento
Para executar com auto-reload:
```bash
npm run dev
```

### Configuração do MongoDB Atlas
O sistema usa MongoDB Atlas (nuvem) para persistir os dados. As coleções são criadas automaticamente:
- `transactions` - Transações financeiras
- `categories` - Categorias de gastos
- `investments` - Investimentos
- `investmenttypes` - Tipos de investimento
- `userprofiles` - Perfil do usuário

#### Configuração do MongoDB Atlas:
1. **Crie uma conta gratuita** em [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Crie um cluster** (M0 Sandbox é gratuito)
3. **Configure acesso à rede**:
   - Vá em "Network Access"
   - Adicione seu IP ou use `0.0.0.0/0` para permitir qualquer IP
4. **Crie um usuário de banco**:
   - Vá em "Database Access"
   - Crie um usuário com senha
5. **Obtenha a string de conexão**:
   - Vá em "Connect" → "Connect your application"
   - Copie a string de conexão
6. **Atualize o arquivo `config.js`** com sua string de conexão

#### String de Conexão Atual:
```javascript
MONGODB_URI: 'mongodb+srv://admin:admin123@cluster0.ej5o60i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
```

**⚠️ Importante**: Altere as credenciais (`admin:admin123`) para suas credenciais reais!

### Alternativa: MongoDB Local
Se preferir usar MongoDB local:

1. **Instale o MongoDB** em sua máquina
2. **Inicie o serviço** MongoDB
3. **Atualize o `config.js`**:
```javascript
MONGODB_URI: 'mongodb://localhost:27017/moneycontrol'
```

### Teste de Conexão
```bash
npm run test-connection
```

## 📱 Como Usar

### 1. Adicionando Transações
- Clique em "Adicionar Receita" para registrar ganhos
- Clique em "Adicionar Despesa" para registrar gastos
- Preencha a descrição, valor, categoria e data
- Salve a transação

### 2. Gerenciando Orçamentos
- Clique em "Gerenciar Orçamentos"
- Defina valores limite para cada categoria
- Acompanhe o progresso visual dos gastos

### 3. Visualizando Relatórios
- Veja o resumo financeiro no topo da página
- Acompanhe os orçamentos por categoria
- Filtre transações por tipo e categoria

## 🎨 Interface

A interface foi desenvolvida com foco na usabilidade e experiência do usuário:

- **Design Moderno**: Gradientes e sombras para uma aparência profissional
- **Responsiva**: Adapta-se a diferentes tamanhos de tela
- **Intuitiva**: Navegação simples e clara
- **Visual**: Indicadores de progresso e cores para facilitar a compreensão

## 🔧 Estrutura do Projeto

```
MoneyControl/
├── server.js              # Servidor Express
├── package.json           # Dependências e scripts
├── public/                # Arquivos frontend
│   ├── index.html         # Página principal
│   ├── style.css          # Estilos CSS
│   └── script.js          # JavaScript frontend
└── README.md              # Este arquivo
```

## 🚀 Próximas Funcionalidades

- [ ] Persistência em banco de dados
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Metas de investimento
- [ ] Gráficos mais avançados
- [ ] Backup e sincronização
- [ ] Múltiplas contas/carteiras

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das mudanças
4. Abrir um Pull Request

## 📞 Suporte

Se tiver dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para ajudar no controle financeiro pessoal**
