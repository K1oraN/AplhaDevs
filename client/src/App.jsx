// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from './layout/DashboardLayout';

// Componentes de Rota
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Páginas Reais e Placeholders
import ClientDashboard from './pages/ClientDashboard';
import ClientProjects from './pages/ClientProjects';
import ClientFinancial from './pages/ClientFinancial';
import ClientMessages from './pages/ClientMessages';   // <-- NOVO
import ClientDocuments from './pages/ClientDocuments'; // <-- NOVO

// Placeholders Gestor
const AdminDashboardPlaceholder = () => {/*...*/};
const AdminUsersPlaceholder = () => {/*...*/};


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
            {/* Redireciona a base para o dashboard */}
            <Route path="/portal/cliente" element={<ClientDashboard />} /> 
            <Route path="/portal/cliente/dashboard" element={<ClientDashboard />} />
            <Route path="/portal/cliente/projetos" element={<ClientProjects />} />
            <Route path="/portal/cliente/financeiro" element={<ClientFinancial />} />
            <Route path="/portal/cliente/mensagens" element={<ClientMessages />} />   {/* <-- NOVO */}
            <Route path="/portal/cliente/documentos" element={<ClientDocuments />} /> {/* <-- NOVO */}

            {/* --- ROTAS DO GESTOR/FUNCIONÁRIO --- */}
            <Route path="/portal/gestor" element={<AdminDashboardPlaceholder />} />
            <Route path="/portal/gestor/dashboard" element={<AdminDashboardPlaceholder />} />
            {/* Gestor pode ver a mesma página de projetos, mas talvez com mais info no futuro */}
            <Route path="/portal/gestor/projetos" element={<ClientProjects />} /> 
            <Route path="/portal/gestor/users" element={<AdminUsersPlaceholder />} />
            {/* Adicionar /financeiro (admin), /brainstorm, etc. */}

            {/* --- ROTAS GENÉRICAS (Fallback ou com lógica de role) --- */}
            {/* Se aceder /portal/dashboard, vai para o dashboard do cliente por padrão */}
             <Route path="/portal/dashboard" element={<ClientDashboard />} /> 
             {/* Se aceder /portal/projects, vai para a lista de projetos do cliente por padrão */}
             <Route path="/portal/projects" element={<ClientProjects />} /> 

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;