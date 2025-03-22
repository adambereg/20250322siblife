import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface PlaceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface PlaceReview {
  id: string;
  placeId: string;
  author: {
    name: string;
    avatar: string;
    level: 'user' | 'vip' | 'pro';
  };
  rating: number;
  content: string;
  date: string;
  likes: number;
  photos?: string[];
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  coordinates: [number, number];
  images: string[];
  address: string;
  schedule: {
    weekdays: string;
    weekend: string;
    breaks?: string;
    closed?: string[];
  };
  phone: string;
  website: string;
  description: string;
  fullDescription: string;
  features: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  socialLinks: {
    vk?: string;
    telegram?: string;
    instagram?: string;
  };
  howToGet: {
    type: 'metro' | 'bus' | 'car';
    description: string;
    time: string;
  }[];
  nearbyPlaces: {
    name: string;
    distance: string;
    type: string;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: string;
  }[];
  amenities: string[];
  photos: {
    url: string;
    author: string;
    date: string;
  }[];
  verified: boolean;
  featured: boolean;
}

export const placeCategories: PlaceCategory[] = [
  {
    id: 'food',
    name: 'Кафе и рестораны',
    icon: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Кофейни',
      'Рестораны',
      'Бары',
      'Фудкорты',
      'Кондитерские',
      'Фастфуд'
    ]
  },
  {
    id: 'culture',
    name: 'Культура и искусство',
    icon: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Музеи',
      'Галереи',
      'Театры',
      'Концертные залы',
      'Кинотеатры',
      'Выставочные пространства'
    ]
  },
  {
    id: 'landmarks',
    name: 'Достопримечательности',
    icon: 'https://images.unsplash.com/photo-1577720643272-6c6bb5cb4b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Исторические памятники',
      'Архитектурные памятники',
      'Городские парки',
      'Зоны отдыха',
      'Обзорные площадки',
      'Фотолокации'
    ]
  },
  {
    id: 'entertainment',
    name: 'Развлечения и отдых',
    icon: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Квесты',
      'Аттракционы',
      'Игровые зоны',
      'Парки развлечений',
      'Спортивные комплексы',
      'Ночные клубы'
    ]
  },
  {
    id: 'shopping',
    name: 'Торговля и шоппинг',
    icon: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Торговые центры',
      'Магазины',
      'Бутики',
      'Местные бренды',
      'Ярмарки',
      'Рынки'
    ]
  },
  {
    id: 'accommodation',
    name: 'Проживание',
    icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Апартаменты',
      'Квартиры',
      'Отели',
      'Хостелы',
      'Гостевые дома',
      'Бронирование'
    ]
  },
  {
    id: 'business',
    name: 'Бизнес и услуги',
    icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Коворкинги',
      'Конференц-залы',
      'Салоны красоты',
      'SPA',
      'Прокат',
      'Сервисные центры'
    ]
  }
];

