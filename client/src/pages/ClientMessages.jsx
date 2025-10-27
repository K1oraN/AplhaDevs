// client/src/pages/ClientMessages.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Função para formatar data (pode mover para utils)
const formatDisplayDate = (dateString, locale = 'pt-BR') => {
     try {
         const date = new Date(dateString);
         return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
     } catch(e) { return dateString; }
};

// Componente ClientMessages atualizado
const ClientMessages = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // Hook para redirecionamento
    const [messages, setMessages] = useState([]); // Inicia vazio
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Busca mensagens da API ao carregar
    useEffect(() => {
        const fetchMessages = async () => {
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
                const { data } = await axios.get('http://localhost:3001/api/messages/myreceived', config);
                setMessages(data); // Guarda as mensagens formatadas da API

            } catch (err) {
                setError(err.response?.data?.message || err.message || t('errors.loadMessagesError'));
                if (err.response?.status === 401) {
                    localStorage.removeItem('userInfo');
                    navigate('/login'); // Redireciona se não autorizado
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [t, navigate]); // Adiciona navigate às dependências


    return (
        <div>
            <motion.h1 className="text-3xl font-bold text-white mb-8" {...fadeIn(0)}>
                {t('clientMessages.title', 'Mensagens')}
            </motion.h1>

            {loading && <p className="text-gray-400">{t('loading.messages', 'Carregando mensagens...')}</p>}
            {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>}

            {!loading && !error && (
                <motion.div
                    className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden"
                    {...fadeIn(0.1)}
                >
                    <ul className="divide-y divide-gray-700">
                        {messages.length === 0 ? (
                            <li className="p-4 sm:p-6 text-center text-gray-500">
                                {t('clientMessages.noMessages')}
                            </li>
                        ) : (
                            messages.map((msg, index) => (
                                <motion.li
                                    key={msg.id}
                                    className={`p-4 sm:p-6 hover:bg-gray-750 transition-colors cursor-pointer flex justify-between items-center ${msg.unread ? 'bg-gray-700/50' : ''}`}
                                    onClick={() => setSelectedMessage(msg)}
                                    {...fadeIn(index * 0.05 + 0.2)}
                                >
                                    <div className="min-w-0 flex-1 mr-4">
                                        <p className={`text-sm font-semibold truncate ${msg.unread ? 'text-white' : 'text-gray-300'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {t('clientMessages.from', 'De:')} {msg.sender}
                                            {msg.senderRole && ` (${t('roles.' + msg.senderRole, msg.senderRole)})`} - {formatDisplayDate(msg.date, i18n.language)}
                                        </p>
                                         <p className={`text-xs text-gray-500 mt-1 truncate max-w-xs sm:max-w-md md:max-w-lg ${msg.unread ? 'font-medium' : ''}`}>
                                           {msg.snippet}
                                         </p>
                                    </div>
                                    {/* ***** ERRO CORRIGIDO AQUI ***** */}
                                    {/* O span estava fora do parêntese da condição */}
                                    {msg.unread && (
                                        <span
                                            className="flex-shrink-0 ml-auto h-2 w-2 bg-red-500 rounded-full"
                                            title={t('clientMessages.unreadTooltip')}
                                        ></span>
                                    )}
                                    {/* ******************************* */}
                                </motion.li>
                            ))
                        )}
                    </ul>
                </motion.div>
            )}

            {/* Área Simples para Detalhe da Mensagem (Exemplo) */}
            {selectedMessage && (
                 <motion.div
                    className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">{selectedMessage.subject}</h2>
                        <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-white">&times;</button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                        {t('clientMessages.from', 'De:')} {selectedMessage.sender} - {formatDisplayDate(selectedMessage.date, i18n.language)}
                    </p>
                    {/* TODO: Buscar corpo completo da API */}
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.snippet} (Corpo completo aqui...)</p>
                    {/* TODO: Adicionar campo de resposta */}
                </motion.div>
            )}

        </div>
    );
};
export default ClientMessages;