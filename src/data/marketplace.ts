import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface MarketplaceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  type: 'business' | 'participant';
  level?: 'pro' | 'vip' | 'regular';
  rating: number;
  reviews: number;
  description: string;
  website?: string;
  social?: {
    vk?: string;
    telegram?: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  seller: Seller;
  description: string;
  fullDescription: string;
  images: string[];
  price: {
    amount: number;
    sibt: number;
    currency: string;
  };
  rating: number;
  reviews: number;
  type: 'product' | 'service' | 'event' | 'route' | 'accommodation';
  featured: boolean;
  recommended: boolean;
  inStock?: number;
  location?: {
    name: string;
    address: string;
    coordinates: [number, number];
  };
  date?: {
    start: string;
    end?: string;
  };
}

export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: 'business-products',
    name: 'Товары от бизнес-партнёров',
    icon: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Мерч заведений',
      'Продукты питания',
      'Подарочные сертификаты'
    ]
  },
  {
    id: 'business-services',
    name: 'Услуги от бизнес-партнёров',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Бронирование столиков',
      'SPA и фитнес',
      'Мастер-классы'
    ]
  },
  {
    id: 'participant-products',
    name: 'Товары от Соучастников',
    icon: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Авторские изделия',
      'Мерч платформы',
      'Цифровые товары'
    ]
  },
  {
    id: 'participant-services',
    name: 'Услуги от Соучастников',
    icon: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Услуги гидов',
      'Организация мероприятий',
      'Экспертные услуги'
    ]
  },
  {
    id: 'routes',
    name: 'Маршруты и экскурсии',
    icon: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Авторские маршруты',
      'Городские квесты',
      'Тематические туры'
    ]
  },
  {
    id: 'events',
    name: 'События и билеты',
    icon: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Мероприятия',
      'Фестивали',
      'Мастер-классы'
    ]
  },
  {
    id: 'accommodation',
    name: 'Жильё и размещение',
    icon: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Апартаменты',
      'Отели',
      'Гостевые дома'
    ]
  }
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'urban-fest-merch',
    name: 'Футболка Urban Fest 2025',
    category: 'business-products',
    subcategory: 'Мерч заведений',
    seller: {
      id: 'urban-team',
      name: 'Urban Team NSK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.8,
      reviews: 124,
      description: 'Команда организаторов городских мероприятий'
    },
    description: 'Официальный мерч фестиваля Urban Fest 2025',
    fullDescription: 'Лимитированная коллекция футболок с символикой фестиваля Urban Fest 2025. Высококачественный хлопок, уникальный дизайн от местных художников.',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      amount: 2500,
      sibt: 250,
      currency: '₽'
    },
    rating: 4.9,
    reviews: 45,
    type: 'product',
    featured: true,
    recommended: true,
    inStock: 100
  },
  {
    id: '2',
    slug: 'coffee-masterclass',
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
    fullDescription: 'Двухчасовой мастер-класс по приготовлению кофе от профессиональных бариста. Вы узнаете о различных методах заварки, научитесь определять вкусовые ноты и готовить идеальный эспрессо.',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      amount: 3500,
      sibt: 350,
      currency: '₽'
    },
    rating: 4.8,
    reviews: 32,
    type: 'service',
    featured: true,
    recommended: true,
    location: {
      name: 'Coffee Lab',
      address: 'ул. Ленина, 12',
      coordinates: [55.0302, 82.9274]
    },
    date: {
      start: format(new Date(2025, 5, 15, 15, 0), 'dd MMMM yyyy HH:mm', { locale: ru })
    }
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRecommendedProducts = (): Product[] => {
  return products.filter(product => product.recommended);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.subcategory.toLowerCase().includes(lowercaseQuery)
  );
};