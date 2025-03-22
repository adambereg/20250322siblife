import React from 'react';
import { Users, Crown, Star, Building2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserLevels: React.FC = () => {
  const navigate = useNavigate();
  
  const roles = [
    {
      title: 'Соучастник',
      icon: Users,
      description: 'Базовый аккаунт с доступом к основным функциям',
      path: '/profile'
    },
    {
      title: 'VIP-Соучастник',
      icon: Star,
      description: 'Расширенные возможности и привилегии',
      path: '/vip-profile'
    },
    {
      title: 'PRO-Соучастник',
      icon: Crown,
      description: 'Максимальные возможности и управление кланами',
      path: '/pro-profile'
    },
    {
      title: 'Бизнес-партнёр',
      icon: Building2,
      description: 'Специальный аккаунт для представителей бизнеса',
      path: '/business-profile'
    },
    {
      title: 'Администратор',
      icon: Shield,
      description: 'Полный доступ к управлению платформой',
      path: '/admin-profile'
    },
  ];

  const handleRoleClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Выберите тип входа</h2>
          <p className="mt-4 text-lg text-gray-600">
            Войдите в систему, используя один из доступных типов аккаунта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {roles.map((role) => (
            <button
              key={role.title}
              onClick={() => handleRoleClick(role.path)}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <role.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-sm text-gray-600 text-center">{role.description}</p>
              <div className="mt-6 w-full">
                <span className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg transition-colors duration-300">
                  Войти
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserLevels;