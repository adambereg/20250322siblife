import { Router } from 'express';

const router = Router();

// Публичные маршруты
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Поход на гору Сибирячка',
        slug: 'pohod-na-goru-sibiryachka',
        description: 'Однодневный поход на гору Сибирячка с потрясающими видами на озеро Байкал',
        category: 'Походы',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dateStart: new Date('2023-07-25').toISOString(),
        dateEnd: new Date('2023-07-25').toISOString(),
        price: 1500,
        capacity: 20,
        participants: 12,
        location: {
          address: 'Поселок Листвянка',
          city: 'Иркутск'
        }
      },
      {
        id: '2',
        title: 'Мастер-класс по сибирской кухне',
        slug: 'master-klass-po-sibirskoj-kuhne',
        description: 'Научитесь готовить традиционные сибирские блюда под руководством шеф-повара',
        category: 'Кулинария',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        dateStart: new Date('2023-08-10').toISOString(),
        dateEnd: new Date('2023-08-10').toISOString(),
        price: 3000,
        capacity: 15,
        participants: 8,
        location: {
          address: 'ул. Ленина, 25',
          city: 'Новосибирск'
        }
      }
    ]
  });
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  
  if (slug === 'pohod-na-goru-sibiryachka') {
    res.json({
      success: true,
      data: {
        id: '1',
        title: 'Поход на гору Сибирячка',
        slug: 'pohod-na-goru-sibiryachka',
        description: 'Однодневный поход на гору Сибирячка с потрясающими видами на озеро Байкал',
        fullDescription: `
          <p>Приглашаем вас на незабываемый поход на гору Сибирячка, откуда открывается потрясающий вид на озеро Байкал.</p>
          <p>Что вас ждет:</p>
          <ul>
            <li>Профессиональные гиды</li>
            <li>Безопасный маршрут</li>
            <li>Перекус и горячие напитки</li>
            <li>Фотосессия на вершине</li>
          </ul>
          <p>Уровень сложности: средний. Требуется хорошая физическая форма.</p>
        `,
        category: 'Походы',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        ],
        dateStart: new Date('2023-07-25').toISOString(),
        dateEnd: new Date('2023-07-25').toISOString(),
        price: 1500,
        capacity: 20,
        participants: 12,
        organizer: {
          id: '2',
          name: 'Сибирские Походы',
          avatar: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        location: {
          address: 'Поселок Листвянка',
          city: 'Иркутск',
          coordinates: [104.8924, 51.8659]
        },
        reviews: [
          {
            id: '1',
            user: {
              id: '3',
              name: 'Алексей',
              avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            rating: 5,
            comment: 'Отличный поход! Виды потрясающие, организация на высоте.',
            date: new Date('2023-06-10').toISOString()
          },
          {
            id: '2',
            user: {
              id: '4',
              name: 'Елена',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            rating: 4,
            comment: 'Было здорово, хотя немного устала. Рекомендую!',
            date: new Date('2023-06-15').toISOString()
          }
        ],
        tags: ['поход', 'горы', 'байкал', 'активный отдых']
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Событие не найдено'
    });
  }
});

// Защищенные маршруты (будут требовать аутентификации)
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    data: {
      id: '999',
      title: req.body.title,
      slug: req.body.title.toLowerCase().replace(/[^\w\sа-яА-Я]/g, '').replace(/\s+/g, '-'),
      description: req.body.description,
      category: req.body.category,
      image: req.body.image || '',
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      price: req.body.price,
      capacity: req.body.capacity,
      participants: 0,
      organizer: {
        id: '1',
        name: 'Вы',
        avatar: ''
      },
      location: req.body.location
    }
  });
});

export default router; 