const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Importar rotas e MongoDB
const routes = require('./routes');
const { connectDB } = require('./models/mongodb');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Configurar rotas da API
app.use('/api', routes);

// Servir a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
