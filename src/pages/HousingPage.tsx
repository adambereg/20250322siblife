import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { housingCategories, getFeaturedHousing, getRecommendedHousing, searchHousing } from '../data/housing';
import HousingCard from '../components/HousingCard';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HousingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);

  const featuredHousing = getFeaturedHousing();
  const recommendedHousing = getRecommendedHousing();

  const filteredHousing = searchQuery
    ? searchHousing(searchQuery)
    : selectedCategory
    ? recommendedHousing.filter(unit => unit.category === selectedCategory)
    : recommendedHousing;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Жильё в Новосибирске</h1>
          <p className="text-xl text-gray-600">
            Найдите идеальное место для проживания
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск жилья..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowMap(!showMap)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
              >
                <Layers className="h-5 w-5 mr-2" />
                {showMap ? 'Показать список' : 'Показать карту'}
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {housingCategories.map((category) => (
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

        {showMap ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-[800px] w-full">
              <MapContainer
                center={[55.0302, 82.9274]}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredHousing.map((unit) => (
                  <Marker key={unit.id} position={unit.location.coordinates}>
                    <Popup>
                      <div className="p-2">
                        <div className="relative h-32 mb-2">
                          <img
                            src={unit.images[0]}
                            alt={unit.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                            <span className="text-xs font-medium text-gray-800">
                              {unit.subcategory}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{unit.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{unit.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {unit.price.amount} {unit.price.currency}/{unit.price.period}
                          </span>
                          <Link
                            to={`/housing/${unit.slug}`}
                            className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                          >
                            Подробнее
                          </Link>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Housing */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Популярные варианты</h2>
                <Link
                  to="/housing/featured"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  Все популярные
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredHousing.map((housing) => (
                  <HousingCard key={housing.id} housing={housing} />
                ))}
              </div>
            </div>

            {/* All Housing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery ? 'Результаты поиска' : 'Рекомендуемые варианты'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHousing.map((housing) => (
                  <HousingCard key={housing.id} housing={housing} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HousingPage;