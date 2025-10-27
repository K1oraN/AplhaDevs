// client/src/pages/ClientDocuments.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... */ });

// Ícone de Download
const DownloadIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
// Ícone de PDF
const PdfIcon = () => <svg className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v4.586A1 1 0 0115.414 10L12 13.414V18a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm6 0v4h4V4H10zm2 14v-3.586l3-3V14a2 2 0 01-2 2h-1zM6 18v-8H4v8a2 2 0 002 2z" clipRule="evenodd" /></svg>;
// TODO: Adicionar outros ícones (Word, Zip, etc.)

 // Função para formatar data (pode mover para utils)
const formatDisplayDate = (dateString, locale = 'pt-BR') => {
   if (!dateString) return '-';
   try {
       const date = new Date(dateString); // A data da API já vem com timezone
       return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
   } catch(e) { return dateString; }
}

const ClientDocuments = () => {
  const { t, i18n } = useTranslation();
  const [documents, setDocuments] = useState([]); // Inicia vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Busca documentos da API ao carregar
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError('');
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error(t('errors.notAuthenticated'));
        }

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        // TODO: Usar variável de ambiente VITE_API_URL
        const { data } = await axios.get('http://localhost:3001/api/documents/mydocuments', config);
        setDocuments(data); // Guarda os documentos formatados da API

      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.loadDocumentsError', 'Erro ao carregar documentos'));
        if (err.response?.status === 401) {
          localStorage.removeItem('userInfo');
          // Idealmente redirecionar para login
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [t]); // Dependência t para tradução de erros

  return (
    <div>
      <motion.h1 className="text-3xl font-bold text-white mb-8" {...fadeIn(0)}>
        {t('clientDocuments.title', 'Documentos')}
      </motion.h1>

      {loading && <p className="text-gray-400">{t('loading.documents', 'Carregando documentos...')}</p>}
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>}

      {!loading && !error && (
        <motion.div
          className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden"
          {...fadeIn(0.1)}
        >
          <ul className="divide-y divide-gray-700">
            {documents.length === 0 ? (
              <li className="p-4 text-center text-gray-500">
                {t('clientDocuments.noDocuments')}
              </li>
            ) : (
              documents.map((doc, index) => (
                <motion.li
                  key={doc.id}
                  className="p-4 hover:bg-gray-750 transition-colors flex items-center justify-between space-x-4"
                  {...fadeIn(index * 0.05 + 0.2)}
                >
                  <div className="flex items-center min-w-0">
                     {/* TODO: Lógica para escolher ícone baseado no doc.name ou doc.type */}
                     <PdfIcon />
                     <div className="min-w-0 flex-1 ml-3"> {/* Adicionado ml-3 */}
                        <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400">
                          {/* Usa dados formatados da API */}
                          {/* TODO: Traduzir Tipo, Data, Tamanho */}
                          Tipo: {doc.type} - Data: {formatDisplayDate(doc.date, i18n.language)} - Tamanho: {doc.size}
                        </p>
                     </div>
                  </div>
                  {/* O link agora usa a URL real vinda da API */}
                  <a
                    href={doc.url}
                    download // Tenta forçar o download
                    target="_blank" // Abre PDFs/imagens no navegador
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 flex-shrink-0 transition-colors"
                    title={t('clientDocuments.downloadButtonTooltip')}
                  >
                    <DownloadIcon />
                    <span className="ml-1.5 hidden sm:inline">{t('clientDocuments.downloadButton')}</span>
                  </a>
                </motion.li>
              ))
            )}
          </ul>
        </motion.div>
      )}

    </div>
  );
};
export default ClientDocuments;