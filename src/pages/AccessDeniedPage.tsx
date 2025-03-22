import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { user } = authState;

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto text-center">
        <Shield className="h-24 w-24 text-red-500 mx-auto" />
        
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Доступ запрещен
        </h1>
        
        <p className="mt-2 text-base text-gray-600">
          У вас нет достаточных прав для доступа к этой странице.
        </p>
        
        {user && (
          <div className="mt-4 text-sm text-gray-600">
            Вы вошли как <span className="font-semibold">{user.name}</span> с ролью{' '}
            <span className="font-semibold capitalize">{user.role}</span>.
          </div>
        )}
        
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={goBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться назад
          </button>
          
          <button
            onClick={goToHome}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            На главную
          </button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          Если вы считаете, что это ошибка, пожалуйста, свяжитесь с администратором.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage; 