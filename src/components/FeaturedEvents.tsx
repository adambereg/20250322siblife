import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const FeaturedEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Фестиваль уличной культуры',
      date: '15 мая 2025',
      location: 'Михайловская набережная',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Выставка современного искусства',
      date: '20 мая 2025',
      location: 'Центр культуры и отдыха',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'Городской марафон',
      date: '1 июня 2025',
      location: 'Площадь Ленина',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            События
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Ближайшие мероприятия
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={event.image}
                    alt={event.title}
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{event.date}</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{event.location}</p>
                  </div>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;