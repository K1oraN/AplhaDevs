import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// (Helper de animação)
const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
    viewport: { once: true }
});

// Componente Acordeão (sem mudanças)
const FaqItem = ({ question, answer, delay }) => (
    <motion.div
        className="border-b border-gray-800"
        {...fadeIn(delay)}
    >
        <details className="group py-6">
            <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-lg font-medium text-white group-hover:text-red-400 transition-colors">
                    {question}
                </span>
                <span className="text-red-500 transform transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
            </summary>
            <p className="text-gray-400 mt-4 text-base leading-relaxed"
               dangerouslySetInnerHTML={{ __html: answer.replace(/(\S+@\S+)/g, '<a href="mailto:$1" class="text-red-400 hover:underline">$1</a>').replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-red-400 hover:underline">$1</a>') }}
            >
            </p>
        </details>
    </motion.div>
);

const FAQ = () => {
    const { t } = useTranslation();

    // ***** MUDANÇA AQUI: Pegar o objeto inteiro *****
    const faqData = t('faq', { returnObjects: true });
    // Certifique-se de que 'questions' é realmente um array
    const faqs = Array.isArray(faqData.questions) ? faqData.questions : [];

    // Log para depuração (opcional, remova depois)
    console.log('FAQ Data:', faqData);


    return (
        <section id="faq" className="py-20 lg:py-28 bg-gray-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Título da Seção */}
                <div className="text-center">
                    <motion.h2
                        className="text-base font-semibold text-red-500 uppercase tracking-wider"
                        {...fadeIn(0)}
                    >
                        {/* ***** Acessar a propriedade do objeto ***** */}
                        {faqData.title}
                    </motion.h2>
                    <motion.p
                        className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                        {...fadeIn(0.1)}
                    >
                        {/* ***** Acessar a propriedade do objeto ***** */}
                        {faqData.subtitle}
                    </motion.p>
                </div>

                {/* Lista de Perguntas */}
                <div className="mt-12 max-w-3xl mx-auto">
                    {/* ***** Usar o array 'faqs' ***** */}
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            delay={index * 0.05 + 0.2}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQ;