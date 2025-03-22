import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Home, Calendar } from 'lucide-react';
import type { HousingUnit } from '../data/housing';

interface HousingCardProps {
  housing: HousingUnit;
}

const HousingCard: React.FC<HousingCardProps> = ({ housing }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <Link to={`/housing/${housing.slug}`}>
        <div className="relative h-48">
          <img
            src={housing.images[0]}
            alt={housing.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-gray-800">
              {housing.subcategory}
            </span>
          </div>
          {housing.instantBook && (
            <div className="absolute bottom-4 left-4 bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-white">
                Мгновенное бронирование
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={housing.host.avatar}
            alt={housing.host.name}
            className="h-8 w-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{housing.host.name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1">{housing.host.rating}</span>
              <span className="mx-1">•</span>
              <span>{housing.host.reviews} отзывов</span>
            </div>
          </div>
        </div>

        <Link to={`/housing/${housing.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
            {housing.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4">
          {housing.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-sm">{housing.location.address}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Home className="h-5 w-5 mr-2" />
            <span className="text-sm">
              {housing.details.area} м² • {housing.details.rooms} комн.
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span className="text-sm">До {housing.details.maxGuests} гостей</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-sm">
              Заезд с {housing.rules.checkIn}, выезд до {housing.rules.checkOut}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold">{housing.price.amount} {housing.price.currency}</span>
              <span className="text-gray-500">/{housing.price.period}</span>
            </div>
            <Link
              to={`/housing/${housing.slug}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Забронировать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousingCard;