import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <img 
            src="https://sun9-25.userapi.com/impg/WkkG4tc8r0AFvmiAZa7xDcw5cmf2WeMWw8LTpQ/nVnH44vhuck.jpg?size=893x134&quality=95&sign=cd4fdd7d3e63c63f719ec6caaa7d9122&type=album"
            alt="Siberia Life Logo"
            className="h-12 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Создайте учетную запись
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            И станьте частью сибирского комьюнити
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="mt-8 text-center">
          <Link 
            to="/roles" 
            className="text-indigo-600 hover:text-indigo-800 font-medium mr-4"
          >
            Узнать о ролях
          </Link>
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 