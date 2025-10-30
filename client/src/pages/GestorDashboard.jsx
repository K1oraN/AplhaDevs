// client/src/pages/GestorDashboard.jsx (VERSÃO DE DEPURAÇÃO)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Ícones (O código dos ícones permanece o mesmo)
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003c0 1.113.285 2.16.786 3.07M15 19.128c-1.113 0-2.16-.285-3.07-.786v-.003M15 19.128c1.113 0 2.16.285 3.07.786v-.003m0 0v.003c.501.786.786 1.83.786 3.07M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 2.625c.372 0 .734-.02.098-.06c.358.04.72.06.098.06" /></svg>;
const ProjectsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5m-7.5-3H12M12 3v18" /></svg>;
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const TicketsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM16.5 6v1.875m0 0a2.25 2.25 0 0 1-2.25 2.25m0 0A2.25 2.25 0 0 1 12 9.75m0 0A2.25 2.25 0 0 1 9.75 7.875m0 0A2.25 2.25 0 0 1 7.5 6m0 0V4.125m5.25 1.875m0 0A2.25 2.25 0 0 1 12 9.75M9.75 7.875m0 0A2.25 2.25 0 0 1 12 9.75m0 0A2.25 2.25 0 0 1 14.25 7.875m0 0A2.25 2.25 0 0 1 16.5 6m-9 6.375a3.375 3.375 0 0 1-3.375-3.375V6.375m3.375 3.375c0-1.02-.39-1.954-.882-2.653M7.5 9.75V6.375m0 0A3.375 3.375 0 0 1 4.125 3m0 0A3.375 3.375 0 0 1 7.5 6.375m0 0v3.375m0 0c.492.7.882 1.633.882 2.653m-3.375-3.375V6.375m0 0A3.375 3.375 0 0 1 7.5 3m0 0A3.375 3.375 0 0 1 10.875 6.375m0 0v3.375m0 0c-.492.7-.882 1.633-.882 2.653m3.375-3.375V6.375m0 0A3.375 3.375 0 0 1 14.25 3m0 0A3.375 3.375 0 0 1 10.875 6.375m0 0v3.375M16.5 9.75v-3.375m0 0A3.375 3.375 0 0 1 19.875 3m0 0A3.375 3.375 0 0 1 16.5 6.375m0 0v3.375m0 0c.492.7.882 1.633.882 2.653m-3.375-3.375V6.375m0 0A3.375 3.375 0 0 1 16.5 3m0 0A3.375 3.375 0 0 1 19.875 6.375m0 0v3.375" /></svg>;

