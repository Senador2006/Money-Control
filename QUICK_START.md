# 🚀 Quick Start - Money Control

## ⚡ Início Rápido (3 passos)

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Configurar Banco de Dados**
```bash
# Para MongoDB Atlas (Recomendado)
npm run switch-atlas

# Para MongoDB Local
npm run switch-local
```

### 3. **Testar e Executar**
```bash
# Testar conexão
npm run test-connection

# Iniciar aplicação
npm start
```

## 🔧 Configuração do MongoDB Atlas

### Se escolheu Atlas, siga estes passos:

1. **Acesse**: [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Crie uma conta gratuita**
3. **Crie um cluster** (M0 Sandbox)
4. **Configure Network Access**:
   - Vá em "Network Access"
   - Clique "Add IP Address"
   - Escolha "Add Current IP Address"
5. **Crie usuário do banco**:
   - Vá em "Database Access"
   - Clique "Add New Database User"
   - Username: `admin`
   - Password: `admin123`
6. **Teste a conexão**:
   ```bash
   npm run test-connection
   ```

## 🏠 Configuração do MongoDB Local

### Se escolheu Local:

1. **Instale MongoDB** em sua máquina
2. **Inicie o serviço** MongoDB
3. **Teste a conexão**:
   ```bash
   npm run test-connection
   ```

## ✅ Verificação

### Conexão bem-sucedida deve mostrar:
```
✅ Conexão bem-sucedida!
🏠 Host: cluster0-shard-00-00.ej5o60i.mongodb.net
📊 Database: moneycontrol
🔗 Estado: Conectado
```

### Se der erro:
- **IP não liberado**: Adicione seu IP no MongoDB Atlas
- **Credenciais erradas**: Verifique username/password
- **Sem internet**: Teste sua conexão

## 🎯 Próximo Passo

Após configurar o banco:
```bash
npm start
```

Acesse: `http://localhost:3000`

## 📚 Documentação Completa

- **README.md** - Documentação principal
- **MONGODB_ATLAS_SETUP.md** - Guia detalhado do Atlas
- **src/README.md** - Estrutura do código

## 🆘 Comandos Úteis

```bash
npm start              # Iniciar aplicação
npm run dev           # Modo desenvolvimento
npm run test-connection # Testar conexão
npm run switch-atlas  # Usar MongoDB Atlas
npm run switch-local  # Usar MongoDB Local
```
