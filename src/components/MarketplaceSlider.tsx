import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';

// Extended product data
const extendedProducts = [
  {
    id: 1,
    slug: 'master-class-coffee',
    name: 'Мастер-класс по кофе',
    category: 'business-services',
    subcategory: 'Мастер-классы',
    seller: {
      id: 'coffee-lab',
      name: 'Coffee Lab',
      avatar: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.9,
      reviews: 89,
      description: 'Школа бариста и кофейня'
    },
    description: 'Погружение в мир specialty кофе',
    images: ['https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 3500,
      sibt: 350,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 15,
    specialOffer: false,
    rating: 4.9,
    reviews: 42
  },
  {
    id: 2,
    slug: 'urban-fest-tshirt',
    name: 'Футболка Urban Fest 2025',
    category: 'merchandise',
    subcategory: 'Одежда',
    seller: {
      id: 'urban-team',
      name: 'Urban Team',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.8,
      reviews: 156
    },
    description: 'Лимитированная коллекция',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 2500,
      sibt: 250,
      currency: '₽'
    },
    type: 'product',
    featured: true,
    discount: 0,
    specialOffer: true,
    rating: 4.8,
    reviews: 28
  },
  {
    id: 3,
    slug: 'photo-session',
    name: 'Фотосессия в студии',
    category: 'services',
    subcategory: 'Фотография',
    seller: {
      id: 'photo-studio',
      name: 'Art Studio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.7,
      reviews: 124
    },
    description: 'Профессиональная съемка',
    images: ['https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 5000,
      sibt: 500,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 20,
    specialOffer: false,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    slug: 'yoga-class',
    name: 'Месяц йоги',
    category: 'sports',
    subcategory: 'Фитнес',
    seller: {
      id: 'yoga-studio',
      name: 'Yoga Life',
      avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 5.0,
      reviews: 76
    },
    description: 'Абонемент на месяц занятий',
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 4500,
      sibt: 450,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 0,
    specialOffer: true,
    rating: 5.0,
    reviews: 45
  },
  {
    id: 5,
    slug: 'city-guide',
    name: 'Экскурсия по городу',
    category: 'tourism',
    subcategory: 'Экскурсии',
    seller: {
      id: 'city-guides',
      name: 'City Guides',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.9,
      reviews: 112
    },
    description: 'Авторская экскурсия',
    images: ['https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 1500,
      sibt: 150,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 10,
    specialOffer: false,
    rating: 4.9,
    reviews: 67
  },
  {
    id: 6,
    slug: 'art-prints',
    name: 'Авторские принты',
    category: 'art',
    subcategory: 'Картины',
    seller: {
      id: 'art-gallery',
      name: 'Art Gallery',
      avatar: 'https://images.unsplash.com/photo-1525550557089-27c1bfedd06c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.8,
      reviews: 94
    },
    description: 'Коллекция городских пейзажей',
    images: ['https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 3000,
      sibt: 300,
      currency: '₽'
    },
    type: 'product',
    featured: true,
    discount: 0,
    specialOffer: true,
    rating: 4.8,
    reviews: 34
  },
  {
    id: 7,
    slug: 'cooking-class',
    name: 'Кулинарный мастер-класс',
    category: 'food',
    subcategory: 'Мастер-классы',
    seller: {
      id: 'cooking-school',
      name: 'Cooking School',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.7,
      reviews: 156
    },
    description: 'Секреты итальянской кухни',
    images: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 4000,
      sibt: 400,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 25,
    specialOffer: false,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 8,
    slug: 'concert-tickets',
    name: 'Билеты на концерт',
    category: 'entertainment',
    subcategory: 'Концерты',
    seller: {
      id: 'ticket-office',
      name: 'Ticket Office',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.9,
      reviews: 234
    },
    description: 'Живой концерт в центре города',
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 2000,
      sibt: 200,
      currency: '₽'
    },
    type: 'product',
    featured: true,
    discount: 0,
    specialOffer: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 9,
    slug: 'spa-day',
    name: 'День в спа',
    category: 'wellness',
    subcategory: 'Спа и массаж',
    seller: {
      id: 'spa-center',
      name: 'Spa Center',
      avatar: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.8,
      reviews: 178
    },
    description: 'Полный день релаксации',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 6000,
      sibt: 600,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 30,
    specialOffer: false,
    rating: 4.8,
    reviews: 123
  },
  {
    id: 10,
    slug: 'bike-rental',
    name: 'Аренда велосипеда',
    category: 'sports',
    subcategory: 'Прокат',
    seller: {
      id: 'bike-rental',
      name: 'Bike Rental',
      avatar: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.6,
      reviews: 145
    },
    description: 'Прокат городского велосипеда',
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    price: {
      amount: 800,
      sibt: 80,
      currency: '₽'
    },
    type: 'service',
    featured: true,
    discount: 0,
    specialOffer: true,
    rating: 4.6,
    reviews: 89
  }
];

const MarketplaceSlider: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(extendedProducts.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleProducts = extendedProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Маркетплейс
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Товары и услуги от бизнес-партнёров и Соучастников
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 z-10"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextPage}
                className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 z-10"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-5 gap-4">
            {visibleProducts.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-48">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      -{product.discount}%
                    </div>
                  )}
                  {/* Special Offer Badge */}
                  {product.specialOffer && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      Акция
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{product.reviews} отзывов</span>
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="mt-2">
                    <div className="text-lg font-bold text-gray-900">
                      {product.price.amount} {product.price.currency}
                    </div>
                    <div className="text-sm text-indigo-600">
                      {product.price.sibt} SIBT
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    {product.type === 'product' ? 'Купить' : 'Забронировать'}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/marketplace"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Все товары и услуги
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSlider;