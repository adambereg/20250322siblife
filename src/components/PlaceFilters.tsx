import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import type { PlaceCategory } from '../data/places';

interface PlaceFiltersProps {
  categories: PlaceCategory[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: () => void;
  isMapView: boolean;
}

const PlaceFilters: React.FC<PlaceFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
  onViewModeChange,
  isMapView
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Поиск мест..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onViewModeChange}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
          >
            <MapPin className="h-5 w-5 mr-2" />
            {isMapView ? 'Показать списком' : 'Показать на карте'}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Фильтры
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id === selectedCategory ? null : category.id)}
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
  );
};