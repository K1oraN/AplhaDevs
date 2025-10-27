import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next'; 

// (Helper de animação)
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true }
});

const glassCard = "glass-card";

// ***** 1. CÓDIGO SVG COMPLETO DO ÍCONE DE CHECK *****
const CheckIcon = () => (
  <svg className="flex-shrink-0 h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
  </svg>
);

const Plans = () => {
  const { t } = useTranslation();

  const plans = t('packages.plans', { returnObjects: true });
  const popularPlanIndex = plans.findIndex(plan => plan.title === t('packages.popularPlanTitle')); 
  const customPriceText = t('packages.customPriceText');

  return (
    <section id="planos" className="py-20 lg:py-28 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <motion.h2 className="text-base font-semibold text-red-500 uppercase tracking-wider" {...fadeIn(0)}>
            {t('packages.title')}
          </motion.h2>
          <motion.p className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight" {...fadeIn(0.1)}>
            {t('packages.subtitle')}
          </motion.p>
          <motion.p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400" {...fadeIn(0.2)}>
            {t('packages.description')}
          </motion.p>
        </div>

        {/* Grade de Planos */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {plans.map((plan, index) => {
            const isHighlighted = index === popularPlanIndex;
            const isCustom = plan.price === customPriceText; 

            return (
              <motion.div 
                key={plan.title}
                className={`${glassCard} p-8 rounded-2xl shadow-xl flex flex-col relative ${
                  isHighlighted ? 'border-2 border-red-600' : 'border-2 border-transparent'
                }`}
                {...fadeIn(index * 0.1 + 0.3)}
              >
                {isHighlighted && (
                  <span className="absolute top-0 -mt-3 inline-flex items-center bg-red-600 text-white font-medium px-3 py-1 rounded-full text-sm left-1/2 -translate-x-1/2">
                    {t('packages.popularTag')}
                  </span>
                )}
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  <p className="mt-2 text-gray-400 text-sm">{plan.subtitle}</p>
                  <p className="mt-6 text-4xl font-extrabold text-white">
                    {plan.price}
                    {!isCustom && <span className="text-base font-medium text-gray-400">{t('packages.period')}</span>}
                  </p>
                  <ul className="mt-6 space-y-3 text-gray-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <ScrollLink 
                  to="contact-form" smooth={true} duration={500} offset={-80}
                  className={`mt-8 block w-full text-center rounded-lg px-6 py-3 text-base font-medium text-white cursor-pointer ${
                    isHighlighted
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {isCustom ? t('packages.buttonContact') : t('packages.buttonHire')}
                </ScrollLink>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Plans;