// client/src/pages/ClientDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Funções de formatação (ajustadas)
const formatCurrency = (value, currency = 'BRL', locale = 'pt-BR') => {
    try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
    } catch (e) {
        const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'R$';
        const numValue = Number(value);
        if (isNaN(numValue)) return `${symbol} ---`;
        return `${symbol} ${numValue.toFixed(2)}`;
    }
};
const formatDate = (dateString, locale = 'pt-BR') => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString + 'T00:00:00');
      return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    } catch (e) {
      const parts = dateString.split('-');
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
      return dateString;
    }
};
const formatFullDate = (locale = 'pt-BR') => {
     const today = new Date();
     try {
       return new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(today);
     } catch (e) {
       console.error("Erro formatando data:", e);
       return today.toDateString();
     }
}

// Ícones (Definições Completas Corrigidas)
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25v-4.07m16.5 0a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25m16.5 0v-4.07a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25v4.07m16.5 0a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25" /></svg>;
const InvoiceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.017 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const ExclamationTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" /></svg>;
const LifebuoyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5m-9 4.5v-4.5m0-7.5a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v4.5m-9 0v-4.5m0-3.75a3 3 0 0 0-3-3H7.5a3 3 0 0 0-3 3v4.5m9 0v-4.5m0 3.75a3 3 0 0 0 3-3h1.5a3 3 0 0 0 3 3v4.5" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.76 6.76 0 0 1 0 1.745c.008.379.137.75.43.991l1.004.827a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.76 6.76 0 0 1 0-1.745c-.008-.379-.137-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const LogoutIconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>;


