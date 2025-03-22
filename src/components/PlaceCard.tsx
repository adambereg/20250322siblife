import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Phone, Globe } from 'lucide-react';
import type { Place } from '../data/places';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const formatSchedule = (schedule: Place['schedule']) => {
    if (schedule.weekdays === schedule.weekend) {
      return schedule.weekdays;
    }
    return `${schedule.weekdays} (Пн-Пт), ${schedule.weekend} (Сб-Вс)`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <Link to={`/places/${place.slug}`}>
        <div className="relative h-48">
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          {place.verified && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-indigo-600">
                Проверено
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/places/${place.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
            {place.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-gray-700">{place.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-gray-500">{place.reviews} отзывов</span>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {place.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-sm">{place.address}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span className="text-sm">{formatSchedule(place.schedule)}</span>
          </div>

          {place.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span className="text-sm">{place.phone}</span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <Globe className="h-5 w-5 mr-2" />
            <a
              href={`https://${place.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {place.website}
            </a>
          </div>
        </div>

        {place.priceRange && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Цены</span>
              <span className="font-medium">
                {place.priceRange.min === 0 ? 'Бесплатно' : `от ${place.priceRange.min} ${place.priceRange.currency}`}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex space-x-3">
          <Link
            to={`/places/${place.slug}`}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center"
          >
            Подробнее
          </Link>
          {place.upcomingEvents && place.upcomingEvents.length > 0 && (
            <Link
              to={`/places/${place.slug}#events`}
              className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-center"
            >
              События ({place.upcomingEvents.length})
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;