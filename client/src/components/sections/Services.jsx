import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

const glassCard = "glass-card";

// Ícones (extraídos para clareza)
const icons = {
  webDev: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-4.5 16.5" />,
  mobile: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
  saas: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5M12 3v18M12 21h-1.007a1.875 1.875 0 0 1-1.743-1.468l-0.69-3.096a1.875 1.875 0 0 0-1.743-1.468h-1.63a1.875 1.875 0 0 0-1.743 1.468L3.9 19.532A1.875 1.875 0 0 0 5.643 21H12Zm6 0h1.007a1.875 1.875 0 0 0 1.743-1.468l.69-3.096a1.875 1.875 0 0 1 1.743-1.468h1.63c.803 0 1.51.52 1.743 1.468l.69 3.096A1.875 1.875 0 0 1 18.357 21H18Z" />,
  aiData: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17.25l.038-.038A7.5 7.5 0 0112 15c1.528 0 2.948.46 4.212 1.212l.038.038m-8.4 0H12m0 0v.01m0-8.02v.01M15 9.75v.01M9 9.75v.01M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/>,
  infraSec: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.333 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />,
  maintenance: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83M11.42 15.17l.02.02M11.42 15.17 6.34 20.25M15.17 11.42 21 17.25M15.17 11.42l.02.02M15.17 11.42 20.25 6.34M6.34 20.25 2.1 16.01l5.83-5.83M6.34 20.25l-.02-.02M2.1 16.01 7.93 10.18M2.1 16.01l-.02-.02M7.93 10.18 10.18 7.93m-2.25 2.25.02.02m0 0 1.48 1.48m-1.5-1.5L8.28 9.14m1.9 1.9 1.48 1.48m0 0 .02.02m-1.5-1.5L12 11.72m1.9-1.9 1.48 1.48m0 0 .02.02" />,
  design: <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />,
  marketing: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></>,
  integrations: <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
};

// Componente de Card reutilizável
const ServiceCard = ({ icon, title, desc, price, delay }) => {
  return (
    <motion.div className={`${glassCard} p-8 rounded-2xl shadow-xl`} {...fadeIn(delay)}>
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-red-600 text-white">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-gray-400">{desc}</p>
      <p className="mt-4 text-lg font-semibold text-red-400">{price}</p>
    </motion.div>
  );
};

// Componente Principal da Seção
const Services = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation(); 

  // Mapeia os ícones às chaves do JSON
  const iconMap = [
    icons.webDev, icons.mobile, icons.saas, icons.aiData, icons.infraSec, 
    icons.maintenance, icons.design, icons.marketing, icons.integrations
  ];

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="text-center">
          <motion.h2 className="text-base font-semibold text-red-500 uppercase tracking-wider" {...fadeIn(0)}>
            {/* ***** 3. USE A CHAVE DE TRADUÇÃO ***** */}
            {t('services.title')} 
          </motion.h2>
          <motion.p className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight" {...fadeIn(0.1)}>
            {t('services.subtitle')}
          </motion.p>
          <motion.p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400" {...fadeIn(0.2)}>
            {t('services.description')}
          </motion.p>
        </div>
        
        {/* Grade de Serviços */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* ***** 3. MAPEIE AS CATEGORIAS DO JSON ***** */}
          {t('services.categories', { returnObjects: true }).map((service, i) => (
            <ServiceCard 
              key={service.title} 
              icon={iconMap[i]} // Pega o ícone correspondente
              title={service.title} 
              desc={service.desc}
              price={t('services.price')} // Preço "Sob Consulta"
              delay={i * 0.05 + 0.3} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;