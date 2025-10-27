// server/controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User'); // Para incluir dados do remetente
const { Op } = require('sequelize');

// @desc    Buscar mensagens recebidas pelo cliente logado
// @route   GET /api/messages/myreceived
// @access  Private (Cliente)
const getMyReceivedMessages = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Busca mensagens onde o recipientId é o do usuário logado
    const messages = await Message.findAll({
      where: { recipientId: req.user.id },
      order: [['createdAt', 'DESC']], // Mais recentes primeiro
      include: [{ // Inclui dados do remetente (ex: nome)
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'role'] // Seleciona apenas campos seguros
      }]
      // TODO: Adicionar paginação no futuro
    });

    // Simula o 'unread' baseado no isReadByClient (simplificação)
    const formattedMessages = messages.map(msg => ({
        id: msg.id,
        subject: msg.subject || `Resposta para: ${msg.id.substring(0,4)}...`, // Placeholder se não houver assunto
        sender: msg.sender ? msg.sender.name : 'Desconhecido', // Nome do remetente
        senderRole: msg.sender ? msg.sender.role : 'Desconhecido',
        date: msg.createdAt, // Usa a data de criação
        unread: !msg.isReadByClient,
        snippet: msg.body.substring(0, 50) + (msg.body.length > 50 ? '...' : ''), // Preview do corpo
        // Adicionar mais campos conforme necessário
    }));


    res.json(formattedMessages);

  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar mensagens' });
  }
};

// --- Funções Futuras ---

// @desc    Enviar uma nova mensagem (Cliente para Admin/Suporte)
// @route   POST /api/messages/send
// @access  Private (Cliente)
const sendMessage = async (req, res) => {
  // TODO: Implementar lógica de envio
  // 1. Pegar { recipientId (ex: ID do admin/suporte), subject, body } do req.body
  // 2. Definir senderId = req.user.id
  // 3. Criar a mensagem: await Message.create({ ... })
  // 4. Retornar a mensagem criada ou sucesso
  res.status(501).json({ message: 'Endpoint não implementado' });
};

 // @desc    Marcar mensagem como lida
// @route   PUT /api/messages/:id/read
// @access  Private (Cliente)
const markMessageAsRead = async (req, res) => {
    // TODO: Implementar lógica para atualizar 'isReadByClient' para true
    // Verificar se a mensagem pertence ao cliente logado (recipientId === req.user.id)
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyReceivedMessages,
  sendMessage,
  markMessageAsRead
};