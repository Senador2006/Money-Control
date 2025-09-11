// Script para alternar entre MongoDB Local e Atlas
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.js');

const configs = {
  atlas: {
    MONGODB_URI: process.env.MONGODB_URI,
    description: 'MongoDB Atlas (Nuvem)'
  },
};

function switchDatabase(type) {
  if (!configs[type]) {
    console.log('❌ Tipo inválido. Use: atlas');
    return;
  }

  const config = configs[type];
  
  const configContent = `module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || '${config.MONGODB_URI}',
  PORT: process.env.PORT || 3000
};
`;

  try {
    fs.writeFileSync(configPath, configContent);
    console.log(`✅ Configuração alterada para: ${config.description}`);
    console.log(`📍 URI: ${config.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    console.log('\n🔄 Para testar a conexão:');
    console.log('npm run test-connection');
  } catch (error) {
    console.error('❌ Erro ao alterar configuração:', error.message);
  }
}

// Verificar argumentos da linha de comando
const type = process.argv[2];

if (!type) {
  console.log('🔄 Script para alternar entre MongoDB Local e Atlas');
  console.log('\nUso:');
  console.log('node switch-db.js atlas   # Usar MongoDB Atlas');
  console.log('\nConfiguração atual:');
  
  try {
    const currentConfig = require('./config');
    const isAtlas = currentConfig.MONGODB_URI.includes('mongodb+srv');
    console.log(`📍 ${isAtlas ? 'MongoDB Atlas' : 'MongoDB Atlas'}`);
  } catch (error) {
    console.log('❌ Erro ao ler configuração atual');
  }
} else {
  switchDatabase(type);
}
