// client/src/pages/GestorFinancial.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay }
});

// (Funções de formatação - copiadas do ClientFinancial)
const formatCurrency = (value, currency = 'BRL') => {
    try {
        const userLocale = navigator.language || 'pt-BR';
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: currency
        }).format(value);
    } catch (e) {
        const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'R$';
        return `${symbol} ${Number(value).toFixed(2)}`;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString + 'T00:00:00');
      const userLocale = navigator.language || 'pt-BR';
      return new Intl.DateTimeFormat(userLocale).format(date);
    } catch (e) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }
};

// (Componente Badge de Status - copiado do ClientFinancial)
const StatusBadge = ({ status }) => {
    const { t } = useTranslation(); 
    let bgColor = 'bg-gray-700';
    let textColor = 'text-gray-200';
    const statusKeyMap = {
        'Pendente': 'financial.statusPending',
        'Paga': 'financial.statusPaid',
        'Atrasada': 'financial.statusOverdue',
        'Cancelada': 'financial.statusCancelled'
    };
    const translatedStatus = t(statusKeyMap[status] || status); 

    switch (status) {
        case 'Paga': bgColor = 'bg-green-700'; textColor = 'text-green-100'; break;
        case 'Atrasada': bgColor = 'bg-yellow-700'; textColor = 'text-yellow-100'; break;
        case 'Cancelada': bgColor = 'bg-red-700'; textColor = 'text-red-100'; break;
        case 'Pendente': default: bgColor = 'bg-blue-700'; textColor = 'text-blue-100'; break;
    }
    return (
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
            {translatedStatus}
        </span>
    );
};


// --- COMPONENTE PRINCIPAL ---
const GestorFinancial = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllInvoices = async () => {
      setLoading(true);
      setError('');
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token || userInfo.role !== 'gestor') {
          throw new Error(t('errors.notAuthorized', 'Não autorizado'));
        }

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        // ALTERAÇÃO AQUI: Buscando de '/api/financial/all'
        const { data } = await axios.get('http://localhost:3001/api/financial/all', config);
        setInvoices(data);

      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.loadAllFinancialError', 'Erro ao carregar dados financeiros'));
         if (err.response?.status === 401 || err.response?.status === 403) {
             localStorage.removeItem('userInfo');
             navigate('/login');
         }
      } finally {
        setLoading(false);
      }
    };

    fetchAllInvoices();
  }, [t, navigate]);

  return (
    <div>
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
        {...fadeIn(0)}
      >
        <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
            {t('financial.gestorTitle', 'Gestão Financeira')}
        </h1>
        <button
            // onClick={() => setIsModalOpen(true)} // TODO: Passo futuro
            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            {t('financial.newInvoiceButton', 'Nova Fatura')}
        </button>
      </motion.div>

      {/* --- ESTADO DE LOADING E ERRO --- */}
      {loading && <p className="text-gray-400">{t('loading.allInvoices', 'Carregando todas as faturas...')}</p>}
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>}

      {/* --- TABELA DE FATURAS --- */}
      {!loading && !error && (
        <motion.div
          className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden"
          {...fadeIn(0.1)}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderInvoiceNo', 'Nº Fatura')}</th>
                  
                  {/* ALTERAÇÃO AQUI: Nova coluna "Cliente" */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderClient', 'Cliente')}</th>
                  
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderDescription', 'Descrição')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderDueDate', 'Vencimento')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderAmount', 'Valor')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderStatus', 'Status')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('financial.tableHeaderPaidDate', 'Pagamento')}</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {t('financial.noInvoicesFound', 'Nenhuma fatura encontrada.')}
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{invoice.invoiceNumber}</td>
                      
                      {/* ALTERAÇÃO AQUI: Mostra o nome do cliente */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{invoice.client?.name || 'Cliente não encontrado'}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{invoice.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(invoice.dueDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-semibold">{formatCurrency(invoice.amount, invoice.currency)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={invoice.status} />
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(invoice.paidDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GestorFinancial;