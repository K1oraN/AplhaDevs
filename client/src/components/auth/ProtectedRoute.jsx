import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Tenta buscar os dados do usuário no Local Storage
  const userInfo = localStorage.getItem('userInfo') 
                 ? JSON.parse(localStorage.getItem('userInfo')) 
                 : null;

  // 2. Verifica se o usuário está logado (se userInfo existe e tem um token)
  const isAuthenticated = userInfo && userInfo.token;

  // 3. Se estiver autenticado, renderiza o conteúdo da rota solicitada (<Outlet />)
  //    Se não estiver, redireciona para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;