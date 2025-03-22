import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface HousingCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface HousingAmenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'comfort' | 'luxury' | 'safety';
}

export interface HousingHost {
  id: string;
  name: string;
  avatar: string;
  type: 'business' | 'participant';
  level?: 'pro' | 'vip' | 'regular';
  rating: number;
  reviews: number;
  description: string;
  verifiedStatus: boolean;
  languages: string[];
  responseTime: string;
  social?: {
    vk?: string;
    telegram?: string;
  };
}

export interface HousingUnit {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  type: 'apartment' | 'hotel' | 'house' | 'hostel';
  host: HousingHost;
  description: string;
  fullDescription: string;
  images: string[];
  price: {
    amount: number;
    sibt: number;
    currency: string;
    period: 'night' | 'month';
  };
  rating: number;
  reviews: number;
  location: {
    name: string;
    address: string;
    district: string;
    coordinates: [number, number];
  };
  details: {
    area: number;
    rooms: number;
    bathrooms: number;
    maxGuests: number;
    floor?: number;
    totalFloors?: number;
  };
  amenities: string[];
  rules: {
    checkIn: string;
    checkOut: string;
    minStay: number;
    maxStay?: number;
    smoking: boolean;
    pets: boolean;
    parties: boolean;
    additionalRules?: string[];
  };
  nearbyPlaces: {
    name: string;
    type: string;
    distance: string;
  }[];
  featured: boolean;
  recommended: boolean;
  instantBook: boolean;
  availability: {
    start: string;
    end: string;
    booked: string[];
  };
}

export const housingCategories: HousingCategory[] = [
  {
    id: 'apartments',
    name: 'Апартаменты и квартиры',
    icon: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Студии',
      'Однокомнатные',
      'Двухкомнатные',
      'Трёхкомнатные и более',
      'Пентхаусы'
    ]
  },
  {
    id: 'hotels',
    name: 'Отели и гостиницы',
    icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Стандартные номера',
      'Люксы',
      'Бизнес-номера',
      'Семейные номера',
      'Апартаменты'
    ]
  },
  {
    id: 'houses',
    name: 'Гостевые дома и коттеджи',
    icon: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Гостевые дома',
      'Коттеджи',
      'Таунхаусы',
      'Виллы',
      'Загородные дома'
    ]
  },
  {
    id: 'hostels',
    name: 'Хостелы',
    icon: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    subcategories: [
      'Общие номера',
      'Женские номера',
      'Мужские номера',
      'Семейные номера',
      'Отдельные комнаты'
    ]
  }
];

export const housingAmenities: HousingAmenity[] = [
  {
    id: 'wifi',
    name: 'Wi-Fi',
    icon: 'wifi',
    category: 'basic'
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    icon: 'utensils',
    category: 'basic'
  },
  {
    id: 'washer',
    name: 'Стиральная машина',
    icon: 'washing-machine',
    category: 'basic'
  },
  {
    id: 'parking',
    name: 'Парковка',
    icon: 'parking',
    category: 'basic'
  },
  {
    id: 'ac',
    name: 'Кондиционер',
    icon: 'fan',
    category: 'comfort'
  },
  {
    id: 'workspace',
    name: 'Рабочее место',
    icon: 'laptop',
    category: 'comfort'
  },
  {
    id: 'gym',
    name: 'Спортзал',
    icon: 'dumbbell',
    category: 'luxury'
  },
  {
    id: 'pool',
    name: 'Бассейн',
    icon: 'pool',
    category: 'luxury'
  },
  {
    id: 'security',
    name: 'Охрана',
    icon: 'shield',
    category: 'safety'
  },
  {
    id: 'cctv',
    name: 'Видеонаблюдение',
    icon: 'camera',
    category: 'safety'
  }
];

