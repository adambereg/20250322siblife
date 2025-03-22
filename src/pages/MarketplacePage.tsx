import React, { useState } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marketplaceCategories, getFeaturedProducts, getRecommendedProducts, searchProducts } from '../data/marketplace';
import ProductCard from '../components/ProductCard';

const MarketplacePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = getFeaturedProducts();
  const recommendedProducts = getRecommendedProducts();

  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : recommendedProducts;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Маркетплейс</h1>
          <p className="text-xl text-gray-600">
            Товары и услуги от бизнес-партнёров и Соучастников
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск товаров и услуг..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Фильтры
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {marketplaceCategories.map((category) => (
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

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Популярные предложения</h2>
            <Link
              to="/marketplace/featured"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Все популярные
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? 'Результаты поиска' : 'Рекомендуемые предложения'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;