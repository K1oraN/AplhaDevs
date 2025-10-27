// server/controllers/dashboardController.js
const Project = require('../models/Project');
const Invoice = require('../models/Invoice');
const { Op } = require('sequelize'); // Importa operadores do Sequelize para queries complexas

// @desc    Buscar dados resumidos para o dashboard do cliente logado
// @route   GET /api/dashboard/clientsummary
// @access  Private (Cliente) 
const getClientDashboardSummary = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'cliente') { // Garante que é um cliente
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const clientId = req.user.id;

    // 1. Contar Projetos Ativos (Ex: Não Cancelado e Não Lançado/Manutenção)
    const activeProjectCount = await Project.count({
      where: {
        clientId: clientId,
        status: {
          [Op.notIn]: ['Lançado', 'Manutenção', 'Cancelado'] // Status que NÃO são considerados ativos
        }
      }
    });

    // 2. Contar Faturas Pendentes ou Atrasadas
    const pendingInvoiceCount = await Invoice.count({
      where: {
        clientId: clientId,
        status: {
          [Op.in]: ['Pendente', 'Atrasada'] // Status considerados "não pagos"
        }
      }
    });

    // 3. Contar Mensagens Não Lidas (Placeholder - Implementar futuramente)
    const unreadMessageCount = 0; // TODO: Buscar contagem real quando o modelo Message existir

    // Monta o objeto de resumo
    const summary = {
      activeProjects: activeProjectCount,
      pendingInvoices: pendingInvoiceCount,
      unreadMessages: unreadMessageCount,
    };

    res.json(summary);

  } catch (error) {
    console.error('Erro ao buscar resumo do dashboard:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar resumo do dashboard' });
  }
};


module.exports = {
  getClientDashboardSummary,
  // Adicionar funções para dashboard do gestor futuramente
};