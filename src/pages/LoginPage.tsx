import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (authState.isAuthenticated) {
      // Перенаправляем на соответствующую страницу в зависимости от роли
      switch (authState.user?.role) {
        case 'participant':
          navigate('/profile');
          break;
        case 'vip':
          navigate('/vip-profile');
          break;
        case 'pro':
          navigate('/pro-profile');
          break;
        case 'business':
          navigate('/business-profile');
          break;
        case 'admin':
          navigate('/admin-profile');
          break;
        default:
          navigate('/');
      }
    }
  }, [authState.isAuthenticated, authState.user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <img 
            src="https://sun9-25.userapi.com/impg/WkkG4tc8r0AFvmiAZa7xDcw5cmf2WeMWw8LTpQ/nVnH44vhuck.jpg?size=893x134&quality=95&sign=cd4fdd7d3e63c63f719ec6caaa7d9122&type=album"
            alt="Siberia Life Logo"
            className="h-12 mx-auto"
          />
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center">
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

export default LoginPage; 