// Componente Card reutilizável
const DashboardCard = ({ title, value, description, icon, linkTo, colorClass = 'text-red-500', delay }) => (
    <motion.div {...fadeIn(delay)} className="h-full">
        <Link
          to={linkTo}
          className={`block bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md hover:border-red-500/50 hover:bg-gray-750 transition-all duration-200 group h-full flex flex-col min-h-[130px] sm:min-h-[140px]`}
        >
            <div className="flex justify-between items-start mb-1">
                <h2 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors line-clamp-1">{title}</h2>
                <div className={`p-1.5 rounded-lg bg-gray-700 ${colorClass}/20 flex-shrink-0`}>
                  {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass}` })}
                </div>
            </div>
             <div className="mt-auto">
                <p className={`text-2xl sm:text-3xl font-bold ${colorClass} overflow-hidden text-ellipsis whitespace-nowrap`}>{value}</p>
                {description && <p className="text-xs text-gray-400 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>}
            </div>
        </Link>
    </motion.div>
);


const ClientDashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [summaryData, setSummaryData] = useState({
    activeProjects: 0, pendingInvoices: 0, unreadMessages: 4, overdueInvoices: 1,
    lastPaymentAmount: 1200.00, lastPaymentDate: '2025-10-12', nextDeliveryTask: 'Atualização do site',
    nextDeliveryDate: '2025-10-30', recentDocuments: 1, openSupportTickets: 2, totalSpent: 5850.50,
    completedProjects: 5
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);

  // Busca userInfo, nome e configura data
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedInfo);
      setUserName(parsedInfo.name || t('clientDashboard.defaultName'));
    }
    setCurrentDate(formatFullDate(i18n.language));
  }, [t, i18n.language]);

  // Busca resumo da API
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true); setError('');
      try {
        // Usa o estado userInfo que já buscamos
        if (!userInfo || !userInfo.token) throw new Error(t('errors.notAuthenticated'));

        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        // TODO: Usar VITE_API_URL
        const { data } = await axios.get('http://localhost:3001/api/dashboard/clientsummary', config);
        setSummaryData(prevData => ({
             ...prevData,
             activeProjects: data.activeProjects ?? 0,
             pendingInvoices: data.pendingInvoices ?? 0,
             // unreadMessages: data.unreadMessages ?? 0, // Descomentar quando API existir
        }));
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.loadSummaryError'));
        if (err.response?.status === 401) {
             localStorage.removeItem('userInfo');
             navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    // Só busca o sumário se tivermos userInfo
    if (userInfo) {
       fetchSummary();
    } else {
        // Se não há userInfo (ex: chegou aqui por URL direta sem ProtectedRoute funcionar),
        // não faz sentido carregar, talvez redirecionar? Ou apenas não carrega.
        setLoading(false);
    }
  }, [t, navigate, userInfo]); // Depende de userInfo agora

  // Função de saudação dinâmica
  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return t('clientDashboard.greetingMorning');
      if (hour < 18) return t('clientDashboard.greetingAfternoon');
      return t('clientDashboard.greetingEvening');
  };

  // Hook para fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
   };

  // Configuração dos Cards
  const cardsConfig = [
    { key: 'activeProjects', icon: <BriefcaseIcon/>, linkTo: '/portal/cliente/projetos', colorClass: 'text-blue-400' },
    { key: 'completedProjects', icon: <CheckCircleIcon/>, linkTo: '/portal/cliente/projetos?filter=completed', colorClass: 'text-green-400' },
    { key: 'pendingInvoices', icon: <InvoiceIcon/>, linkTo: '/portal/cliente/financeiro', colorClass: 'text-yellow-400' },
    { key: 'overdueInvoices', icon: <ExclamationTriangleIcon/>, linkTo: '/portal/cliente/financeiro?filter=overdue', colorClass: 'text-orange-400' },
    { key: 'lastPayment', dateKey: 'lastPaymentDate', amountKey: 'lastPaymentAmount', icon: <InvoiceIcon/>, linkTo: '/portal/cliente/financeiro', colorClass: 'text-green-400' },
    { key: 'nextDelivery', dateKey: 'nextDeliveryDate', taskKey: 'nextDeliveryTask', icon: <ClockIcon/>, linkTo: '/portal/cliente/projetos', colorClass: 'text-purple-400' },
    { key: 'unreadMessages', icon: <MessageIcon/>, linkTo: '/portal/cliente/mensagens', colorClass: 'text-cyan-400' },
    { key: 'recentDocuments', icon: <DocumentIcon/>, linkTo: '/portal/cliente/documentos', colorClass: 'text-indigo-400' },
    { key: 'openTickets', icon: <LifebuoyIcon/>, linkTo: '/portal/cliente/suporte', colorClass: 'text-teal-400' },
    { key: 'totalSpent', amountKey: 'totalSpent', icon: <CurrencyDollarIcon/>, linkTo: '/portal/cliente/financeiro', colorClass: 'text-lime-400' }
  ];

  // Mock de Notificações
  const notifications = [
      { id: 1, text: t('notifications.invoiceDue', { invoiceNumber: 'INV-123', days: 3 }), time: t('notifications.timeAgo', { time: '2h' }), read: false },
      { id: 2, text: t('notifications.projectUpdate', { projectName: 'AlphaApp', status: 'Testes' }), time: t('notifications.timeYesterday'), read: false },
      { id: 3, text: t('notifications.newMessage'), time: t('notifications.timeYesterday'), read: true },
  ];
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;


  return (
    // Usa 'bg-gray-900'
    <div className="bg-gray-900 min-h-full">
      {/* Header do Dashboard */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 pb-4 border-b border-gray-700"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
             {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">{currentDate}</p>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4 mt-4 sm:mt-0 relative">
           {/* Botão Notificações */}
           <div ref={notificationRef}>
             <button
               onClick={() => setIsNotificationOpen(!isNotificationOpen)}
               className="text-gray-400 hover:text-white relative p-1.5 sm:p-2 rounded-full hover:bg-gray-700 transition-colors"
               title={t('clientDashboard.notifications')}
             >
               <BellIcon />
               {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
                  </span>
               )}
             </button>
             {isNotificationOpen && (
               <motion.div
                 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                 className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-72 sm:w-80 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10 overflow-hidden"
               >
                  <div className="p-3 font-semibold text-white border-b border-gray-700 text-sm">
                   {t('notifications.title')} ({unreadNotificationsCount})
                 </div>
                 <ul className="max-h-60 overflow-y-auto divide-y divide-gray-700">
                   {notifications.length > 0 ? notifications.map(notif => (
                     <li key={notif.id} className={`p-3 text-sm hover:bg-gray-700 ${!notif.read ? 'bg-gray-700/50' : ''}`}>
                       <p className={` ${!notif.read ? 'text-white' : 'text-gray-300'}`}>{notif.text}</p>
                       <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                     </li>
                   )) : (
                     <li className="p-3 text-sm text-gray-500 text-center">{t('notifications.noNotifications')}</li>
                   )}
                 </ul>
               </motion.div>
             )}
           </div>

           {/* Botão Perfil/Usuário */}
           <div ref={profileRef}>
             <button
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className="text-gray-400 hover:text-white p-1.5 sm:p-2 rounded-full hover:bg-gray-700 transition-colors"
               title={t('clientDashboard.userProfile')}
              >
               <UserCircleIcon />
             </button>
             {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10 overflow-hidden py-1"
                >
                    {userInfo?.email && (
                      <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700 truncate">
                        {userInfo.email}
                      </div>
                    )}
                    <Link to="#" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left">
                      <CogIcon /> {t('profile.settings')}
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-800 hover:text-white"
                    >
                      <LogoutIconDashboard /> {t('sidebar.logout')}
                    </button>
                </motion.div>
             )}
           </div>
        </div>
      </motion.div>

      {/* Mensagem de Loading/Erro Principal */}
      {loading && <p className="text-gray-400 mb-6">{t('loading.summary')}</p>}
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800 mb-6">{error}</p>}

      {/* Grid de Cards de Visão Geral */}
      {!error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {cardsConfig.map((cardConf, index) => {
            const title = t(`clientDashboard.card${cardConf.key.charAt(0).toUpperCase() + cardConf.key.slice(1)}Title`);
            let description = '';
            let value = cardConf.value;

            if (!loading) {
                 if (cardConf.amountKey) {
                    value = formatCurrency(summaryData[cardConf.amountKey], 'BRL', i18n.language);
                    const descKey = `clientDashboard.card${cardConf.key.charAt(0).toUpperCase() + cardConf.key.slice(1)}Desc`;
                    if (t(descKey, { defaultValue: '' })) description = t(descKey);
                 } else if (cardConf.dateKey && cardConf.taskKey) {
                    value = summaryData[cardConf.taskKey] || '-';
                    const descKey = `clientDashboard.card${cardConf.key.charAt(0).toUpperCase() + cardConf.key.slice(1)}Date`;
                     if (summaryData[cardConf.dateKey]) description = t(descKey, { date: formatDate(summaryData[cardConf.dateKey], i18n.language), defaultValue: '' });
                     else description = t(descKey, { date: 'N/A', defaultValue: '' });
                 } else if (cardConf.dateKey) {
                    const descKey = `clientDashboard.card${cardConf.key.charAt(0).toUpperCase() + cardConf.key.slice(1)}Date`;
                     if (summaryData[cardConf.dateKey]) description = t(descKey, { date: formatDate(summaryData[cardConf.dateKey], i18n.language), defaultValue: '' });
                     else description = t(descKey, { date: 'N/A', defaultValue: '' });
                 } else {
                    value = summaryData[cardConf.key] ?? cardConf.value ?? 0;
                    const descKey = `clientDashboard.card${cardConf.key.charAt(0).toUpperCase() + cardConf.key.slice(1)}Unit`;
                     // Adiciona tratamento para plural simples (ex: 'projeto' vs 'projetos')
                     let count = Number(value) || 0;
                     if (t(descKey, { defaultValue: '', count: count })) {
                         description = t(descKey, { count: count });
                     }
                 }
            }

            return (
              <DashboardCard
                key={cardConf.key} title={title} value={value} description={description}
                icon={cardConf.icon} linkTo={cardConf.linkTo} colorClass={cardConf.colorClass}
                delay={index * 0.05 + 0.1}
              />
            );
           })}
        </div>
      )}

       {/* --- Outras Seções --- */}
       <motion.div className="mb-6 sm:mb-8" {...fadeIn(0.4)}>
         <h2 className="text-xl font-semibold text-white mb-4">{t('clientDashboard.projectsSectionTitle')}</h2>
         <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 shadow-md">
           <p className="text-gray-400 text-sm">{t('clientDashboard.projectsPlaceholder')}</p>
           <Link to="/portal/cliente/projetos" className="text-red-400 hover:underline mt-4 inline-block text-sm font-medium">{t('clientDashboard.seeAllProjects')}</Link>
         </div>
       </motion.div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
           <motion.div {...fadeIn(0.5)}>
             <h2 className="text-xl font-semibold text-white mb-4">{t('clientDashboard.financialSectionTitle')}</h2>
             <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 shadow-md">
               <p className="text-gray-400 text-sm">{t('clientDashboard.financialPlaceholder')}</p>
               <Link to="/portal/cliente/financeiro" className="text-red-400 hover:underline mt-4 inline-block text-sm font-medium">{t('clientDashboard.seeAllInvoices')}</Link>
             </div>
           </motion.div>
           <motion.div {...fadeIn(0.6)}>
             <h2 className="text-xl font-semibold text-white mb-4">{t('clientDashboard.supportSectionTitle')}</h2>
             <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 shadow-md">
                <p className="text-gray-400 text-sm">{t('clientDashboard.supportPlaceholder')}</p>
               <Link to="/portal/cliente/mensagens" className="text-red-400 hover:underline mt-4 inline-block text-sm font-medium">{t('clientDashboard.seeAllMessages')}</Link>
             </div>
           </motion.div>
       </div>

       <motion.div className="mb-8" {...fadeIn(0.7)}>
         <h2 className="text-xl font-semibold text-white mb-4">{t('clientDashboard.documentsSectionTitle')}</h2>
         <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 shadow-md">
           <p className="text-gray-400 text-sm">{t('clientDashboard.documentsPlaceholder')}</p>
           <Link to="/portal/cliente/documentos" className="text-red-400 hover:underline mt-4 inline-block text-sm font-medium">{t('clientDashboard.seeAllDocuments')}</Link>
         </div>
       </motion.div>
    </div>
  );
};

export default ClientDashboard;