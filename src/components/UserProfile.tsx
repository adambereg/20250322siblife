import React from 'react';
import { User } from '../types/auth';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, Settings, Bell, Calendar, MapPin, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { authState, logout } = useAuth();
  const { user } = authState;

  // Функция для получения полного URL аватара
  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return 'https://via.placeholder.com/150?text=Нет+фото';
    // Если это уже полный URL (начинается с http или https)
    if (avatarPath.startsWith('http')) return avatarPath;
    // Если это относительный путь с сервера
    return `http://localhost:5000${avatarPath}`;
  };

  if (!user) {
    return null;
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'participant':
        return 'bg-blue-100 text-blue-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'pro':
        return 'bg-green-100 text-green-800';
      case 'business':
        return 'bg-yellow-100 text-yellow-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'participant':
        return 'Соучастник';
      case 'vip':
        return 'VIP Соучастник';
      case 'pro':
        return 'PRO Соучастник';
      case 'business':
        return 'Бизнес-партнер';
      case 'admin':
        return 'Администратор';
      default:
        return role;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {/* Шапка профиля */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32 flex items-end">
        <div className="flex items-center px-6 pb-5">
          <div className="relative">
            <img 
              src={getAvatarUrl(user.avatar || '')} 
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
            <span className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-white ${user.role === 'vip' ? 'bg-purple-500' : user.role === 'pro' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
          </div>
          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getRoleBadgeColor(user.role)}`}>
                {getRoleTitle(user.role)}
              </span>
              <span className="text-xs text-white opacity-80 ml-2">На платформе с {formatDate(user.joinDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Основная информация */}
      <div className="p-6">
        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats?.events || 0}</div>
            <div className="text-xs text-gray-500 uppercase">Мероприятий</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{Array.isArray(user.followers) ? user.followers.length : 0}</div>
            <div className="text-xs text-gray-500 uppercase">Подписчиков</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.tokens || 0}</div>
            <div className="text-xs text-gray-500 uppercase">Токенов</div>
          </div>
        </div>

        {/* Навигация */}
        <div className="space-y-1 mb-6">
          <Link to="/profile/events" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <Calendar className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Мои события</span>
          </Link>
          <Link to="/profile/places" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <MapPin className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Избранные места</span>
          </Link>
          <Link to="/profile/market" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <ShoppingBag className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Маркетплейс</span>
          </Link>
          <Link to="/profile/network" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <Users className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Мое окружение</span>
          </Link>
          <Link to="/profile/notifications" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <Bell className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Уведомления</span>
          </Link>
          <Link to="/profile/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <Settings className="h-5 w-5 text-indigo-500 mr-3" />
            <span className="text-gray-700">Настройки</span>
          </Link>
        </div>
      </div>
      
      {/* Нижняя панель */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 