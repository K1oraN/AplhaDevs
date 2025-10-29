// client/src/pages/ClientProjects.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Função para formatar data (com hora)
const formatDisplayDate = (dateString, locale = 'pt-BR') => {
     if (!dateString) return '-';
     try {
         const date = new Date(dateString); // API retorna com timezone
         // Formato que inclui hora e minuto
         return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
     } catch(e) { return dateString; }
};
// Função para formatar apenas data
const formatDateOnly = (dateString, locale = 'pt-BR') => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString + 'T00:00:00'); // Trata como data local YYYY-MM-DD
      return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    } catch (e) {
      const parts = dateString.split('-');
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
      return dateString;
    }
};

// Componente Card de Projeto Atualizado
const ProjectCard = ({ project, delay }) => {
  const { t, i18n } = useTranslation();

  // Calcula progresso (Placeholder)
  const calculateProgress = (status) => {
    const statusMap = {
      'Planejamento': 10, 'Design': 30, 'Desenvolvimento': 60,
      'Testes': 80, 'Lançado': 100, 'Manutenção': 100, 'Cancelado': 0
    };
    return statusMap[project.status] || 0;
  };
  const progress = calculateProgress(project.status);
  const progressColor = progress === 100 ? 'bg-green-500' : (progress > 0 ? 'bg-red-500' : 'bg-gray-600');

  // Status Badge
  let statusBgColor = 'bg-blue-700';
  let statusTextColor = 'text-blue-100';
  if (project.status === 'Lançado') { statusBgColor = 'bg-green-700'; statusTextColor = 'text-green-100'; }
  if (project.status === 'Cancelado') { statusBgColor = 'bg-red-700'; statusTextColor = 'text-red-100'; }
  if (project.status === 'Manutenção') { statusBgColor = 'bg-yellow-700'; statusTextColor = 'text-yellow-100'; }


  return (
    <motion.div
      className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-md flex flex-col justify-between hover:border-red-500/50 transition-colors duration-200 min-h-[280px]" // Altura mínima para consistência
      {...fadeIn(delay)}
    >
      <div>
        {/* Nome e Status */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-md font-semibold text-white mb-1 truncate pr-2">{project.name}</h3>
          <span className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${statusBgColor} ${statusTextColor}`}>
            {t(`projectStatus.${project.status}`, project.status)} {/* Traduz Status */}
          </span>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-600 rounded-full h-1.5 mb-1">
          <div className={`${progressColor} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-gray-400 mb-3">{t('projects.progress', 'Progresso:')} {progress}%</p>

        {/* Descrição Curta */}
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description || t('projects.noDescription', 'Sem descrição')}</p>
      </div>

      {/* Detalhes Inferiores */}
      <div className="mt-auto border-t border-gray-700 pt-3 text-xs text-gray-500 space-y-1.5">
         <div>
          {t('projects.nextDelivery', 'Próxima Entrega:')} <span className="text-gray-300 font-medium">{formatDateOnly(project.endDate, i18n.language)}</span>
        </div>
         <div>
          {t('projects.lastUpdate', 'Última Atualização:')} <span className="text-gray-300 font-medium">{formatDisplayDate(project.updatedAt, i18n.language)}</span> {/* Usa updatedAt */}
        </div>
         <div>
          {t('projects.manager', 'Equipa Responsável:')} <span className="text-gray-300 font-medium">{t('projects.defaultTeam', 'Equipa AlphaDevs')}</span> {/* Placeholder */}
        </div>
        {/* Botão Detalhes */}
        <Link
          // A rota `/portal/cliente/projetos/:id` ainda não existe, criaremos depois
          to={`/portal/cliente/projetos/${project.id}`} // Link para detalhes (rota futura)
          className="w-full text-center text-xs font-medium text-red-400 hover:text-red-300 transition-colors block pt-2"
          // onClick={(e) => e.preventDefault()} // Removido para o link funcionar
        >
          {t('projects.viewDetails', 'Ver Detalhes')} &rarr;
        </Link>
      </div>
    </motion.div>
  );
};


const ClientProjects = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentFilter = searchParams.get('filter') || 'ativos';

  // Busca os projetos da API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); setError('');
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) throw new Error(t('errors.notAuthenticated'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        // TODO: Usar VITE_API_URL
        const { data } = await axios.get('http://localhost:3001/api/projects/myprojects', config);
        setProjects(data);
      } catch (err) {
          setError(err.response?.data?.message || err.message || t('errors.loadProjectsError'));
          if (err.response?.status === 401) {
              localStorage.removeItem('userInfo');
              navigate('/login');
          }
      } finally { setLoading(false); }
    };
    fetchProjects();
  }, [t, navigate]); // Dependências corretas

   // Filtra os projetos no front-end
  const filteredProjects = useMemo(() => {
    if (loading) return [];
    return projects.filter(p => {
      const activeStatus = ['Planejamento', 'Design', 'Desenvolvimento', 'Testes'];
      const completedStatus = ['Lançado'];
      const maintenanceStatus = ['Manutenção'];

      if (currentFilter === 'ativos') return activeStatus.includes(p.status);
      if (currentFilter === 'concluidos') return completedStatus.includes(p.status);
      if (currentFilter === 'manutencao') return maintenanceStatus.includes(p.status);
      return false; // Retorna vazio se filtro desconhecido
    });
  }, [projects, currentFilter, loading]); // Adiciona loading

  // Função para mudar o filtro na URL
  const handleFilterChange = (newFilter) => {
    setSearchParams({ filter: newFilter });
  };

  // Botões de Filtro
  const filterButtons = [
    { key: 'ativos', labelKey: 'projects.filterActive' },
    { key: 'concluidos', labelKey: 'projects.filterCompleted' },
    { key: 'manutencao', labelKey: 'projects.filterMaintenance' },
  ];

  return (
    <div>
      {/* Cabeçalho da Página com Título e Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <motion.h1 className="text-3xl font-bold text-white mb-4 sm:mb-0" {...fadeIn(0)}>
            {t('projects.title', 'Meus Projetos')}
          </motion.h1>
          {/* Botões de Filtro */}
          <motion.div className="flex space-x-2" {...fadeIn(0.1)}>
             {filterButtons.map(btn => (
                <button
                  key={btn.key}
                  onClick={() => handleFilterChange(btn.key)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 ${
                      currentFilter === btn.key
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {t(btn.labelKey)} {/* Traduz label */}
                </button>
             ))}
          </motion.div>
      </div>

      {/* Exibição dos Projetos */}
      {loading && <p className="text-gray-400 text-center py-10">{t('loading.projects')}</p>}
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800 text-center">{error}</p>}

      {!loading && !error && filteredProjects.length === 0 && (
         <motion.p
            className="text-gray-500 text-center py-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
           {t('projects.noProjectsFound', 'Nenhum projeto encontrado para este filtro.')}
         </motion.p>
      )}

      {!loading && !error && filteredProjects.length > 0 && (
        // Grid ajustado
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.05} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientProjects;