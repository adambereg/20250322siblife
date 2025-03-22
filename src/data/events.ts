import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
}

export interface EventOrganizer {
  id: string;
  name: string;
  avatar: string;
  description: string;
  website?: string;
  social: {
    vk?: string;
    telegram?: string;
    instagram?: string;
  };
  followers: number;
  rating: number;
  reviews: number;
}

export interface EventTicket {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  sold: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: string;
  startDate: string;
  endDate: string;
  location: {
    id: string;
    name: string;
    address: string;
    coordinates: [number, number];
  };
  organizer: EventOrganizer;
  description: string;
  fullDescription: string;
  images: string[];
  price: {
    min: number;
    max: number;
    free: boolean;
  };
  tickets?: EventTicket[];
  participants: {
    going: number;
    interested: number;
    max?: number;
  };
  rating: number;
  reviews: number;
  tags: string[];
  featured: boolean;
  recommended: boolean;
}

export const eventCategories: EventCategory[] = [
  {
    id: 'concerts',
    name: 'Концерты и музыкальные мероприятия',
    icon: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'theater',
    name: 'Театр, кино и спектакли',
    icon: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'exhibitions',
    name: 'Выставки и музеи',
    icon: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'festivals',
    name: 'Фестивали и праздники',
    icon: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'education',
    name: 'Лекции и образовательные мероприятия',
    icon: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'workshops',
    name: 'Мастер-классы и воркшопы',
    icon: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'sports',
    name: 'Спорт и здоровье',
    icon: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'excursions',
    name: 'Экскурсии и городские маршруты',
    icon: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'food',
    name: 'Гастрономические события и дегустации',
    icon: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'markets',
    name: 'Ярмарки и маркеты',
    icon: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'kids',
    name: 'Детские и семейные мероприятия',
    icon: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Фестиваль уличной культуры "Urban Fest 2025"',
    slug: 'urban-fest-2025',
    category: 'festivals',
    startDate: format(new Date(2025, 5, 15, 12, 0), 'dd MMMM yyyy HH:mm', { locale: ru }),
    endDate: format(new Date(2025, 5, 15, 22, 0), 'dd MMMM yyyy HH:mm', { locale: ru }),
    location: {
      id: 'mikhailovskaya-embankment',
      name: 'Михайловская набережная',
      address: 'Михайловская набережная, Новосибирск',
      coordinates: [55.0302, 82.9274]
    },
    organizer: {
      id: 'urban-team',
      name: 'Urban Team NSK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      description: 'Команда организаторов городских мероприятий',
      website: 'urbanteam.ru',
      social: {
        vk: 'urbanteam_nsk',
        telegram: 'urbanteam'
      },
      followers: 5200,
      rating: 4.8,
      reviews: 124
    },
    description: 'Масштабный фестиваль уличной культуры с участием лучших представителей хип-хоп сцены, стрит-арта и экстремального спорта.',
    fullDescription: `Urban Fest 2025 - это главное событие года в мире уличной культуры Новосибирска. 

В программе фестиваля:
- Выступления рэп-исполнителей
- Танцевальные баттлы
- Скейт-контесты
- Стрит-арт перформансы
- Воркшопы и мастер-классы
- Фуд-корт от лучших стрит-фуд проектов города

Хедлайнеры фестиваля будут объявлены за месяц до мероприятия.`,
    images: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1520098183066-2a5609904268?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      min: 1000,
      max: 3000,
      free: false
    },
    tickets: [
      {
        id: 'standard',
        name: 'Стандартный билет',
        price: 1000,
        description: 'Доступ на все площадки фестиваля',
        available: 1000,
        sold: 450
      },
      {
        id: 'vip',
        name: 'VIP билет',
        price: 3000,
        description: 'Доступ в VIP зону, встреча с артистами, подарки от спонсоров',
        available: 100,
        sold: 30
      }
    ],
    participants: {
      going: 450,
      interested: 1200,
      max: 1100
    },
    rating: 4.8,
    reviews: 124,
    tags: ['фестиваль', 'музыка', 'хип-хоп', 'стрит-арт', 'скейтбординг'],
    featured: true,
    recommended: true
  },
  {
    id: '2',
    title: 'Выставка современного искусства "Новые горизонты"',
    slug: 'new-horizons-exhibition',
    category: 'exhibitions',
    startDate: format(new Date(2025, 5, 20, 10, 0), 'dd MMMM yyyy HH:mm', { locale: ru }),
    endDate: format(new Date(2025, 6, 20, 20, 0), 'dd MMMM yyyy HH:mm', { locale: ru }),
    location: {
      id: 'art-center',
      name: 'Центр культуры и отдыха',
      address: 'ул. Ленина, 15, Новосибирск',
      coordinates: [55.0416, 82.9189]
    },
    organizer: {
      id: 'art-foundation',
      name: 'Арт Фонд Сибири',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      description: 'Фонд поддержки современного искусства',
      website: 'artfond.ru',
      social: {
        vk: 'artfond',
        telegram: 'artfond_nsk'
      },
      followers: 3500,
      rating: 4.9,
      reviews: 89
    },
    description: 'Масштабная выставка современного искусства, представляющая работы молодых художников Сибири.',
    fullDescription: `"Новые горизонты" - это уникальная выставка, объединяющая более 100 работ от 30 современных художников Сибири.

На выставке будут представлены:
- Живопись
- Скульптура
- Инсталляции
- Медиа-арт
- Перформансы

Специальная программа включает:
- Встречи с художниками
- Лекции об искусстве
- Мастер-классы
- Экскурсии с кураторами`,
    images: [
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1577720643272-6c6bb5cb4b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    price: {
      min: 400,
      max: 1000,
      free: false
    },
    tickets: [
      {
        id: 'standard',
        name: 'Входной билет',
        price: 400,
        description: 'Посещение выставки в любой день',
        available: 5000,
        sold: 2100
      },
      {
        id: 'guided',
        name: 'Билет с экскурсией',
        price: 1000,
        description: 'Входной билет + экскурсия с профессиональным искусствоведом',
        available: 500,
        sold: 180
      }
    ],
    participants: {
      going: 2100,
      interested: 3500
    },
    rating: 4.9,
    reviews: 89,
    tags: ['выставка', 'искусство', 'живопись', 'скульптура', 'медиа-арт'],
    featured: true,
    recommended: true
  }
];

export const getEventsByCategory = (categoryId: string): Event[] => {
  return events.filter(event => event.category === categoryId);
};

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find(event => event.slug === slug);
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.featured);
};

export const getRecommendedEvents = (): Event[] => {
  return events.filter(event => event.recommended);
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return events.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};