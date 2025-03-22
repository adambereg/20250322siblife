import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface NewsCategory {
  id: string;
  name: string;
  subcategories: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  image: string;
  summary: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  views: number;
  likes: number;
  comments: number;
}

export interface Comment {
  id: string;
  articleId: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export const newsCategories: NewsCategory[] = [
  {
    id: 'events',
    name: 'События и мероприятия',
    subcategories: [
      'Концерты и фестивали',
      'Выставки и ярмарки',
      'Спортивные мероприятия',
      'Открытия заведений и презентации'
    ]
  },
  {
    id: 'city-life',
    name: 'Жизнь города',
    subcategories: [
      'Городская среда',
      'Истории и очерки о людях города',
      'Репортажи с городских мероприятий'
    ]
  },
  {
    id: 'culture',
    name: 'Культура и искусство',
    subcategories: [
      'Театр и кино',
      'Выставки и музеи',
      'Городские творческие проекты'
    ]
  },
  {
    id: 'food',
    name: 'Еда и развлечения',
    subcategories: [
      'Обзоры ресторанов, кафе и баров',
      'Гастрономические события',
      'Новые заведения'
    ]
  },
  {
    id: 'business',
    name: 'Бизнес и экономика',
    subcategories: [
      'Новые открытия и стартапы',
      'Новости городского бизнеса',
      'Предложения и скидки'
    ]
  },
  {
    id: 'routes',
    name: 'Городские маршруты',
    subcategories: [
      'Авторские маршруты',
      'Лучшие места для прогулок',
      'Путеводители по районам'
    ]
  },
  {
    id: 'tourism',
    name: 'Туризм и путешествия',
    subcategories: [
      'Советы туристам',
      'Интервью путешественников',
      'Новосибирск глазами гостей'
    ]
  },
  {
    id: 'people',
    name: 'Интересные люди',
    subcategories: [
      'Интервью с жителями',
      'Истории успеха',
      'Личные истории'
    ]
  },
  {
    id: 'city-news',
    name: 'Городские новости',
    subcategories: [
      'Транспорт и инфраструктура',
      'Общественная жизнь',
      'Интересные факты'
    ]
  },
  {
    id: 'social',
    name: 'Социальные инициативы',
    subcategories: [
      'Благотворительные мероприятия',
      'Волонтёрские проекты',
      'Истории помощи'
    ]
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'opera-premiere',
    title: 'Премьера оперы "Князь Игорь" в НОВАТе',
    category: 'culture',
    subcategory: 'Театр и кино',
    date: format(new Date(2025, 4, 15), 'd MMMM yyyy', { locale: ru }),
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    summary: 'Новая постановка классической оперы с современными технологиями',
    content: `Новосибирский театр оперы и балета представляет новую постановку оперы "Князь Игорь". 
    Режиссер спектакля использовал современные технологии проекционного маппинга и 3D-эффектов, 
    чтобы создать уникальное визуальное пространство...`,
    author: {
      name: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    tags: ['театр', 'опера', 'премьера', 'культура'],
    views: 1250,
    likes: 45,
    comments: 12
  },
  {
    id: 'new-park',
    title: 'Открытие нового парка в Академгородке',
    category: 'city-life',
    subcategory: 'Городская среда',
    date: format(new Date(2025, 4, 10), 'd MMMM yyyy', { locale: ru }),
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    summary: 'Современное пространство для отдыха и развлечений',
    content: `В Академгородке завершилось строительство нового парка, который станет центром 
    притяжения для жителей научного центра. В парке созданы зоны для активного отдыха, 
    установлены спортивные площадки и создана уникальная экотропа...`,
    author: {
      name: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    tags: ['парк', 'благоустройство', 'Академгородок'],
    views: 890,
    likes: 67,
    comments: 23
  }
];

// Generate mock comments
const generateComments = (articleId: string, count: number): Comment[] => {
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${articleId}-${i}`,
    articleId,
    author: {
      name: `Пользователь ${i + 1}`,
      avatar: avatars[i % avatars.length]
    },
    content: `Это комментарий номер ${i + 1}. Здесь может быть ваше мнение о статье или обсуждение темы с другими читателями.`,
    date: format(new Date(2025, 4, 15 - i), 'd MMMM yyyy', { locale: ru }),
    likes: Math.floor(Math.random() * 50),
    replies: i % 3 === 0 ? [
      {
        id: `reply-${articleId}-${i}`,
        articleId,
        author: {
          name: `Пользователь ${i + 2}`,
          avatar: avatars[(i + 1) % avatars.length]
        },
        content: `Это ответ на комментарий номер ${i + 1}. Продолжаем обсуждение темы.`,
        date: format(new Date(2025, 4, 15 - i, 2), 'd MMMM yyyy', { locale: ru }),
        likes: Math.floor(Math.random() * 20)
      }
    ] : undefined
  }));
};

export const getArticleComments = (articleId: string, page: number = 1, limit: number = 10): Comment[] => {
  const allComments = generateComments(articleId, 50);
  const start = (page - 1) * limit;
  return allComments.slice(start, start + limit);
};