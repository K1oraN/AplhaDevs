// client/src/pages/AdminUsersPage.jsx
import React, { useState, useEffect, Gpt_Synth_React_Stat_Func, useRef } from 'react'; // Adicionado useRef
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay }
});

// Ícones
const PlusIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;
const EditIcon = () => <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>;
const DeleteIcon = () => <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;


// Função para formatar data
const formatDisplayDate = (dateString, locale = 'pt-BR') => {
     if (!dateString) return '-';
     try {
         const date = new Date(dateString);
         return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
     } catch(e) { return dateString; }
};

// Componente do Modal
const CreateUserModal = ({ isOpen, onClose, onUserCreated, t }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('cliente'); // Padrão é criar cliente
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef(null); // Ref para o conteúdo do modal

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password.length < 6) {
            setError(t('adminUsers.modalErrorPassword', 'A senha deve ter pelo menos 6 caracteres.'));
            setLoading(false);
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                'http://localhost:3001/api/users', // Rota POST /api/users
                { name, email, password, role },
                config
            );

            setLoading(false);
            onUserCreated(data); // Passa o novo utilizador de volta para a página principal
            onClose(); // Fecha o modal

        } catch (err) {
            setError(err.response?.data?.message || err.message || t('errors.createUserError', 'Erro ao criar utilizador.'));
            setLoading(false);
        }
    };
    
    // Hook para fechar o modal ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, modalRef]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
                ref={modalRef} // Atribui a ref
                className="bg-gray-800 p-6 rounded-lg w-full max-w-md border border-gray-700 shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">{t('adminUsers.modalTitle', 'Criar Novo Utilizador')}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </div>
                
                {error && <div className="text-red-400 text-sm text-center font-medium bg-red-900/30 border border-red-800 p-3 rounded-md mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('adminUsers.formName', 'Nome Completo')}</label>
                        <input
                            type="text" id="name" required value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('adminUsers.formEmail', 'Email')}</label>
                        <input
                            type="email" id="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">{t('adminUsers.formPassword', 'Senha (mín. 6 caracteres)')}</label>
                        <input
                            type="password" id="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">{t('adminUsers.formRole', 'Papel')}</label>
                        <select
                            id="role" required value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        >
                            <option value="cliente">{t('roles.cliente', 'Cliente')}</option>
                            <option value="funcionario">{t('roles.funcionario', 'Funcionário')}</option>
                            <option value="gestor">{t('roles.gestor', 'Gestor')}</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded transition-colors disabled:opacity-50"
                        >
                            {t('adminUsers.modalClose', 'Cancelar')}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? t('adminUsers.modalSaving', 'A Criar...') : t('adminUsers.modalCreate', 'Criar Utilizador')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};


const AdminUsersPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para buscar os utilizadores
    const fetchUsers = async () => {
        // Não define loading aqui para evitar piscar ao criar novo user
        setError('');
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) throw new Error(t('errors.notAuthenticated'));
            if (userInfo.role !== 'gestor') throw new Error(t('errors.notAuthorized'));

            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:3001/api/users', config);
            setUsers(data);

        } catch (err) {
            setError(err.response?.data?.message || err.message || t('errors.loadUsersError', 'Erro ao carregar utilizadores'));
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/login');
            }
        } finally {
            setLoading(false); // Define loading false no final
        }
    };

    // Busca utilizadores ao carregar a página
    useEffect(() => {
        setLoading(true); // Define loading true ao montar
        fetchUsers();
    }, [t, navigate]); // Dependências

    // Callback para atualizar a lista após criar um novo utilizador
    const handleUserCreated = (newUser) => {
        // Adiciona o novo utilizador ao topo da lista, sem precisar de nova busca
        setUsers([newUser, ...users]); 
    };

    return (
        <div>
            {/* Cabeçalho da Página */}
            <motion.div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
                {...fadeIn(0)}
            >
                <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
                    {t('adminUsers.title', 'Gerir Utilizadores')}
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)} // Abre o modal
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                    <PlusIcon />
                    <span className="ml-2">{t('adminUsers.newUserButton', 'Novo Utilizador')}</span>
                </button>
            </motion.div>
            
            {/* Modal de Criação de Utilizador */}
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserCreated={handleUserCreated}
                t={t}
            />

            {/* Tabela de Utilizadores */}
            {loading && <p className="text-gray-400 text-center py-10">{t('loading.users', 'Carregando utilizadores...')}</p>}
            {error && <p className="text-red-500 bg-red-900/30 p-3 rounded border border-red-800 text-center">{error}</p>}
            
            {!loading && !error && (
                <motion.div
                    className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden"
                    {...fadeIn(0.1)}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-750">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('adminUsers.tableHeaderName', 'Nome')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('adminUsers.tableHeaderEmail', 'Email')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('adminUsers.tableHeaderRole', 'Papel')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('adminUsers.tableHeaderJoined', 'Registado em')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('adminUsers.tableHeaderActions', 'Ações')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                user.role === 'gestor' ? 'bg-red-700 text-red-100' :
                                                user.role === 'funcionario' ? 'bg-yellow-700 text-yellow-100' :
                                                'bg-blue-700 text-blue-100'
                                            }`}>
                                                {t('roles.' + user.role, user.role)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {formatDisplayDate(user.createdAt, i18n.language)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button className="text-blue-400 hover:text-blue-300" title={t('adminUsers.editTooltip', 'Editar')}>
                                                <EditIcon />
                                            </button>
                                            <button className="text-red-500 hover:text-red-400" title={t('adminUsers.deleteTooltip', 'Remover')}>
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default AdminUsersPage;