// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from './layout/DashboardLayout';

// Componentes de Rota
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Páginas Reais - Cliente
import ClientDashboard from './pages/ClientDashboard';
import ClientProjects from './pages/ClientProjects';
import ClientProjectDetails from './pages/ClientProjectDetails';
import ClientFinancial from './pages/ClientFinancial';
import ClientMessages from './pages/ClientMessages';
import ClientDocuments from './pages/ClientDocuments';

// Páginas Reais - Gestor (NOVAS IMPORTAÇÕES)
import GestorDashboard from './pages/GestorDashboard'; 
import AdminUsersPage from './pages/AdminUsersPage';   
import GestorFinancial from './pages/GestorFinancial'; // <-- 1. IMPORTADO

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Protegidas com Layout do Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* --- ROTAS DO CLIENTE --- */}
            <Route path="/portal/cliente" element={<ClientDashboard />} />
            <Route path="/portal/cliente/dashboard" element={<ClientDashboard />} />
            <Route path="/portal/cliente/projetos" element={<ClientProjects />} />
            <Route path="/portal/cliente/projetos/:id" element={<ClientProjectDetails />} />
            <Route path="/portal/cliente/financeiro" element={<ClientFinancial />} />
            <Route path="/portal/cliente/mensagens" element={<ClientMessages />} />
            <Route path="/portal/cliente/documentos" element={<ClientDocuments />} />
            {/* TODO: Adicionar rotas /reunioes, /suporte, /configuracoes */}

            {/* --- ROTAS DO GESTOR/FUNCIONÁRIO (ATUALIZADAS) --- */}
            <Route path="/portal/gestor" element={<GestorDashboard />} />
            <Route path="/portal/gestor/dashboard" element={<GestorDashboard />} />
            
            {/* Gestor também pode ver a lista e detalhes */}
            <Route path="/portal/gestor/projetos" element={<ClientProjects />} />
            <Route path="/portal/gestor/projetos/:id" element={<ClientProjectDetails />} />
            
            <Route path="/portal/gestor/users" element={<AdminUsersPage />} />
            
            {/* 2. ROTA ADICIONADA */}
            <Route path="/portal/gestor/financeiro" element={<GestorFinancial />} />


            {/* --- ROTAS GENÉRICAS (Fallback) --- */}
             <Route path="/portal/dashboard" element={<ClientDashboard />} />
             <Route path="/portal/projects" element={<ClientProjects />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;