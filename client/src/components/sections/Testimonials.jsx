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

const Testimonials = () => {
    const { t } = useTranslation();

    // ***** MUDANÇA AQUI: Pegar o objeto inteiro *****
    const testimonialsData = t('testimonials', { returnObjects: true });
    // Certifique-se de que 'stats' é realmente um array
    const stats = Array.isArray(testimonialsData.stats) ? testimonialsData.stats : [];

    // Log para depuração (opcional, remova depois)
    console.log('Testimonials Data:', testimonialsData);

    return (
        <section id="testimonials" className="py-20 lg:py-28 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Título */}
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl lg:text-4xl font-extrabold text-white"
                        {...fadeIn(0)}
                    >
                        {/* ***** Acessar a propriedade do objeto ***** */}
                        {testimonialsData.title}
                    </motion.h2>
                    <motion.p
                        className="mt-6 text-lg text-gray-400"
                        {...fadeIn(0.1)}
                    >
                        {/* ***** Acessar a propriedade do objeto ***** */}
                        {testimonialsData.description}
                    </motion.p>
                </div>

                {/* Grade de Métricas */}
                <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* ***** Usar o array 'stats' ***** */}
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center p-4"
                            {...fadeIn(index * 0.1 + 0.2)}
                        >
                            <p className={`text-5xl lg:text-6xl font-extrabold red-gradient-text`}>
                                {stat.value}
                            </p>
                            <p className="mt-2 text-base font-medium text-gray-400 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;