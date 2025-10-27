import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll'; 
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

const gridPattern = "hero-grid-pattern"; 

const CTA = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation();

  return (
    <section id="contact" className={`py-20 lg:py-28 ${gridPattern}`}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl lg:text-4xl font-extrabold text-white"
          {...fadeIn(0)}
        >
          {t('cta.title')}
        </motion.h2>
        <motion.p 
          className="mt-6 text-lg text-gray-400"
          {...fadeIn(0.1)}
        >
          {t('cta.description')}
        </motion.p>
        <motion.div 
          className="mt-10"
          {...fadeIn(0.2)}
        >
          <ScrollLink 
            to="contact-form" 
            smooth={true} 
            duration={500} 
            offset={-80}
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all transform hover:scale-105 cursor-pointer"
          >
            {t('cta.buttonText')}
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;