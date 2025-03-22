import React from 'react';
import { Link } from 'react-router-dom';
import { User, Crown, Award, Building2, Shield } from 'lucide-react';

// Интерфейс для типов ролей
interface RoleOption {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  buttonText: string;
  path: string;
}

const RoleSelector: React.FC = () => {
  // Массив данных о ролях пользователей
  const roles: RoleOption[] = [
    {
      icon: User,
      title: 'Соучастник',
      description: 'Базовый аккаунт с доступом к основным функциям платформы',
      benefits: [
        'Комментарии и отзывы',
        'Участие в обсуждениях',
        'Бесплатная реферальная программа',
        'Получение токенов за активность'
      ],
      color: 'indigo',
      buttonText: 'Войти',
      path: '/login?role=participant'
    },
    {
      icon: Crown,
      title: 'VIP-Соучастник',
      description: 'Расширенные возможности и привилегии на платформе',
      benefits: [
        'Все возможности Соучастника',
        'Вознаграждения за активность привлечённых пользователей',
        'Возможность тратить токены на услуги',
        'Приоритетные уведомления о событиях'
      ],
      color: 'purple',
      buttonText: 'Войти',
      path: '/login?role=vip'
    },
    {
      icon: Award,
      title: 'PRO-Соучастник',
      description: 'Максимальные возможности и управление кланами',
      benefits: [
        'Все возможности VIP-Соучастника',
        'Создание и управление кланами',
        'Монетизация маршрутов и мероприятий',
        'Конвертация токенов в реальные деньги'
      ],
      color: 'amber',
      buttonText: 'Войти',
      path: '/login?role=pro'
    },
    {
      icon: Building2,
      title: 'Бизнес-партнёр',
      description: 'Специальный аккаунт для представителей бизнеса',
      benefits: [
        'Размещение товаров и услуг на маркетплейсе',
        'Продвижение мероприятий и акций',
        'Взаимодействие с клиентами через платформу',
        'Партнёрские программы и статистика'
      ],
      color: 'emerald',
      buttonText: 'Войти',
      path: '/login?role=business'
    },
    {
      icon: Shield,
      title: 'Администратор',
      description: 'Полный доступ к управлению платформой',
      benefits: [
        'Управление пользователями',
        'Управление контентом сайта',
        'Модерация и статистика',
        'Полный административный доступ'
      ],
      color: 'rose',
      buttonText: 'Войти',
      path: '/login?role=admin'
    }
  ];

  // Функция для определения цвета карточки роли
  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string, border: string, text: string, hover: string }> = {
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-600',
        hover: 'hover:bg-indigo-100'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-100'
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-600',
        hover: 'hover:bg-amber-100'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-600',
        hover: 'hover:bg-emerald-100'
      },
      rose: {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        text: 'text-rose-600',
        hover: 'hover:bg-rose-100'
      }
    };
    
    return colors[color] || colors.indigo;
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Выберите тип входа</h2>
      <p className="text-center text-gray-600 mb-8">
        Войдите в систему, используя один из доступных типов аккаунта
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => {
          const colorClass = getColorClass(role.color);
          
          return (
            <div 
              key={index}
              className={`rounded-xl border p-6 flex flex-col transition-all ${colorClass.bg} ${colorClass.border} ${colorClass.hover}`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full ${colorClass.bg} mr-3`}>
                  <role.icon className={`h-7 w-7 ${colorClass.text}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{role.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                {role.description}
              </p>
              
              <ul className="mb-6 space-y-2 flex-grow">
                {role.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className={`h-5 w-5 ${colorClass.text} mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={role.path}
                className={`mt-auto py-2 px-4 rounded-lg border border-transparent text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-center ${
                  role.color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' :
                  role.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' :
                  role.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' :
                  role.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500' :
                  'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
                }`}
              >
                {role.buttonText}
              </Link>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Ещё нет аккаунта?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelector; 