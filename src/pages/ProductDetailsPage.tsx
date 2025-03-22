import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, MapPin, Calendar, Coins, ChevronLeft, Globe, Phone, Heart, Share2, MessageCircle } from 'lucide-react';
import { getProductBySlug, marketplaceCategories } from '../data/marketplace';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProductDetailsPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const product = getProductBySlug(productSlug || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/marketplace" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Вернуться в маркетплейс
          </Link>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Товар не найден</h1>
            <p className="mt-2 text-gray-600">
              К сожалению, запрашиваемый товар не существует или был удалён.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/marketplace" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Вернуться в маркетплейс
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image Gallery */}
              <div className="relative h-96">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedImage
                            ? 'bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                    {product.subcategory}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Heart className="h-6 w-6" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                    <span className="mx-1">•</span>
                    <span className="text-gray-500">{product.reviews} отзывов</span>
                  </div>
                  {product.type === 'product' && product.inStock && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600">В наличии: {product.inStock}</span>
                    </>
                  )}
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-600 whitespace-pre-line">{product.fullDescription}</p>
                </div>

                {product.location && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Расположение</h2>
                    <div className="h-64 rounded-lg overflow-hidden">
                      <MapContainer
                        center={product.location.coordinates}
                        zoom={15}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={product.location.coordinates}>
                          <Popup>
                            {product.location.name}<br/>
                            {product.location.address}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{product.seller.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{product.seller.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{product.seller.reviews} отзывов</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-bold">
                    {product.price.amount} {product.price.currency}
                  </span>
                  <div className="flex items-center text-indigo-600">
                    <Coins className="h-5 w-5 mr-1" />
                    <span className="font-medium">{product.price.sibt} SIBT</span>
                  </div>
                </div>

                {product.date && (
                  <div className="flex items-center text-gray-600 mt-4">
                    <Calendar className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Дата и время</p>
                      <p className="font-medium">{product.date.start}</p>
                    </div>
                  </div>
                )}

                {product.location && (
                  <div className="flex items-center text-gray-600 mt-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Место</p>
                      <p className="font-medium">{product.location.address}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  {product.type === 'product' ? 'Купить сейчас' : 'Забронировать'}
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Связаться с продавцом
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;