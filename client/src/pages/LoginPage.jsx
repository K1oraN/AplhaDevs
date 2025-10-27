import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Importa o hook de tradução
import { useTranslation } from 'react-i18next';

// Classe CSS customizada (do seu index.css)
const glassCard = "glass-card";
const btnPulse = "btn-pulse"; // Reutilizar o pulso do botão

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation(); // Inicializa o tradutor

  // Efeito para aplicar o fundo com padrão de pontos apenas nesta página
  useEffect(() => {
    document.body.style.backgroundImage = 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.04) 1px, transparent 0)';
    document.body.style.backgroundSize = '25px 25px';
    // Limpa o estilo ao sair da página
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
    };
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        // TODO: Substituir por variável de ambiente VITE_API_URL
        'http://localhost:3001/api/auth/login', 
        { email, password },
        config
      );

      console.log('Login successful:', data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      // Redirecionamento baseado no role (Implementação Futura - Parte 3)
      if (data.role === 'gestor') {
         // navigate('/portal/gestor/dashboard'); // Exemplo
         navigate('/'); // Por enquanto, volta para home
      } else if (data.role === 'cliente') {
         // navigate('/portal/cliente/dashboard'); // Exemplo
         navigate('/'); // Por enquanto, volta para home
      } else {
         navigate('/'); // Fallback
      }

    } catch (err) {
      // Tenta usar a mensagem de erro da API, senão uma genérica
      setError(err.response?.data?.message || t('login.errorMessageDefault', 'Login failed. Please check your credentials.')); // Usa tradução
      setLoading(false);
    }
  };

  return (
    // Container principal com o fundo e centralização
    <div className="min-h-screen flex items-center justify-center bg-primary-dark px-4 sm:px-6 lg:px-8 py-12">
      {/* Card de Login com estilo glass */}
      <div className={`max-w-md w-full space-y-8 p-10 rounded-2xl shadow-xl border border-gray-700 ${glassCard}`}>
        {/* Cabeçalho do Card */}
        <div className="text-center">
          {/* Logo */}
          <a href="/" className="inline-block mb-4">
              <img className="h-12 w-auto mx-auto" src="/ICONE.png" alt="ALPHADEV Logo"/>
          </a>
          {/* Nome da Empresa */}
          <h1 className="text-3xl font-bold text-white">
            ALPHADEV
          </h1>
          {/* Título */}
          <h2 className="mt-2 text-center text-xl font-medium text-gray-400">
            {t('login.title', 'Access your account')} {/* Usa tradução */}
          </h2>
        </div>

        {/* Formulário */}
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Campo Email */}
            <div>
              <label htmlFor="email-address" className="sr-only">{t('login.emailLabel', 'Email')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-800 placeholder-gray-500 text-gray-200 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder={t('login.emailPlaceholder', 'Your Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Campo Senha */}
            <div>
              <label htmlFor="password"className="sr-only">{t('login.passwordLabel', 'Password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-800 placeholder-gray-500 text-gray-200 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder={t('login.passwordPlaceholder', 'Your Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="text-red-400 text-sm text-center font-medium bg-red-900/30 border border-red-800 p-3 rounded-md">
                {error}
            </div>
          )}

          {/* Botão de Envio */}
          <div>
            <button
              type="submit"
              disabled={loading}
              // Adiciona o efeito de pulso ao botão
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : btnPulse}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Ícone de Cadeado (opcional) */}
                <svg className="h-5 w-5 text-red-300 group-hover:text-red-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              {loading ? t('login.loadingButton', 'Entering...') : t('login.submitButton', 'Enter')} {/* Usa tradução */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;