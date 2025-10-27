import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
// ***** 1. IMPORTE O HOOK DE TRADUÇÃO *****
import { useTranslation } from 'react-i18next'; 

// (Função helper de animação)
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }, 
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true } 
});

// (Classes CSS customizadas)
const heroCustomClasses = "hero-animated-bg";
const redGradient = "red-gradient-text";
const btnPulse = "btn-pulse";

const Hero = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation(); 

  return (
    <section id="hero" className={`relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden ${heroCustomClasses}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-primary-dark"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <motion.div {...fadeIn(0.1)}>
          <span className="inline-flex items-center bg-gray-800 text-red-400 font-medium px-4 py-1 rounded-full text-sm">
            {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
            {t('hero.since')} 
          </span>
        </motion.div>

        <motion.h1 
          className="mt-6 text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white"
          {...fadeIn(0.2)}
        >
          {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
          {t('hero.title')}
        </motion.h1>

        <motion.p 
          className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-400"
          {...fadeIn(0.3)}
        >
          {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          {...fadeIn(0.4)}
        >
          <ScrollLink 
            to="contact-form" 
            smooth={true} 
            duration={500} 
            offset={-80}
            className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:text-lg cursor-pointer ${btnPulse}`}
          >
            {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
            {t('hero.ctaButton')}
          </ScrollLink>
          <ScrollLink 
            to="services" 
            smooth={true} 
            duration={500} 
            offset={-80}
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-800 md:text-lg cursor-pointer"
          >
            {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
            {t('hero.servicesButton')}
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;