// server/controllers/projectController.js
const Project = require('../models/Project');
const User = require('../models/User'); // Necessário para incluir dados do cliente, se quisermos

// @desc    Buscar todos os projetos do cliente logado
// @route   GET /api/projects/myprojects
// @access  Private (Cliente ou Gestor)
const getMyProjects = async (req, res) => {
  try {
    // req.user é adicionado pelo middleware 'protect' e contém o usuário logado
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Busca todos os projetos onde clientId é igual ao ID do usuário logado
    const projects = await Project.findAll({
      where: { clientId: req.user.id },
      order: [['createdAt', 'DESC']], // Ordena pelos mais recentes
      // include: [{ model: User, as: 'client', attributes: ['name', 'email'] }] // Opcional: Incluir dados do cliente
    });

    res.json(projects);

  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar projetos' });
  }
};

// --- Funções Futuras (Exemplos) ---

// @desc    Buscar um projeto específico por ID (verificar permissão)
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
   // TODO: Implementar busca por ID, verificando se o req.user.id é o clientId ou se é gestor
   res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Criar um novo projeto (Apenas Gestores)
// @route   POST /api/projects
// @access  Private/Gestor
const createProject = async (req, res) => {
    // TODO: Implementar criação de projeto, pegando dados do req.body
    res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Atualizar um projeto (Apenas Gestores)
// @route   PUT /api/projects/:id
// @access  Private/Gestor
const updateProject = async (req, res) => {
    // TODO: Implementar atualização de projeto
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyProjects,
  getProjectById, // Exportar mesmo que não implementado ainda
  createProject,
  updateProject,
};