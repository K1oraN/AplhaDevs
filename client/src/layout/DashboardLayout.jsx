// client/src/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ícones (Definições completas)
const DashboardIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProjectsIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const FinancialIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2-1.343-2-3-2m0 8c-1.11 0-2.08-.402-2.599-1M12 16v1m-6-3H4.01M6 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17.6 M6 13H4.01" /></svg>;
const MessagesIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const DocumentsIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const UsersIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 016-6v6h-6z" /></svg>;
const LogoutIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const MenuIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Define links da sidebar baseado no role
  const getNavLinks = (role) => {
    const clientLinks = [
      { to: '/portal/cliente/dashboard', icon: <DashboardIcon />, label: t('sidebar.dashboard') },
      { to: '/portal/cliente/projetos', icon: <ProjectsIcon />, label: t('sidebar.myProjects') },
      { to: '/portal/cliente/financeiro', icon: <FinancialIcon />, label: t('sidebar.financial') },
      { to: '/portal/cliente/mensagens', icon: <MessagesIcon />, label: t('sidebar.messages') },
      { to: '/portal/cliente/documentos', icon: <DocumentsIcon />, label: t('sidebar.documents') },
    ];

    const adminLinks = [
      { to: '/portal/gestor/dashboard', icon: <DashboardIcon />, label: t('sidebar.dashboardGeneral') },
      { to: '/portal/gestor/projetos', icon: <ProjectsIcon />, label: t('sidebar.allProjects') },
      // { to: '/portal/gestor/financeiro', icon: <FinancialIcon />, label: t('sidebar.financialGeneral') }, // Link futuro
      { to: '/portal/gestor/users', icon: <UsersIcon />, label: t('sidebar.manageUsers') },
      // Adicionar outros links de gestor aqui...
    ];

     const funcionarioLinks = [ // Exemplo para funcionário (subconjunto do gestor)
        { to: '/portal/gestor/dashboard', icon: <DashboardIcon />, label: t('sidebar.dashboard') },
        { to: '/portal/gestor/projetos', icon: <ProjectsIcon />, label: t('sidebar.allProjects') },
        // Adicionar outros links permitidos...
    ];

    if (role === 'gestor') {
      return adminLinks;
    } else if (role === 'funcionario') {
      return funcionarioLinks;
    } else { // Role === 'cliente' (ou fallback)
      return clientLinks;
    }
  };

  const dashboardHomeLink = userInfo?.role === 'gestor'
                            ? '/portal/gestor/dashboard'
                            : '/portal/cliente/dashboard';
  const navLinks = userInfo ? getNavLinks(userInfo.role) : [];


  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col`}>
        {/* Header da Sidebar */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-700">
           <Link to={dashboardHomeLink} className="flex items-center space-x-2">
             <img className="h-8 w-auto" src="/ICONE.png" alt="ALPHADEV Logo"/>
             <span className="text-xl font-bold text-white">ALPHADEV</span>
           </Link>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <CloseIcon />
           </button>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (location.pathname === '/portal/dashboard' && (link.to === '/portal/cliente/dashboard' || link.to === '/portal/gestor/dashboard')); // Melhora a lógica do active
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md group transition-colors duration-150 ${
                  isActive
                  ? 'bg-red-600 text-white shadow-inner shadow-black/20' // Estilo ativo mais forte
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon && React.cloneElement(link.icon, {
                  className: `mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`
                })}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="px-2 py-4 border-t border-gray-700">
          {userInfo && (
            <div className="px-4 py-2 mb-2 text-xs text-gray-400 truncate">
              {t('sidebar.loggedInAs', { email: userInfo.email, role: userInfo.role })}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-md text-gray-300 hover:bg-red-800 hover:text-white group"
          >
            <LogoutIcon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-red-300"/>
            {t('sidebar.logout')}
          </button>
        </div>
      </aside>

       {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header do Conteúdo (Mobile) */}
        <header className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 bg-gray-800 border-b border-gray-700 md:hidden">
           <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white" aria-label="Abrir menu lateral">
             <MenuIcon />
           </button>
           <div></div> {/* Placeholder */}
        </header>

        {/* Área de Scroll do Conteúdo */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;