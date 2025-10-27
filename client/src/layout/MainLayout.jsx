import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Este componente serve como um "sanduíche"
// Ele coloca o Header no topo, o Footer embaixo,
// e o conteúdo da página (children) no meio.

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;