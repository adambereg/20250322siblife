import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, Clock, Phone, Globe, Navigation, ChevronLeft, Camera, Coffee, Ticket, MapPin, Calendar } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { places } from '../data/places';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const transportIcons = {
  metro: Ticket,
  bus: Navigation,
  car: Coffee,
};

const PlaceDetailsPage: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const place = places[placeId as keyof typeof places];

  const formatSchedule = (schedule: typeof place.schedule) => {
    if (schedule.weekdays === schedule.weekend) {
      return schedule.weekdays;
    }
    return `${schedule.weekdays} (Пн-Пт), ${schedule.weekend} (Сб-Вс)`;
  };

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/places" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Вернуться к списку мест
          </Link>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Место не найдено</h1>
            <p className="mt-2 text-gray-600">
              К сожалению, запрашиваемое место не существует или было удалено.
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
          src={place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link to="/places" className="flex items-center text-white mb-4 hover:text-gray-200">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Назад к списку мест
            </Link>
            <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">{place.rating}</span>
                <span className="mx-2">•</span>
                <span>{place.reviews} отзывов</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                {place.category}
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
              <h2 className="text-2xl font-bold mb-4">О месте</h2>
              <p className="text-gray-600 whitespace-pre-line">{place.fullDescription}</p>

              {place.features && place.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3">Особенности</h3>
                  <div className="flex flex-wrap gap-2">
                    {place.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {place.howToGet && place.howToGet.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Как добраться</h2>
                <div className="space-y-4">
                  {place.howToGet.map((transport, index) => {
                    const Icon = transportIcons[transport.type as keyof typeof transportIcons] || MapPin;
                    return (
                      <div key={index} className="flex items-start">
                        <Icon className="h-6 w-6 text-indigo-600 mt-1 mr-3" />
                        <div>
                          <p className="font-medium">{transport.description}</p>
                          <p className="text-gray-600 text-sm">{transport.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {place.upcomingEvents && place.upcomingEvents.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Предстоящие события</h2>
                <div className="space-y-4">
                  {place.upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                      <Calendar className="h-6 w-6 text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.date}</p>
                        <span className="inline-block mt-2 text-sm text-indigo-600 font-medium">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Расположение</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={place.coordinates}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={place.coordinates}>
                    <Popup>
                      {place.name}<br/>
                      {place.address}
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
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Режим работы</p>
                    <p className="font-medium">{formatSchedule(place.schedule)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Адрес</p>
                    <p className="font-medium">{place.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Телефон</p>
                    <p className="font-medium">{place.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Сайт</p>
                    <a
                      href={`https://${place.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {place.website}
                    </a>
                  </div>
                </div>
              </div>

              {place.priceRange && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Цены</span>
                    <span className="font-medium">
                      {place.priceRange.min === 0 
                        ? 'Бесплатно' 
                        : `от ${place.priceRange.min} ${place.priceRange.currency}`}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col space-y-3">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Построить маршрут
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  Поделиться
                </button>
              </div>
            </div>

            {place.nearbyPlaces && place.nearbyPlaces.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                <h3 className="text-lg font-bold mb-4">Что поблизости</h3>
                <div className="space-y-4">
                  {place.nearbyPlaces.map((nearby, index) => {
                    const Icon = nearby.type === 'park' ? Coffee : Camera;
                    return (
                      <div key={index} className="flex items-start">
                        <Icon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="font-medium">{nearby.name}</p>
                          <p className="text-sm text-gray-600">{nearby.distance}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;