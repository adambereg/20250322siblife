import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { authState } = useAuth();
  const { isAuthenticated, user, loading } = authState;

  // Если идет загрузка, показываем индикатор загрузки
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Если указаны разрешенные роли и роль пользователя не входит в список,
  // перенаправляем на страницу с ошибкой доступа
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // Если все проверки пройдены, рендерим дочерние компоненты
  return <Outlet />;
};

export default PrivateRoute; 