// Arquivo de exemplo para configuração
// Copie este arquivo para config.js e atualize com suas credenciais

module.exports = {
  // MongoDB Atlas - Substitua pelas suas credenciais
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://SEU_USUARIO:SUA_SENHA@seu-cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  
  // Porta do servidor
  PORT: process.env.PORT || 3000
};

// Como obter sua string de conexão:
// 1. Acesse https://www.mongodb.com/atlas
// 2. Faça login na sua conta
// 3. Selecione seu cluster
// 4. Clique em "Connect"
// 5. Escolha "Connect your application"
// 6. Copie a string de conexão
// 7. Substitua <username> e <password> pelas suas credenciais
// 8. Substitua <dbname> por 'moneycontrol' (opcional)