// Componente Card reutilizável
const SummaryCard = ({ title, value, icon, linkTo, colorClass = 'text-red-400', delay }) => (
    <motion.div {...fadeIn(delay)}>
        <Link 
            to={linkTo} 
            className={`block bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md hover:border-red-500/50 hover:bg-gray-750 transition-all duration-200 group h-full flex flex-col min-h-[120px]`}
        >
            <div className="flex justify-between items-start mb-1">
                <h2 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{title}</h2>
                <div className={`p-1.5 rounded-lg bg-gray-700 ${colorClass}/20`}>
                  {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass}` })}
                </div>
            </div>
             <div className="mt-auto">
                <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
            </div>
        </Link>
    </motion.div>
);

const GestorDashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalClients: 0,
        activeProjects: 0,
        pendingInvoices: 0,
        openTickets: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSummaryData = async () => {
            setLoading(true);
            setError('');
            let clientCount = 0;
            let activeProjectsCount = 0;
            let pendingInvoicesCount = 0;

            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token || userInfo.role !== 'gestor') {
                    throw new Error('Não autorizado');
                }
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                // --- VAMOS TESTAR UMA API DE CADA VEZ ---
                
                // 1. Buscar Total de Clientes
                try {
                    console.log('PASSO 1: Buscando /api/users...');
                    const { data: usersData } = await axios.get('http://localhost:3001/api/users', config);
                    clientCount = usersData.filter(u => u.role === 'cliente').length;
                    console.log('PASSO 1: Sucesso! Clientes encontrados:', clientCount);
                } catch (err) {
                    console.error('ERRO NO PASSO 1 (/api/users):', err.response?.data || err.message);
                    throw new Error('Falha ao buscar usuários. Verifique o userController e user/authMiddleware.');
                }
                
                // 2. Buscar Projetos Ativos
                try {
                    console.log('PASSO 2: Buscando /api/projects/all...');
                    const { data: projectsData } = await axios.get('http://localhost:3001/api/projects/all', config);
                    const activeStatus = ['Planejamento', 'Design', 'Desenvolvimento', 'Testes'];
                    activeProjectsCount = projectsData.filter(p => activeStatus.includes(p.status)).length;
                    console.log('PASSO 2: Sucesso! Projetos encontrados:', activeProjectsCount);
                } catch (err) {
                    console.error('ERRO NO PASSO 2 (/api/projects/all):', err.response?.data || err.message);
                    throw new Error('Falha ao buscar projetos. Verifique o projectController (Falta o require "User"?)');
                }

                // 3. Buscar Faturas Pendentes
                try {
                    console.log('PASSO 3: Buscando /api/financial/all...');
                    const { data: invoicesData } = await axios.get('http://localhost:3001/api/financial/all', config);
                    const pendingStatus = ['Pendente', 'Atrasada'];
                    pendingInvoicesCount = invoicesData.filter(f => pendingStatus.includes(f.status)).length;
                    console.log('PASSO 3: Sucesso! Faturas encontradas:', pendingInvoicesCount);
                } catch (err) {
                    console.error('ERRO NO PASSO 3 (/api/financial/all):', err.response?.data || err.message);
                    throw new Error('Falha ao buscar faturas. Verifique o financialController (Falta o require "User"?)');
                }

                // 4. Buscar Tickets (Ainda não implementado)
                const openTicketsCount = 0; 

                setStats({
                    totalClients: clientCount,
                    activeProjects: activeProjectsCount,
                    pendingInvoices: pendingInvoicesCount,
                    openTickets: openTicketsCount
                });

            } catch (err) {
                // Este 'catch' geral agora vai pegar o erro específico que lançamos
                setError(err.message || 'Erro no servidor'); 
                if (err.message === 'Não autorizado') {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSummaryData();
    }, [t, navigate]);

    // O resto do return (JSX) é idêntico
    return (
        <div>
            {/* Cabeçalho */}
            <motion.h1 className="text-3xl font-bold text-white mb-6" {...fadeIn(0)}>
                {t('adminDashboard.title', 'Dashboard do Gestor')}
            </motion.h1>

            {loading && <p className="text-gray-400">{t('loading.summary', 'Carregando resumo...')}</p>}
            {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>}

            {/* Grid de Cards de Resumo */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <SummaryCard
                        title={t('adminDashboard.totalClients', 'Total de Clientes')}
                        value={stats.totalClients}
                        icon={<UsersIcon />}
                        linkTo="/portal/gestor/users"
                        colorClass="text-blue-400"
                        delay={0.1}
                    />
                    <SummaryCard
                        title={t('adminDashboard.activeProjects', 'Projetos Ativos')}
                        value={stats.activeProjects}
                        icon={<ProjectsIcon />}
                        linkTo="/portal/gestor/projetos"
                        colorClass="text-yellow-400"
                        delay={0.2}
                    />
                    <SummaryCard
                        title={t('adminDashboard.pendingInvoices', 'Faturas Pendentes')}
                        value={stats.pendingInvoices}
                        icon={<RevenueIcon />}
                        linkTo="/portal/gestor/financeiro"
                        colorClass="text-green-400"
                        delay={0.3}
                    />
                    <SummaryCard
                        title={t('adminDashboard.openTickets', 'Tickets Abertos')}
                        value={stats.openTickets}
                        icon={<TicketsIcon />}
                        linkTo="/portal/gestor/suporte"
                        colorClass="text-orange-400"
                        delay={0.4}
                    />
                </div>
            )}

            {/* Outros Módulos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700" {...fadeIn(0.5)}>
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t('adminDashboard.recentTickets', 'Chamados Recentes')}
                    </h2>
                    <p className="text-gray-400 text-sm">{t('adminDashboard.ticketsPlaceholder', 'A lista de chamados de suporte abertos aparecerá aqui...')}</p>
                </motion.div>
                 <motion.div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg border border-gray-700" {...fadeIn(0.6)}>
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t('adminDashboard.meetings', 'Calendário de Reuniões')}
                    </h2>
                     <p className="text-gray-400 text-sm">{t('adminDashboard.meetingsPlaceholder', 'O calendário de reuniões agendadas aparecerá aqui...')}</p>
                </motion.div>
            </div>
        </div>
    );
};

export default GestorDashboard;