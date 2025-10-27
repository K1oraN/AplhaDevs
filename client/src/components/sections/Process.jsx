import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

// Ícones (extraídos)
const icons = [
  // Planejamento
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // Design
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  // Desenvolvimento
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  // Lançamento
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
];


const Process = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation();

  // ***** 3. PEGA OS PASSOS DO JSON *****
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section id="process" className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <motion.h2 
            className="text-base font-semibold text-red-500 uppercase tracking-wider"
            {...fadeIn(0)}
          >
            {t('process.title')}
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            {...fadeIn(0.1)}
          >
            {t('process.subtitle')}
          </motion.p>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-400"
            {...fadeIn(0.2)}
          >
            {t('process.description')}
          </motion.p>
        </div>

        {/* Linha do Tempo / Grade do Processo */}
        <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              className="relative p-6 rounded-xl"
              {...fadeIn(index * 0.1 + 0.3)}
            >
              {/* Borda de fundo */}
              <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-xl border border-gray-800"></div>
              
              {/* Conteúdo */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-red-500">{step.number}</span>
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-red-600 text-white">
                    {icons[index]} {/* Pega o ícone correspondente */}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;