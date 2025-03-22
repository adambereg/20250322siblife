import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Coins } from 'lucide-react';
import type { Product } from '../data/marketplace';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <Link to={`/marketplace/${product.slug}`}>
        <div className="relative h-48">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-gray-800">
              {product.subcategory}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className="h-8 w-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{product.seller.name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1">{product.seller.rating}</span>
              <span className="mx-1">•</span>
              <span>{product.seller.reviews} отзывов</span>
            </div>
          </div>
        </div>

        <Link to={`/marketplace/${product.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4">
          {product.description}
        </p>

        {product.location && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-sm">{product.location.name}</span>
          </div>
        )}

        {product.date && (
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-sm">{product.date.start}</span>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-xl">{product.price.amount} {product.price.currency}</span>
              <span className="text-gray-500">или</span>
              <div className="flex items-center text-indigo-600">
                <Coins className="h-4 w-4 mr-1" />
                <span>{product.price.sibt} SIBT</span>
              </div>
            </div>
            {product.type === 'product' && product.inStock && (
              <span className="text-sm text-gray-500">
                В наличии: {product.inStock}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            {product.type === 'product' ? 'Купить' : 'Забронировать'}
          </button>
          <Link
            to={`/marketplace/${product.slug}`}
            className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-center"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;