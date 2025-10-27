import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next'; 

// ***** 1. DEFINIÇÕES COMPLETAS DOS SVGS *****
const SvgLinkedIn = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const SvgGitHub = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.109-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SvgLinktree = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.368 1.5H21.63C22.386 1.5 23 2.113 23 2.868v18.264c0 .755-.614 1.368-1.37 1.368H2.37C1.614 22.5 1 21.887 1 21.132V2.868C1 2.113 1.614 1.5 2.368 1.5zM12 4.416c-1.644 0-3.13.54-4.293 1.44l-.24.215 5.88 5.867 5.88-5.868-.24-.214C15.13 4.956 13.644 4.416 12 4.416zm-5.64 3.078L1.6 12.24v6.84l4.76-4.75V7.494zm1.28 10.158L12 13.068l4.36 4.584H7.64zM17.64 7.494v7.084l4.76 4.75v-6.84l-4.76-4.748v-.246z"/>
  </svg>
);

const SvgPortfolio = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const SvgWhatsApp = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.472 4.435 4.535-1.189zM8.232 7.801c-.225-.447-.643-.717-1.042-.733-1.115-.05-1.63 1.515-1.63 1.515s-1.011 2.844 1.53 5.373c2.542 2.528 5.372 1.53 5.372 1.53s1.565-.515 1.515-1.63c-.016-.4-.286-.818-.733-1.041-.447-.225-2.842-1.41-3.29-1.57-.447-.16-1.63-.515-1.63-.515s-.286-.4-.515-.818c-.229-.417-.114-.818.114-1.041.228-.223.4-.515.57-.743.17-.228.285-.4.4-.57s.228-.285.114-.514c-.114-.229-.417-1.115-.515-1.542s-.17-.343-.4-.343c-.228 0-.818.114-1.042.228z" />
  </svg>
);


const Footer = () => {
  const { t } = useTranslation();

  const navLinksData = t('footer.navLinks', { returnObjects: true });
  const solutionsLinksData = t('footer.solutionsLinks', { returnObjects: true });
  const contactInfoData = t('footer.contactInfo', { returnObjects: true });

  const navScrollLinks = [
    { key: 'home', to: 'hero' },
    { key: 'solutions', to: 'services' },
    // { key: 'subscriptions', to: 'subscription' }, 
    { key: 'packages', to: 'planos' },
    { key: 'projects', to: 'portfolio' },
    { key: 'contact', to: 'contact-form' },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          
          {/* Coluna 1: Logo e Social */}
          <div className="md:col-span-2 lg:col-span-2">
            <ScrollLink to="hero" smooth={true} duration={500} className="flex-shrink-0 flex items-center space-x-2 cursor-pointer">
              <img className="h-8 w-auto" src="/ICONE.png" alt={`${t('footer.companyName')} Icone`} />
              <span className="text-xl font-bold text-white">{t('footer.companyName')}</span>
            </ScrollLink>
            <p className="mt-4 text-base text-gray-500 max-w-xs">
              {t('footer.tagline')}
            </p>
            <p className="mt-4 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}>
            </p>
            {/* Ícones Sociais */}
            <div className="mt-6 flex space-x-5">
              <a href="https://www.linkedin.com/in/dev-luc4s/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="LinkedIn"><SvgLinkedIn /></a>
              <a href="https://github.com/K1oraN" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="GitHub"><SvgGitHub /></a>
              <a href="https://linktr.ee/K1oraN" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Linktree"><SvgLinktree /></a>
              <a href="https://laportifoio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Portfolio"><SvgPortfolio /></a>
              <a href={`https://wa.me/${contactInfoData.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="WhatsApp"><SvgWhatsApp /></a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{t('footer.navTitle')}</h3>
            <ul className="mt-4 space-y-3">
              {navScrollLinks.map(link => (
                <li key={link.key}>
                  <ScrollLink 
                    to={link.to} 
                    smooth={true} 
                    duration={500} 
                    offset={-80} 
                    className="text-base text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    {navLinksData[link.key]}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Soluções */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{t('footer.solutionsTitle')}</h3>
            <ul className="mt-4 space-y-3">
              {solutionsLinksData.map(solution => (
                 <li key={solution}>
                  <ScrollLink 
                    to="services" 
                    smooth={true} 
                    duration={500} 
                    offset={-80} 
                    className="text-base text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    {solution}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="mt-8 md:mt-0 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{t('footer.contactTitle')}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href={`mailto:${contactInfoData.email}`} className="text-base text-gray-500 hover:text-gray-300 break-all">{contactInfoData.email}</a></li>
              <li><a href={`https://wa.me/${contactInfoData.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-300">{contactInfoData.phone}</a></li>
              <li className="text-base text-gray-500">{contactInfoData.serviceType}</li>
              <li className="text-base text-gray-500">{contactInfoData.location}</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;