export const places: Record<string, Place> = {
  'novosibirsk-opera': {
    id: 'novosibirsk-opera',
    name: 'Новосибирский театр оперы и балета',
    slug: 'novosibirsk-opera',
    category: 'culture',
    subcategory: 'Театры',
    rating: 4.8,
    reviews: 1250,
    coordinates: [55.0302, 82.9274],
    images: [
      'https://images.unsplash.com/photo-1518998595787-967065c02967?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1583119912267-cc97c911e416?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1583119912267-cc97c911e416?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
    address: 'Красный проспект, 36',
    schedule: {
      weekdays: '10:00 - 20:00',
      weekend: '10:00 - 19:00',
      breaks: '14:00 - 15:00'
    },
    phone: '+7 (383) 222-60-40',
    website: 'novat.nsk.ru',
    description: 'Крупнейший театр России, главный символ города',
    fullDescription: `Новосибирский государственный академический театр оперы и балета (НГАТОиБ) — крупнейший музыкальный театр России. Театр является одним из ведущих музыкальных театров России и признанным центром музыкальной культуры Сибири.

Здание театра было построено в 1931-1941 годах и является памятником архитектуры федерального значения. Его купол диаметром 60 метров считается самым большим цельным куполом в мире.

В репертуаре театра представлены как классические постановки опер и балетов, так и современные экспериментальные работы. Театр регулярно проводит фестивали и принимает участие в международных проектах.`,
    features: [
      'Исторический памятник',
      'Экскурсии',
      'Театральный музей',
      'Кафе',
      'Сувенирный магазин'
    ],
    priceRange: {
      min: 800,
      max: 5000,
      currency: '₽'
    },
    socialLinks: {
      vk: 'novat_nsk',
      telegram: 'novat_nsk'
    },
    howToGet: [
      {
        type: 'metro',
        description: 'Станция метро "Площадь Ленина", выход на Красный проспект',
        time: '2 минуты пешком'
      },
      {
        type: 'bus',
        description: 'Остановка "Театр Оперы и балета": автобусы 1123, 1141, 1264',
        time: '5 минут пешком'
      },
      {
        type: 'car',
        description: 'Платная парковка доступна на площади Ленина и прилегающих улицах',
        time: 'Зависит от загруженности дорог'
      }
    ],
    nearbyPlaces: [
      {
        name: 'Первомайский сквер',
        distance: '200м',
        type: 'park'
      },
      {
        name: 'Центральный парк',
        distance: '500м',
        type: 'park'
      },
      {
        name: 'Краеведческий музей',
        distance: '700м',
        type: 'museum'
      }
    ],
    upcomingEvents: [
      {
        id: 'swan-lake-2025',
        title: 'Лебединое озеро',
        date: format(new Date(2025, 5, 15), 'd MMMM yyyy', { locale: ru }),
        type: 'ballet'
      },
      {
        id: 'rigoletto-2025',
        title: 'Риголетто',
        date: format(new Date(2025, 5, 20), 'd MMMM yyyy', { locale: ru }),
        type: 'opera'
      }
    ],
    amenities: [
      'Гардероб',
      'Буфет',
      'Wi-Fi',
      'Парковка',
      'Доступная среда'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1518998595787-967065c02967?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        author: 'Иван Петров',
        date: format(new Date(2025, 4, 15), 'd MMMM yyyy', { locale: ru })
      },
      {
        url: 'https://images.unsplash.com/photo-1583119912267-cc97c911e416?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        author: 'Мария Сидорова',
        date: format(new Date(2025, 4, 10), 'd MMMM yyyy', { locale: ru })
      }
    ],
    verified: true,
    featured: true
  },
  'central-park': {
    id: 'central-park',
    name: 'Центральный парк',
    slug: 'central-park',
    category: 'landmarks',
    subcategory: 'Городские парки',
    rating: 4.5,
    reviews: 3200,
    coordinates: [55.0416, 82.9189],
    images: [
      'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
    address: 'ул. Мичурина, 8',
    schedule: {
      weekdays: '06:00 - 23:00',
      weekend: '06:00 - 23:00'
    },
    phone: '+7 (383) 227-36-24',
    website: 'centerpark-nsk.ru',
    description: 'Популярное место отдыха в центре города',
    fullDescription: `Центральный парк культуры и отдыха - одно из самых популярных мест отдыха в Новосибирске. Парк был основан в 1931 году и с тех пор остается любимым местом отдыха горожан.

На территории парка расположены многочисленные аттракционы, детские площадки, кафе и рестораны. В летнее время работают фонтаны и проводятся различные мероприятия и концерты.

Парк является центром культурной жизни города, здесь регулярно проходят городские праздники, фестивали и выставки.`,
    features: [
      'Аттракционы',
      'Детские площадки',
      'Фонтаны',
      'Кафе',
      'Прокат инвентаря'
    ],
    priceRange: {
      min: 0,
      max: 500,
      currency: '₽'
    },
    socialLinks: {
      vk: 'centralpark_nsk',
      telegram: 'centralpark_nsk'
    },
    howToGet: [
      {
        type: 'metro',
        description: 'Станция метро "Площадь Ленина", выход к Первомайскому скверу',
        time: '10 минут пешком'
      },
      {
        type: 'bus',
        description: 'Остановка "Центральный парк": автобусы 1264, 1141',
        time: '2 минуты пешком'
      },
      {
        type: 'car',
        description: 'Парковка доступна на прилегающих улицах',
        time: 'Зависит от загруженности дорог'
      }
    ],
    nearbyPlaces: [
      {
        name: 'Театр оперы и балета',
        distance: '500м',
        type: 'theater'
      },
      {
        name: 'Первомайский сквер',
        distance: '300м',
        type: 'park'
      },
      {
        name: 'ТЦ "Галерея"',
        distance: '400м',
        type: 'shopping'
      }
    ],
    upcomingEvents: [
      {
        id: 'summer-fest-2025',
        title: 'Летний фестиваль',
        date: format(new Date(2025, 6, 1), 'd MMMM yyyy', { locale: ru }),
        type: 'festival'
      }
    ],
    amenities: [
      'Туалеты',
      'Кафе',
      'Wi-Fi',
      'Прокат',
      'Детская комната'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        author: 'Алексей Иванов',
        date: format(new Date(2025, 4, 1), 'd MMMM yyyy', { locale: ru })
      }
    ],
    verified: true,
    featured: true
  }
};

export const getPlacesByCategory = (categoryId: string): Place[] => {
  return Object.values(places).filter(place => place.category === categoryId);
};

export const getPlaceBySlug = (slug: string): Place | undefined => {
  return places[slug];
};

export const getFeaturedPlaces = (): Place[] => {
  return Object.values(places).filter(place => place.featured);
};

export const searchPlaces = (query: string): Place[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(places).filter(place => 
    place.name.toLowerCase().includes(lowercaseQuery) ||
    place.description.toLowerCase().includes(lowercaseQuery) ||
    place.category.toLowerCase().includes(lowercaseQuery) ||
    place.subcategory.toLowerCase().includes(lowercaseQuery)
  );
};