// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const financialRoutes = require('./routes/financialRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const messageRoutes = require('./routes/messageRoutes');
const documentRoutes = require('./routes/documentRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- 1. IMPORTAR

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API da AlphaDevs (PostgreSQL) está rodando...');
});

// Monta as rotas
app.use('/api/auth', authRoutes); // Login
app.use('/api/users', userRoutes); // Gestão de Utilizadores (protegido)
app.use('/api/projects', projectRoutes); // Projetos
app.use('/api/financial', financialRoutes); // Financeiro
app.use('/api/dashboard', dashboardRoutes); // Dashboards
app.use('/api/messages', messageRoutes); // Mensagens
app.use('/api/documents', documentRoutes); // Documentos

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha crítica ao iniciar o servidor:', error);
    process.exit(1); 
  }
};

startServer();