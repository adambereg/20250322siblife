import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';
import { Calendar, Bell, Star, MessageCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Левая колонка - профиль пользователя */}
          <div className="md:col-span-1">
            <UserProfile className="mb-6" />
            
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Информация о токенах</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Доступно токенов:</span>
                <span className="font-medium">{user.tokens || 0}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Уровень участия:</span>
                <span className="font-medium">{Math.floor((user.tokens || 0) / 100)} ур.</span>
              </div>
              <a 
                href="/marketplace/tokens"
                className="block w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Получить больше токенов
              </a>
            </div>
          </div>
          
          {/* Центральная и правая колонка - контент */}
          <div className="md:col-span-2">
            {/* Ближайшие мероприятия */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Ближайшие мероприятия</h2>
                <a href="/profile/events" className="text-sm text-indigo-600 hover:text-indigo-900">Смотреть все</a>
              </div>
              
              {/* Список мероприятий */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <Calendar className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">Встреча местного сообщества #{item}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(2023, 3 + item, 10 + item * 2).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800">
                          Подтверждено
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Star className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Рекомендуемые места */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Рекомендуемые места</h2>
                <a href="/places" className="text-sm text-indigo-600 hover:text-indigo-900">Показать все</a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <img 
                      src={`https://source.unsplash.com/random/300x200?city,siberia,${item}`} 
                      alt="Место" 
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">Интересное место #{item}</h3>
                      <p className="text-sm text-gray-500 mt-1">Новосибирск</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-xs ml-1">4.{item}</span>
                        </div>
                        <span className="text-xs text-gray-500">{20 + item * 10} отзывов</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Активность в сообществе */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Активность в сообществе</h2>
                <a href="/community" className="text-sm text-indigo-600 hover:text-indigo-900">Перейти в сообщество</a>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${20 + item}.jpg`} 
                        alt="User" 
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Пользователь #{item}</p>
                      <p className="text-sm text-gray-500">
                        Опубликовал новую запись в сообществе "Сибирские встречи"
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-indigo-600">
                          <Star className="h-4 w-4 mr-1" />
                          <span className="text-xs">{5 * item}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-indigo-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">{3 * item}</span>
                        </button>
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(2023, 5, 24 - item).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;