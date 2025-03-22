import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, Search, Filter, ChevronRight } from 'lucide-react';
import { eventCategories, events } from '../data/events';
import EventCalendar from '../components/EventCalendar';

const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">События Новосибирска</h1>
          <p className="text-xl text-gray-600">
            Найдите интересные мероприятия и развлечения
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск событий..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {viewMode === 'calendar' ? 'Показать списком' : 'Календарь'}
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {eventCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`flex items-center p-4 rounded-lg border transition-colors
                  ${category.id === selectedCategory
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                  }`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-10 h-10 rounded-lg object-cover mr-3"
                />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <EventCalendar events={filteredEvents} />
        ) : (
          <>
            {/* Featured Events */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Рекомендуемые события</h2>
                <Link
                  to="/events/featured"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  Все рекомендуемые
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.filter(event => event.recommended).map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-800">
                          {eventCategories.find(cat => cat.id === event.category)?.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span className="text-sm">{event.startDate}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span className="text-sm">{event.location.name}</span>
                        </div>

                        <div className="flex items-center justify-between text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            <span className="text-sm">{event.participants.going} участников</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{event.rating}</span>
                          </div>
                        </div>
                      </div>

                      {!event.price.free && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Стоимость</span>
                            <span className="font-medium">
                              от {event.price.min} ₽
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ближайшие события</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-gray-800">
                          {eventCategories.find(cat => cat.id === event.category)?.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span className="text-sm">{event.startDate}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span className="text-sm">{event.location.name}</span>
                        </div>

                        <div className="flex items-center justify-between text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            <span className="text-sm">{event.participants.going} участников</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{event.rating}</span>
                          </div>
                        </div>
                      </div>

                      {!event.price.free && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Стоимость</span>
                            <span className="font-medium">
                              от {event.price.min} ₽
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;