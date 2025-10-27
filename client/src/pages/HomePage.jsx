import React from 'react';
import MainLayout from '../layout/MainLayout';

// Seções da Landing Page
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Subscription from '../components/sections/Subscription'; // <-- 1. IMPORTE A NOVA SEÇÃO
import Plans from '../components/sections/Plans';
import Portfolio from '../components/sections/Portfolio'; 
import Process from '../components/sections/Process';         
import Testimonials from '../components/sections/Testimonials'; 
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';         
import Contact from '../components/sections/Contact';       

const HomePage = () => {
  return (
    <MainLayout>
      <title>AlphaDevs - Inovação Digital</title>
      <meta name="description" content="Oferecemos desde a criação de sites, apps e sistemas até manutenções dos softwares e hardwares, tudo em um só lugar." />
      
      {/* 2. ORDEM DE EXIBIÇÃO ATUALIZADA */}
      
      <Hero />
      <Services />      {/* Modelo 1: Projetos Sob Medida */}
      <Subscription />  {/* Modelo 2: Aluguel White Label */}
      <Plans />         {/* Modelo 3: Pacotes de Serviço */}
      <Portfolio /> 
      <Process />      
      <Testimonials /> 
      <FAQ />
      <CTA />
      <Contact />
      
    </MainLayout>
  );
};

export default HomePage;