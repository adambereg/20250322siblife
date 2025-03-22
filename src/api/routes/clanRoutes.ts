import { Router } from 'express';

const router = Router();

// Публичные маршруты
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Сибирские Волки',
        slug: 'sibirskie-volki',
        description: 'Клан для активного отдыха в Сибири',
        logo: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        memberCount: 34,
        tags: ['Походы', 'Активный отдых', 'Сибирь'],
        category: 'Спорт и отдых',
        city: 'Новосибирск',
        isVerified: true
      },
      {
        id: '2',
        name: 'Таежные Братья',
        slug: 'taezhnye-bratya',
        description: 'Клан любителей походов и выживания в тайге',
        logo: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        cover: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        memberCount: 22,
        tags: ['Тайга', 'Выживание', 'Походы'],
        category: 'Активный отдых',
        city: 'Томск',
        isVerified: false
      }
    ]
  });
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  
  if (slug === 'sibirskie-volki') {
    res.json({
      success: true,
      data: {
        id: '1',
        name: 'Сибирские Волки',
        slug: 'sibirskie-volki',
        description: 'Клан для активного отдыха в Сибири',
        fullDescription: `
          <p>Мы - сообщество единомышленников, объединенных любовью к природе Сибири и активному отдыху.</p>
          <p>Наши цели:</p>
          <ul>
            <li>Организация походов и экспедиций</li>
            <li>Обмен опытом и навыками выживания</li>
            <li>Экологические инициативы</li>
            <li>Совместные тренировки и подготовка</li>
          </ul>
          <p>Присоединяйтесь к нам, если вы разделяете наши ценности и любите приключения!</p>
        `,
        logo: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creator: {
          id: '5',
          name: 'Иван Тайгин',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        },
        members: [
          {
            id: '5',
            name: 'Иван Тайгин',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            role: 'leader'
          },
          {
            id: '6',
            name: 'Мария Снежная',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            role: 'moderator'
          },
          {
            id: '7',
            name: 'Алексей Горный',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            role: 'member'
          }
        ],
        memberCount: 34,
        tags: ['Походы', 'Активный отдых', 'Сибирь'],
        category: 'Спорт и отдых',
        city: 'Новосибирск',
        isVerified: true,
        events: [
          {
            id: '1',
            title: 'Поход на гору Сибирячка',
            slug: 'pohod-na-goru-sibiryachka',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            dateStart: new Date('2023-07-25').toISOString()
          },
          {
            id: '3',
            title: 'Зимний поход на лыжах',
            slug: 'zimnij-pohod-na-lyzhah',
            image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80',
            dateStart: new Date('2023-12-15').toISOString()
          }
        ]
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Клан не найден'
    });
  }
});

// Защищенные маршруты (будут требовать аутентификации)
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    data: {
      id: '999',
      name: req.body.name,
      slug: req.body.name.toLowerCase().replace(/[^\w\sа-яА-Я]/g, '').replace(/\s+/g, '-'),
      description: req.body.description,
      logo: req.body.logo || '',
      cover: req.body.cover || '',
      creator: {
        id: '1',
        name: 'Вы',
        avatar: ''
      },
      memberCount: 1,
      tags: req.body.tags || [],
      category: req.body.category,
      city: req.body.city,
      isVerified: false
    }
  });
});

export default router; 