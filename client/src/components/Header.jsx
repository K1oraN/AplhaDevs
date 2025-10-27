import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next'; 

// Hook customizado para saber se a página rolou
const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica no carregamento
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isScrolled;
};


const Header = () => {
  const isScrolled = useHeaderScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false); 
  };

  const navLinks = [
    { to: 'services', label: t('header.navSolutions') },
    // { to: 'subscription', label: t('header.navSubscriptions') }, 
    { to: 'planos', label: t('header.navPackages') }, 
    { to: 'portfolio', label: t('header.navProjects') },
    { to: 'contact-form', label: t('header.navContact'), isHighlight: true },
  ];

  return (
    <header 
      id="main-header" 
      // ***** MUDANÇA AQUI: Adicionado bg-primary-dark/90 e backdrop-blur-sm como padrão *****
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? 'header-scrolled' 
        : 'bg-primary-dark/90 backdrop-blur-sm' // Fundo levemente transparente no topo
      }`}
    >
      {/* ... (Resto do código do Header permanece igual) ... */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo */}
              <ScrollLink to="hero" smooth={true} duration={500} className="flex-shrink-0 flex items-center space-x-2 cursor-pointer">
                <img 
                  className="h-8 w-auto" 
                  src="/ICONE.png" 
                  alt="ALPHADEV Icone"
                />
                <span className="text-xl font-bold text-white">ALPHADEV</span>
              </ScrollLink>
              
              {/* Navegação (Desktop) */}
              <nav className="hidden md:flex space-x-8 items-center"> {/* Adicionado items-center */}
                {navLinks.map((link) => (
                  <ScrollLink
                    key={link.to}
                    to={link.to} 
                    smooth={true}
                    duration={500}
                    offset={-80} 
                    className={`transition-colors cursor-pointer ${
                      link.isHighlight 
                        ? 'text-red-500 hover:text-red-400 font-medium' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </ScrollLink>
                ))}
                
                {/* ***** SELETOR DE IDIOMA (DESKTOP) ***** */}
                <div className="flex space-x-2 ml-4">
                  <button onClick={() => changeLanguage('pt-BR')} className={`text-sm font-medium ${i18n.language === 'pt-BR' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇧🇷</button>
                  <button onClick={() => changeLanguage('en-US')} className={`text-sm font-medium ${i18n.language === 'en-US' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇺🇸</button>
                  <button onClick={() => changeLanguage('es')} className={`text-sm font-medium ${i18n.language === 'es' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇪🇸</button>
                </div>
              </nav>
              
              {/* Botão CTA (Desktop) */}
              <div className="hidden md:block ml-4"> {/* Adicionado ml-4 para espaçamento */}
                <RouterLink 
                  to="/login" 
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                >
                  {t('header.ctaButton')}
                </RouterLink>
              </div>

              {/* Botão Menu Mobile */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="text-gray-300 hover:text-white"
                  aria-label="Abrir menu"
                >
                  {isMobileMenuOpen ? ( <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> ) : ( <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg> )}
                </button>
              </div>
            </div>
          </div>

          {/* Menu Mobile Dropdown */}
          <div 
            className={`absolute top-20 left-0 right-0 border-t border-gray-800 shadow-lg md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100 visible transform-none' : 'opacity-0 invisible -translate-y-4'
            } ${isScrolled ? 'header-scrolled' : 'bg-primary-dark/95 backdrop-blur-sm'}`} // Garante o fundo também no mobile
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                 <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                    link.isHighlight ? 'text-red-500 hover:text-red-400 font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </ScrollLink>
              ))}
              
              {/* ***** SELETOR DE IDIOMA (MOBILE) ***** */}
              <div className="flex space-x-4 pt-4 border-t border-gray-700 justify-center">
                <button onClick={() => changeLanguage('pt-BR')} className={`text-lg font-medium ${i18n.language === 'pt-BR' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇧🇷</button>
                <button onClick={() => changeLanguage('en-US')} className={`text-lg font-medium ${i18n.language === 'en-US' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇺🇸</button>
                <button onClick={() => changeLanguage('es')} className={`text-lg font-medium ${i18n.language === 'es' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>🇪🇸</button>
              </div>

              <RouterLink 
                to="/login"
                className="w-full text-center mt-2 inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                {t('header.ctaButton')}
              </RouterLink>
            </nav>
          </div>
    </header>
  );
};

export default Header;