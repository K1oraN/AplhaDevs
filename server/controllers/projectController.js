// server/controllers/projectController.js
const Project = require('../models/Project');
const User = require('../models/User');
const { Op } = require('sequelize');

// @desc    Buscar todos os projetos do cliente logado
// @route   GET /api/projects/myprojects
// @access  Private (Cliente ou Gestor)
const getMyProjects = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    const projects = await Project.findAll({
      where: { clientId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar projetos' });
  }
};

// @desc    Buscar um projeto específico por ID
// @route   GET /api/projects/:id
// @access  Private (Cliente/Gestor)
const getProjectById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    // VERIFICAÇÃO DE PERMISSÃO:
    if (project.clientId !== req.user.id && req.user.role !== 'gestor') {
        return res.status(403).json({ message: 'Acesso negado a este projeto' });
    }

    res.json(project);

  } catch (error) {
    console.error('Erro ao buscar projeto por ID:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Criar um novo projeto (Apenas Gestores)
// @route   POST /api/projects
// @access  Private/Gestor
const createProject = async (req, res) => {
    res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Atualizar um projeto (Apenas Gestores)
// @route   PUT /api/projects/:id
// @access  Private/Gestor
const updateProject = async (req, res) => {
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyProjects,
  getProjectById, // Garantir que está exportado
  createProject,
  updateProject,
};