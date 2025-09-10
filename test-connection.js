// Script para testar conexão com MongoDB Atlas
const mongoose = require('mongoose');
const config = require('./config');

async function testConnection() {
  console.log('🔄 Testando conexão com MongoDB Atlas...');
  console.log(`📍 URI: ${config.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
  
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Conexão bem-sucedida!');
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Estado: ${conn.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
    
    // Testar operação básica
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Coleções existentes: ${collections.length}`);
    
    await mongoose.disconnect();
    console.log('🔌 Conexão encerrada com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('1. Verifique se a string de conexão está correta');
    console.log('2. Confirme se o IP está liberado no MongoDB Atlas');
    console.log('3. Verifique se as credenciais estão corretas');
    console.log('4. Teste sua conexão com a internet');
    process.exit(1);
  }
}

testConnection();
