import React from 'react';
import { Users, Award, MapPin, Calendar, Search, Filter } from 'lucide-react';

const CommunitiesPage: React.FC = () => {
  const categories = [
    'Все', 'Спорт и здоровье', 'Искусство и культура', 
    'Технологии', 'Развитие города', 'Образование', 'Экология'
  ];

  const communities = [
    {
      id: 1,
      name: 'Активный Новосибирск',
      category: 'Спорт и здоровье',
      members: 2450,
      events: 12,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Центральный район',
      description: 'Сообщество для любителей активного образа жизни и спорта'
    },
    {
      id: 2,
      name: 'Культурный код',
      category: 'Искусство и культура',
      members: 1830,
      events: 8,
      image: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Академгородок',
      description: 'Объединение творческих людей и ценителей искусства'
    },
    {
      id: 3,
      name: 'IT-Community NSK',
      category: 'Технологии',
      members: 3200,
      events: 15,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Технопарк',
      description: 'Сообщество IT-специалистов и энтузиастов технологий'
    },
    {
      id: 4,
      name: 'Городские инициативы',
      category: 'Развитие города',
      members: 1650,
      events: 6,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Весь город',
      description: 'Платформа для развития городских проектов и инициатив'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Сообщества Новосибирска</h1>
          <p className="text-xl text-gray-600">
            Найдите единомышленников и присоединяйтесь к интересным проектам
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск сообществ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-800">
                    {community.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {community.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {community.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-sm">{community.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="text-sm">{community.members}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span className="text-sm">{community.events} событий</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Вступить
                  </button>
                  <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;