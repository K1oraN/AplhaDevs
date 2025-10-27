// client/src/pages/ClientFinancial.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';

// (Helper de animação - opcional)
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay }
});

// Função para formatar moeda (simples)
const formatCurrency = (value, currency = 'BRL') => {
    try {
        // Tenta detectar o locale do navegador para melhor formatação
        const userLocale = navigator.language || 'pt-BR';
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: currency
        }).format(value);
    } catch (e) {
        // Fallback mais robusto
        const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'R$';
        return `${symbol} ${Number(value).toFixed(2)}`;
    }
};

 // Função para formatar data (simples)
const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      // Tenta usar a formatação local do navegador
      const date = new Date(dateString + 'T00:00:00'); // Adiciona T00 para evitar problemas de timezone
      const userLocale = navigator.language || 'pt-BR';
      return new Intl.DateTimeFormat(userLocale).format(date);
    } catch (e) {
      // Fallback
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }
};

// Componente Badge de Status
const StatusBadge = ({ status }) => {
    const { t } = useTranslation(); // Para traduzir o status
    let bgColor = 'bg-gray-700';
    let textColor = 'text-gray-200';
    let translatedStatus = status; // Fallback

    // Mapeamento de status para chaves de tradução (exemplo)
    const statusKeyMap = {
        'Pendente': 'financial.statusPending',
        'Paga': 'financial.statusPaid',
        'Atrasada': 'financial.statusOverdue',
        'Cancelada': 'financial.statusCancelled'
    };

    translatedStatus = t(statusKeyMap[status] || status); // Tenta traduzir, senão usa o original

    switch (status) {
        case 'Paga':
            bgColor = 'bg-green-700';
            textColor = 'text-green-100';
            break;
        case 'Atrasada':
            bgColor = 'bg-yellow-700';
            textColor = 'text-yellow-100';
            break;
        case 'Cancelada':
            bgColor = 'bg-red-700';
            textColor = 'text-red-100';
            break;
        case 'Pendente':
        default:
            bgColor = 'bg-blue-700';
            textColor = 'text-blue-100';
            break;
    }
    return (
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
            {translatedStatus}
        </span>
    );
};

const ClientFinancial = () => {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError('');
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error(t('errors.notAuthenticated', 'User not authenticated'));
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        // TODO: Usar variável de ambiente VITE_API_URL
        const { data } = await axios.get('http://localhost:3001/api/financial/myinvoices', config);
        setInvoices(data);

      } catch (err) {
        setError(err.response?.data?.message || err.message || t('errors.loadFinancialError', 'Error loading financial data'));
         if (err.response?.status === 401) {
             localStorage.removeItem('userInfo');
             // Idealmente redirecionar para login
             // window.location.href = '/login?sessionExpired=true';
         }
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [t]); // Adiciona t como dependência se usar traduções nos erros

  return (
    <div>
      <motion.h1
        className="text-3xl font-bold text-white mb-8"
        {...fadeIn(0)}
      >
         {t('financial.title', 'Financeiro')}
      </motion.h1>

      {loading && <p className="text-gray-400">{t('loading.invoices', 'Carregando faturas...')}</p>}
      {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800">{error}</p>}

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
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {t('financial.noInvoicesFound', 'Nenhuma fatura encontrada.')}
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{invoice.invoiceNumber}</td>
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

export default ClientFinancial;