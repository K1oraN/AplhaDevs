import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

const glassCard = "glass-card";

const Subscription = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation();

  // ***** 3. PEGA OS PLANOS DO JSON *****
  // (Encontra qual plano deve ser destacado)
  const subscriptionPlans = t('subscription.plans', { returnObjects: true });
  const popularPlanIndex = subscriptionPlans.findIndex(plan => plan.title === t('subscription.popularPlanTitle')); // Ex: "Catálogo E-commerce"

  return (
    <section id="subscription" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <motion.h2 className="text-base font-semibold text-red-500 uppercase tracking-wider" {...fadeIn(0)}>
            {t('subscription.title')} 
          </motion.h2>
          <motion.p className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight" {...fadeIn(0.1)}>
            {t('subscription.subtitle')}
          </motion.p>
          <motion.p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400" {...fadeIn(0.2)}>
            {t('subscription.description')}
          </motion.p>
        </div>

        {/* Grade de Planos de Assinatura */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {subscriptionPlans.map((plan, index) => {
            const isHighlighted = index === popularPlanIndex; // Verifica se este é o plano popular
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
                    {t('subscription.popularTag')}
                  </span>
                )}
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  <p className="mt-6 text-4xl font-extrabold text-white">
                    {plan.price}
                    <span className="text-base font-medium text-gray-400">{t('subscription.period')}</span>
                  </p>
                  <p className="mt-4 text-gray-400">{plan.desc}</p>
                </div>
                
                <ScrollLink 
                  to="contact-form" smooth={true} duration={500} offset={-80}
                  className={`mt-8 block w-full text-center rounded-lg px-6 py-3 text-base font-medium text-white cursor-pointer ${
                    isHighlighted
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {t('subscription.buttonText')}
                </ScrollLink>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Subscription;