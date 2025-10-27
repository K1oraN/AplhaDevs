import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

const glassCard = "glass-card";

const Portfolio = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation();

  // ***** 3. PEGA OS PROJETOS DO JSON *****
  const projects = t('portfolio.projects', { returnObjects: true });

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <motion.h2 
            className="text-base font-semibold text-red-500 uppercase tracking-wider"
            {...fadeIn(0)}
          >
            {t('portfolio.title')}
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            {...fadeIn(0.1)}
          >
            {t('portfolio.subtitle')}
          </motion.p>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-400"
            {...fadeIn(0.2)}
          >
            {t('portfolio.description')}
          </motion.p>
        </div>

        {/* Grade de Projetos */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title} 
              className={`${glassCard} p-8 rounded-2xl shadow-xl flex flex-col`}
              {...fadeIn(index * 0.1 + 0.3)}
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-gray-400">{project.desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {/* As tecnologias (tech) não precisam de tradução */}
                {project.tech.map(t => (
                  <span 
                    key={t} 
                    className="inline-flex items-center bg-gray-800 text-red-400 font-medium px-3 py-1 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;