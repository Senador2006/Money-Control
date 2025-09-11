# 🗄️ Configuração do MongoDB Local

## 📋 Pré-requisitos

- MongoDB Community Server instalado
- Node.js e npm instalados

## 🚀 Instalação do MongoDB

### Windows

1. Baixe o MongoDB Community Server do [site oficial](https://www.mongodb.com/try/download/community)
2. Execute o instalador
3. Siga as instruções de instalação
4. Adicione o MongoDB ao PATH do sistema

### macOS

```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian)

```bash
# Importar chave pública
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Adicionar repositório
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Atualizar pacotes
sudo apt-get update

# Instalar MongoDB
sudo apt-get install -y mongodb-org

# Iniciar serviço
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 🔧 Configuração

### 1. Iniciar MongoDB

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# ou
mongod --config /usr/local/etc/mongod.conf
```

### 2. Verificar se está rodando

```bash
# Conectar ao MongoDB
mongosh

# Verificar status
db.runCommand({serverStatus: 1})
```

### 3. Configurar Banco de Dados

```bash
# Conectar ao MongoDB
mongosh

# Criar banco de dados
use moneycontrol

# Criar usuário
db.createUser({
  user: "moneycontrol_user",
  pwd: "moneycontrol_password",
  roles: [
    {
      role: "readWrite",
      db: "moneycontrol"
    }
  ]
})

# Sair
exit
```

## 🔗 Configurar Aplicação

### 1. Atualizar arquivo .env

```env
# MongoDB Local
MONGODB_URI=mongodb://moneycontrol_user:moneycontrol_password@localhost:27017/moneycontrol

# Ou sem autenticação (desenvolvimento)
MONGODB_URI=mongodb://localhost:27017/moneycontrol
```

### 2. Executar aplicação

```bash
# Instalar dependências
npm install

# Executar aplicação
npm start
```

## 🧪 Testar Conexão

```bash
# Executar teste de conexão
npm run test-connection
```

## 📊 Inserir Dados Iniciais

### 1. Usando MongoDB Compass

1. Baixe o [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Conecte ao `mongodb://localhost:27017`
3. Selecione o banco `moneycontrol`
4. Importe os dados do arquivo `mongo-init/init.js`

### 2. Usando mongosh

```bash
# Conectar ao MongoDB
mongosh

# Usar banco moneycontrol
use moneycontrol

# Executar script de inicialização
load("mongo-init/init.js")
```

### 3. Usando a aplicação

1. Acesse http://localhost:3000
2. As categorias e tipos de investimento serão criados automaticamente
3. Comece a adicionar suas transações e investimentos

## 🔧 Comandos Úteis

```bash
# Ver bancos de dados
show dbs

# Usar banco específico
use moneycontrol

# Ver coleções
show collections

# Ver documentos de uma coleção
db.categories.find()

# Contar documentos
db.categories.countDocuments()

# Deletar todos os documentos
db.categories.deleteMany({})

# Deletar coleção
db.categories.drop()

# Deletar banco
db.dropDatabase()
```

## 🚨 Solução de Problemas

### MongoDB não inicia

```bash
# Verificar logs
tail -f /var/log/mongodb/mongod.log

# Verificar se a porta está em uso
netstat -tulpn | grep :27017

# Matar processo na porta 27017
sudo kill -9 $(lsof -t -i:27017)
```

### Erro de permissão

```bash
# Dar permissão para o diretório de dados
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb
```

### Erro de conexão na aplicação

1. Verificar se o MongoDB está rodando
2. Verificar a string de conexão no .env
3. Verificar se o usuário e senha estão corretos
4. Verificar se o banco de dados existe

## 📈 Monitoramento

### 1. Usando MongoDB Compass

- Interface gráfica para visualizar dados
- Executar queries
- Ver performance

### 2. Usando mongosh

```bash
# Ver status do servidor
db.serverStatus()

# Ver estatísticas do banco
db.stats()

# Ver operações ativas
db.currentOp()
```

## 🔄 Backup e Restore

### Backup

```bash
# Fazer backup completo
mongodump --db moneycontrol --out backup/

# Fazer backup de uma coleção
mongoexport --db moneycontrol --collection categories --out categories.json
```

### Restore

```bash
# Restaurar backup completo
mongorestore --db moneycontrol backup/moneycontrol/

# Restaurar uma coleção
mongoimport --db moneycontrol --collection categories --file categories.json
```

## 🎯 Próximos Passos

1. Configurar autenticação
2. Configurar backup automático
3. Configurar replicação (se necessário)
4. Configurar sharding (se necessário)
5. Monitorar performance
