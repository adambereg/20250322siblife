import React from 'react';
import { MapPin, Coffee, Ticket, Camera, Trees as Tree, Building } from 'lucide-react';

const CityGuide: React.FC = () => {
  const places = [
    {
      title: 'Культурные места',
      icon: Camera,
      description: 'Театры, музеи, галереи и концертные площадки',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Развлечения',
      icon: Ticket,
      description: 'Кинотеатры, развлекательные центры и клубы',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Парки и скверы',
      icon: Tree,
      description: 'Зелёные зоны для отдыха и прогулок',
      image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Кафе и рестораны',
      icon: Coffee,
      description: 'Лучшие заведения города',
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Достопримечательности',
      icon: Building,
      description: 'Знаковые места и архитектура',
      image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Популярные места',
      icon: MapPin,
      description: 'Самые посещаемые локации',
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Путеводитель по Новосибирску
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Каталог мест и локаций
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <div
              key={place.title}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <place.icon className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">{place.title}</h3>
                </div>
                <p className="text-sm text-gray-200">{place.description}</p>
                <button className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20 transition-colors">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition-colors">
            Показать все места
          </button>
        </div>
      </div>
    </section>
  );
};

export default CityGuide;