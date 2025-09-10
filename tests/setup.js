// Configuração global para testes
const mongoose = require('mongoose');

// Configurar timeout para testes
jest.setTimeout(10000);

// Configurar variáveis de ambiente para teste
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moneycontrol_test';

// Função para limpar banco de dados entre testes
global.clearDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
  }
};

// Função para conectar ao banco de dados de teste
global.connectDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

// Função para desconectar do banco de dados
global.disconnectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
};

// Cleanup após todos os testes
afterAll(async () => {
  await global.disconnectDatabase();
});
