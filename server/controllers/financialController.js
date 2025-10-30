// server/controllers/financialController.js
const Invoice = require('../models/Invoice');
const User = require('../models/User'); 
// const Project = require('../models/Project'); // (Não é necessário aqui, mas não faz mal)

// @desc    Buscar todas as faturas do cliente logado
// @route   GET /api/financial/myinvoices
// @access  Private (Cliente ou Gestor)
const getMyInvoices = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const invoices = await Invoice.findAll({
      where: { clientId: req.user.id },
      order: [['dueDate', 'DESC']], 
    });

    res.json(invoices);

  } catch (error) {
    console.error('Erro ao buscar faturas:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar faturas' });
  }
};

// --- Funções Futuras (Exemplos para Gestor) ---

// @desc    Criar uma nova fatura (Apenas Gestores)
// @route   POST /api/financial/invoices
// @access  Private/Gestor
const createInvoice = async (req, res) => {
    // 1. Pegamos os dados do corpo da requisição
    const { 
        clientId, 
        projectId, 
        description, 
        amount, 
        dueDate, 
        status, 
        currency 
    } = req.body;

    // Validação básica
    if (!clientId || !description || !amount || !dueDate || !status) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios' });
    }

    try {
        // 2. Usamos o Modelo Sequelize para criar a fatura no banco
        const invoice = await Invoice.create({
            clientId,
            projectId: projectId || null, // projectId é opcional
            description,
            amount: parseFloat(amount),
            dueDate,
            status,
            currency: currency || 'BRL',
            // O invoiceNumber é gerado automaticamente pelo Hook do Model
        });

        // 3. Retornamos a fatura recém-criada (com o ID e invoiceNumber)
        res.status(201).json(invoice);

    } catch (error) {
        console.error('Erro ao criar fatura:', error);
        // Trata erros de validação do Sequelize (ex: clientId não existe)
        if (error.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'Cliente ou Projeto não encontrado.' });
        }
        res.status(500).json({ message: 'Erro no servidor ao criar fatura' });
    }
};

// @desc    Buscar TODAS as faturas (Apenas Gestores)
// @route   GET /api/financial/all
// @access  Private/Gestor
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      order: [['dueDate', 'DESC']],
      include: [{ 
        model: User,
        as: 'client',
        attributes: ['id', 'name']
      }]
    });
    res.json(invoices);
  } catch (error) {
    console.error('Erro ao buscar todas as faturas:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Atualizar status de uma fatura (Apenas Gestores)
// @route   PUT /api/financial/invoices/:id
// @access  Private/Gestor
 const updateInvoiceStatus = async (req, res) => {
    // TODO: Implementar atualização de status (ex: marcar como Paga)
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyInvoices,
  createInvoice, // <-- Exportamos a nova função
  getAllInvoices,
  updateInvoiceStatus,
};