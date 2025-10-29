// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from './layout/DashboardLayout';

// Componentes de Rota
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Páginas Reais
import ClientDashboard from './pages/ClientDashboard';
import ClientProjects from './pages/ClientProjects';
import ClientProjectDetails from './pages/ClientProjectDetails'; // <-- IMPORTADO
import ClientFinancial from './pages/ClientFinancial';
import ClientMessages from './pages/ClientMessages';
import ClientDocuments from './pages/ClientDocuments';

// Placeholders Gestor
const AdminDashboardPlaceholder = () => <div className="p-4 text-white"><h1>Dashboard Gestor</h1><p>Conteúdo...</p></div>;
const AdminUsersPlaceholder = () => <div className="p-4 text-white"><h1>Gerenciar Usuários</h1><p>Lista de usuários...</p></div>;


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
            
            {/* Agrupamento de Projetos */}
            <Route path="/portal/cliente/projetos" element={<ClientProjects />} />
            <Route path="/portal/cliente/projetos/:id" element={<ClientProjectDetails />} /> {/* <-- ROTA ADICIONADA */}
            
            <Route path="/portal/cliente/financeiro" element={<ClientFinancial />} />
            <Route path="/portal/cliente/mensagens" element={<ClientMessages />} />
            <Route path="/portal/cliente/documentos" element={<ClientDocuments />} />
            {/* TODO: Adicionar rotas /reunioes, /suporte, /configuracoes */}

            {/* --- ROTAS DO GESTOR/FUNCIONÁRIO --- */}
            <Route path="/portal/gestor" element={<AdminDashboardPlaceholder />} />
            <Route path="/portal/gestor/dashboard" element={<AdminDashboardPlaceholder />} />
            
            {/* Gestor também pode ver a lista e detalhes */}
            <Route path="/portal/gestor/projetos" element={<ClientProjects />} />
            <Route path="/portal/gestor/projetos/:id" element={<ClientProjectDetails />} />
            
            <Route path="/portal/gestor/users" element={<AdminUsersPlaceholder />} />

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