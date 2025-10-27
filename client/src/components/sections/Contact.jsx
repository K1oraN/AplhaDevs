import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORTAR

// (Helper de animação)
const fadeIn = (delay = 0) => ({ /* ... (código existente) */ });

const glassCard = "glass-card"; 

const Contact = () => {
  // ***** 2. INICIE O TRADUTOR *****
  const { t } = useTranslation();

  // ***** 3. PEGA AS OPÇÕES DO JSON *****
  const serviceOptions = t('contact.form.serviceOptions', { returnObjects: true });

  return (
    <section id="contact-form" className="py-20 lg:py-28"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Coluna 1: Informações */}
          <motion.div {...fadeIn(0)}>
            <h2 className="text-base font-semibold text-red-500 uppercase tracking-wider">
              {t('contact.title')}
            </h2>
            <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t('contact.subtitle')}
            </p>
            <p className="mt-4 max-w-xl text-lg text-gray-400">
              {t('contact.description')}
            </p>
            
            <div className="mt-10 space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-800 rounded-lg text-red-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{t('contact.emailLabel')}</h4>
                  <a href={`mailto:${t('footer.contactInfo.email')}`} className="text-gray-400 hover:text-red-400 transition-colors">
                    {t('footer.contactInfo.email')}
                  </a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-800 rounded-lg text-red-500">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">{/* WhatsApp SVG */}</svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{t('contact.whatsappLabel')}</h4>
                  <a href={`https://wa.me/${t('footer.contactInfo.phone').replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
                    {t('footer.contactInfo.phone')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna 2: Formulário */}
          <motion.div 
            className={`${glassCard} p-8 rounded-2xl shadow-xl`}
            {...fadeIn(0.2)}
          >
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('contact.form.nameLabel')}</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('contact.form.emailLabel')}</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300">{t('contact.form.serviceLabel')}</label>
                <select 
                  id="service" 
                  name="service"
                  className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                >
                  {serviceOptions.map(service => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t('contact.form.messageLabel')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-900 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                  placeholder={t('contact.form.messagePlaceholder')}
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:text-lg"
                >
                  {t('contact.form.submitButton')}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;