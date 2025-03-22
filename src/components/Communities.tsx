import React from 'react';
import { Users, Award, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Communities: React.FC = () => {
  const communities = [
    {
      id: 1,
      name: 'Активный Новосибирск',
      category: 'Спорт и здоровье',
      members: 2450,
      events: 12,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Центральный район'
    },
    {
      id: 2,
      name: 'Культурный код',
      category: 'Искусство и культура',
      members: 1830,
      events: 8,
      image: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Академгородок'
    },
    {
      id: 3,
      name: 'IT-Community NSK',
      category: 'Технологии',
      members: 3200,
      events: 15,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Технопарк'
    },
    {
      id: 4,
      name: 'Городские инициативы',
      category: 'Развитие города',
      members: 1650,
      events: 6,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Весь город'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Сообщества Новосибирска
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Присоединяйтесь к единомышленникам и делайте город лучше вместе
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-12 text-center">
          <Link
            to="/communities"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Все сообщества
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Communities;