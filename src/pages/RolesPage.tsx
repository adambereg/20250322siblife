import React from 'react';
import RoleSelector from '../components/RoleSelector';
import { useNavigate } from 'react-router-dom';

const RolesPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <img 
            src="https://sun9-25.userapi.com/impg/WkkG4tc8r0AFvmiAZa7xDcw5cmf2WeMWw8LTpQ/nVnH44vhuck.jpg?size=893x134&quality=95&sign=cd4fdd7d3e63c63f719ec6caaa7d9122&type=album"
            alt="Siberia Life Logo"
            className="h-12 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Выберите свою роль в Siberia.Life
          </h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Каждая роль предоставляет разные возможности и привилегии на платформе. 
            Выберите роль, которая подходит именно вам.
          </p>
        </div>
        
        <RoleSelector />
        
        <div className="mt-12 text-center">
          <a 
            href="/register" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
          >
            Регистрация
          </a>
          <a 
            href="/login" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
          >
            Вход
          </a>
          <a 
            href="/" 
            className="mt-4 block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default RolesPage; 