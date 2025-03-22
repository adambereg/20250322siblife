import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Calendar, MapPin, Users, Star, ChevronLeft, Globe, Phone, Heart, Share2, Ticket } from 'lucide-react';
import { getEventBySlug, eventCategories } from '../data/events';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EventDetailsPage: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const event = getEventBySlug(eventSlug || '');

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/events" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Вернуться к списку событий
          </Link>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Событие не найдено</h1>
            <p className="mt-2 text-gray-600">
              К сожалению, запрашиваемое событие не существует или было удалено.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link to="/events" className="flex items-center text-white mb-4 hover:text-gray-200">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Назад к списку событий
            </Link>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">{event.rating}</span>
                <span className="mx-2">•</span>
                <span>{event.reviews} отзывов</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                {eventCategories.find(cat => cat.id === event.category)?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">О событии</h2>
              <p className="text-gray-600 whitespace-pre-line">{event.fullDescription}</p>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Организатор</h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{event.organizer.name}</h4>
                    <p className="text-gray-600 text-sm">{event.organizer.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.organizer.followers} подписчиков</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.organizer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Место проведения</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={event.location.coordinates}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={event.location.coordinates}>
                    <Popup>
                      {event.location.name}<br/>
                      {event.location.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Дата и время</p>
                    <p className="font-medium">{event.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Место</p>
                    <p className="font-medium">{event.location.address}</p>
                  </div>
                </div>
                {event.organizer.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Сайт</p>
                      <a
                        href={`https://${event.organizer.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        {event.organizer.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {event.tickets && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Билеты</h3>
                  <div className="space-y-4">
                    {event.tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                            <p className="text-sm text-gray-600">{ticket.description}</p>
                          </div>
                          <span className="font-bold">{ticket.price} ₽</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Осталось: {ticket.available - ticket.sold}
                        </div>
                        <button className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                          <Ticket className="h-4 w-4 mr-2" />
                          Купить билет
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Я пойду
                </button>
                <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  Поделиться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;