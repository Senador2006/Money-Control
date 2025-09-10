# 🚀 Configuração do MongoDB Atlas

## ❌ Problema Atual
```
Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## ✅ Solução Passo a Passo

### 1. **Acesse o MongoDB Atlas**
- Vá para [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
- Faça login na sua conta

### 2. **Libere seu IP**
1. No painel do Atlas, clique em **"Network Access"** no menu lateral
2. Clique em **"Add IP Address"**
3. Escolha uma das opções:
   - **"Add Current IP Address"** (recomendado)
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - menos seguro mas funciona

### 3. **Verifique as Credenciais**
1. Vá para **"Database Access"** no menu lateral
2. Confirme se existe um usuário com as credenciais:
   - Username: `admin`
   - Password: `admin123`
3. Se não existir, crie um novo usuário

### 4. **Teste a Conexão**
```bash
npm run test-connection
```

### 5. **Se ainda não funcionar, use IP público**
1. Descubra seu IP público: [https://whatismyipaddress.com/](https://whatismyipaddress.com/)
2. No MongoDB Atlas, vá em "Network Access"
3. Clique em "Add IP Address"
4. Cole seu IP público
5. Teste novamente

## 🔧 Configuração Alternativa (Mais Segura)

### Opção 1: Usar Variável de Ambiente
```bash
# Windows (PowerShell)
$env:MONGODB_URI="mongodb+srv://admin:admin123@cluster0.ej5o60i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Linux/Mac
export MONGODB_URI="mongodb+srv://admin:admin123@cluster0.ej5o60i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

### Opção 2: Atualizar config.js
```javascript
module.exports = {
  MONGODB_URI: 'mongodb+srv://admin:admin123@cluster0.ej5o60i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  PORT: process.env.PORT || 3000
};
```

## 🚨 Troubleshooting

### Erro: "Authentication failed"
- Verifique username e password
- Confirme se o usuário tem permissões de leitura/escrita

### Erro: "IP not whitelisted"
- Adicione seu IP no Network Access
- Use 0.0.0.0/0 para permitir qualquer IP (não recomendado para produção)

### Erro: "Connection timeout"
- Verifique sua conexão com a internet
- Teste se consegue acessar outros sites

## ✅ Teste Final
Após configurar tudo, execute:
```bash
npm run test-connection
```

Deve aparecer:
```
✅ Conexão bem-sucedida!
🏠 Host: cluster0-shard-00-00.ej5o60i.mongodb.net
📊 Database: moneycontrol
🔗 Estado: Conectado
```

## 🎯 Próximos Passos
1. Configure o MongoDB Atlas
2. Teste a conexão
3. Execute `npm start`
4. Acesse `http://localhost:3000`
5. Seus dados serão salvos na nuvem! ☁️
