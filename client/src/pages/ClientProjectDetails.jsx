// client/src/pages/ClientProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Funções de formatação (copiadas do ClientProjects)
const formatDisplayDate = (dateString, locale = 'pt-BR') => {
     if (!dateString) return '-';
     try {
         const date = new Date(dateString);
         return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
     } catch(e) { return dateString; }
};
const formatDateOnly = (dateString, locale = 'pt-BR') => {
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

const ClientProjectDetails = () => {
  const { id: projectId } = useParams(); // Pega o :id da URL
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error(t('errors.notAuthenticated'));
        }
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        // Busca na API os dados DESTE projeto específico
        const { data } = await axios.get(`http://localhost:3001/api/projects/${projectId}`, config);
        setProject(data);

      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.loadProjectDetailsError', 'Erro ao carregar detalhes do projeto.'));
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/portal/cliente/projetos'); // Volta para lista se não tiver permissão
        }
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId, t, navigate]);

  // Lógica de progresso (placeholder)
  const calculateProgress = (status) => {
    const statusMap = { 'Planejamento': 10, 'Design': 30, 'Desenvolvimento': 60, 'Testes': 80, 'Lançado': 100, 'Manutenção': 100, 'Cancelado': 0 };
    return statusMap[status] || 0;
  };

  if (loading) {
    return <p className="text-gray-400">{t('loading.projectDetails', 'Carregando detalhes do projeto...')}</p>;
  }

  if (error) {
    return <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>;
  }

  if (!project) {
    return <p className="text-gray-500">{t('projects.notFound', 'Projeto não encontrado.')}</p>;
  }

  // Se carregou com sucesso:
  const progress = calculateProgress(project.status);
  const progressColor = progress === 100 ? 'bg-green-500' : (progress > 0 ? 'bg-red-500' : 'bg-gray-600');

  return (
    <div>
      {/* Botão de Voltar */}
      <Link 
        to="/portal/cliente/projetos" 
        className="text-red-400 hover:text-red-300 text-sm mb-4 inline-block transition-colors"
      >
        &larr; {t('projects.backToList', 'Voltar para Meus Projetos')}
      </Link>
      
      {/* Cabeçalho do Projeto */}
      <motion.h1 className="text-3xl font-bold text-white mb-2" {...fadeIn(0)}>
        {project.name}
      </motion.h1>
      <motion.p className="text-lg text-gray-400 mb-6" {...fadeIn(0.1)}>
        {project.description}
      </motion.p>

      {/* Barra de Progresso Grande */}
       <motion.div className="mb-6" {...fadeIn(0.2)}>
            <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                <span>{t(`projectStatus.${project.status}`, project.status)}</span>
                <span className="text-red-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div className={`${progressColor} h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
        </motion.div>
        
      {/* Grid de Detalhes (Conforme Ponto 3 do briefing) */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-800 p-6 rounded-lg border border-gray-700"
        {...fadeIn(0.3)}
      >
        <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">{t('projects.nextDelivery', 'Próxima Entrega')}</h4>
          <p className="text-lg text-white font-medium">{formatDateOnly(project.endDate, i18n.language)}</p>
        </div>
         <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">{t('projects.manager', 'Equipa Responsável')}</h4>
          <p className="text-lg text-white font-medium">{t('projects.defaultTeam', 'Equipa AlphaDevs')}</p>
        </div>
         <div>
          <h4 className="text-xs text-gray-500 uppercase font-semibold">{t('projects.lastUpdate', 'Última Atualização')}</h4>
          <p className="text-lg text-white font-medium">{formatDisplayDate(project.updatedAt, i18n.language)}</p>
        </div>
      </motion.div>

      {/* Secção Linha do Tempo / Atividades Recentes (Ponto 7 do briefing) */}
      <motion.div className="mt-8" {...fadeIn(0.4)}>
         <h3 className="text-xl font-semibold text-white mb-4">{t('projects.activityFeed', 'Atividade Recente')}</h3>
         <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            {/* TODO: Implementar busca de logs/atividades da API */}
            <p className="text-gray-500 text-sm">{t('projects.activityPlaceholder', 'A linha do tempo e atividades do projeto aparecerão aqui...')}</p>
            {/* Exemplo de como poderia ser: */}
            {/* <ul className="space-y-4">
                <li className="text-sm text-gray-300">🔹 [26/10] Status atualizado para <span className="font-medium text-white">Testes</span></li>
                <li className="text-sm text-gray-300">🔹 [25/10] Fatura #105 paga – R$ 1.200</li>
                <li className="text-sm text-gray-300">🔹 [22/10] Contrato assinado</li>
            </ul> */}
         </div>
      </motion.div>
      
    </div>
  );
};

export default ClientProjectDetails;