// server/controllers/documentController.js
const Document = require('../models/Document');
// const Project = require('../models/Project'); // Se precisar incluir dados do projeto

// @desc    Buscar todos os documentos do cliente logado
// @route   GET /api/documents/mydocuments
// @access  Private (Cliente ou Gestor)
const getMyDocuments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const documents = await Document.findAll({
      where: { clientId: req.user.id },
      order: [['uploadDate', 'DESC']], // Mais recentes primeiro
      // include: [{ model: Project, as: 'project', attributes: ['name'] }] // Opcional
    });

    // Formata os dados para o front-end (opcional, pode ser feito no front)
    const formattedDocuments = documents.map(doc => ({
       id: doc.id,
       name: doc.name,
       type: doc.type || 'Documento', // Fallback
       date: doc.uploadDate, // Usar uploadDate ou createdAt?
       size: doc.fileSize || '-',
       url: doc.fileUrl // Envia a URL para o front-end
       // Adicionar status se implementado
    }));

    res.json(formattedDocuments);

  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar documentos' });
  }
};

// --- Funções Futuras (Gestor) ---

// @desc    Fazer upload de um novo documento para um cliente
// @route   POST /api/documents/upload
// @access  Private/Gestor
const uploadDocument = async (req, res) => {
    // TODO: Implementar lógica de upload (receber ficheiro, guardar no S3/etc.,
    //       obter a URL, pegar clientId/projectId do req.body,
    //       criar registo no DB: await Document.create({ ... }))
    res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Deletar um documento
// @route   DELETE /api/documents/:id
// @access  Private/Gestor
const deleteDocument = async (req, res) => {
    // TODO: Implementar lógica de deleção (apagar ficheiro do S3?, deletar registo do DB)
    //       Verificar permissões.
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyDocuments,
  uploadDocument,
  deleteDocument
};