export const housingUnits: HousingUnit[] = [
  {
    id: '1',
    slug: 'modern-studio-center',
    name: 'Современная студия в центре',
    category: 'apartments',
    subcategory: 'Студии',
    type: 'apartment',
    host: {
      id: 'host1',
      name: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'participant',
      level: 'pro',
      rating: 4.9,
      reviews: 156,
      description: 'Суперхост с 3-летним опытом',
      verifiedStatus: true,
      languages: ['Русский', 'English'],
      responseTime: '1 час'
    },
    description: 'Уютная студия с современным ремонтом в самом центре города',
    fullDescription: `Светлая и просторная студия в историческом центре Новосибирска. Полностью оборудована всем необходимым для комфортного проживания.

В квартире:
- Двуспальная кровать с ортопедическим матрасом
- Полностью оборудованная кухня
- Высокоскоростной интернет
- Smart TV с Netflix
- Рабочая зона
- Кондиционер

Идеальное расположение позволяет легко добраться до всех основных достопримечательностей города.`,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      amount: 3500,
      sibt: 350,
      currency: '₽',
      period: 'night'
    },
    rating: 4.9,
    reviews: 48,
    location: {
      name: 'Центральный район',
      address: 'ул. Ленина, 10',
      district: 'Центральный',
      coordinates: [55.0302, 82.9274]
    },
    details: {
      area: 35,
      rooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      floor: 5,
      totalFloors: 9
    },
    amenities: [
      'wifi',
      'kitchen',
      'washer',
      'ac',
      'workspace'
    ],
    rules: {
      checkIn: '14:00',
      checkOut: '12:00',
      minStay: 1,
      maxStay: 30,
      smoking: false,
      pets: true,
      parties: false,
      additionalRules: [
        'Тихий час с 23:00 до 7:00',
        'Залог 5000 ₽'
      ]
    },
    nearbyPlaces: [
      {
        name: 'Площадь Ленина',
        type: 'landmark',
        distance: '300м'
      },
      {
        name: 'Театр Оперы и Балета',
        type: 'culture',
        distance: '500м'
      },
      {
        name: 'Центральный парк',
        type: 'park',
        distance: '700м'
      }
    ],
    featured: true,
    recommended: true,
    instantBook: true,
    availability: {
      start: format(new Date(2025, 4, 1), 'yyyy-MM-dd'),
      end: format(new Date(2025, 11, 31), 'yyyy-MM-dd'),
      booked: [
        format(new Date(2025, 5, 15), 'yyyy-MM-dd'),
        format(new Date(2025, 5, 16), 'yyyy-MM-dd'),
        format(new Date(2025, 5, 17), 'yyyy-MM-dd')
      ]
    }
  },
  {
    id: '2',
    slug: 'luxury-hotel-room',
    name: 'Люкс в Марриотт',
    category: 'hotels',
    subcategory: 'Люксы',
    type: 'hotel',
    host: {
      id: 'marriott',
      name: 'Marriott Novosibirsk',
      avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'business',
      rating: 4.8,
      reviews: 1250,
      description: 'Международная сеть отелей',
      verifiedStatus: true,
      languages: ['Русский', 'English', 'Deutsch'],
      responseTime: '15 минут'
    },
    description: 'Роскошный номер люкс с панорамным видом на город',
    fullDescription: `Просторный номер люкс в отеле Marriott Novosibirsk с панорамным видом на город. Идеально подходит для бизнес-путешественников и туристов, ценящих комфорт высокого уровня.

В номере:
- Кровать king-size
- Отдельная гостиная
- Рабочая зона
- Мраморная ванная комната
- Панорамные окна
- Доступ в лаунж-зону

Гости имеют доступ ко всей инфраструктуре отеля, включая фитнес-центр, спа и ресторан.`,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      amount: 12000,
      sibt: 1200,
      currency: '₽',
      period: 'night'
    },
    rating: 4.8,
    reviews: 156,
    location: {
      name: 'Деловой центр',
      address: 'ул. Орджоникидзе, 31',
      district: 'Центральный',
      coordinates: [55.0416, 82.9189]
    },
    details: {
      area: 60,
      rooms: 2,
      bathrooms: 1,
      maxGuests: 3,
      floor: 15,
      totalFloors: 20
    },
    amenities: [
      'wifi',
      'ac',
      'workspace',
      'gym',
      'pool',
      'security',
      'cctv'
    ],
    rules: {
      checkIn: '15:00',
      checkOut: '12:00',
      minStay: 1,
      smoking: false,
      pets: false,
      parties: false
    },
    nearbyPlaces: [
      {
        name: 'Бизнес-центр',
        type: 'business',
        distance: '100м'
      },
      {
        name: 'Торговый центр',
        type: 'shopping',
        distance: '300м'
      }
    ],
    featured: true,
    recommended: true,
    instantBook: true,
    availability: {
      start: format(new Date(2025, 4, 1), 'yyyy-MM-dd'),
      end: format(new Date(2025, 11, 31), 'yyyy-MM-dd'),
      booked: []
    }
  }
];

export const getFeaturedHousing = (): HousingUnit[] => {
  return housingUnits.filter(unit => unit.featured);
};

export const getRecommendedHousing = (): HousingUnit[] => {
  return housingUnits.filter(unit => unit.recommended);
};

export const getHousingByCategory = (categoryId: string): HousingUnit[] => {
  return housingUnits.filter(unit => unit.category === categoryId);
};

export const getHousingBySlug = (slug: string): HousingUnit | undefined => {
  return housingUnits.find(unit => unit.slug === slug);
};

export const searchHousing = (query: string): HousingUnit[] => {
  const lowercaseQuery = query.toLowerCase();
  return housingUnits.filter(unit => 
    unit.name.toLowerCase().includes(lowercaseQuery) ||
    unit.description.toLowerCase().includes(lowercaseQuery) ||
    unit.location.district.toLowerCase().includes(lowercaseQuery) ||
    unit.location.address.toLowerCase().includes(lowercaseQuery)
  );
};