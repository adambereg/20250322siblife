import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users, Star, MapPin, Calendar, Crown, ChevronLeft,
  MessageCircle, Heart, Share2, Settings, Trophy,
  Bell, UserPlus, UserMinus, Shield, Camera, Edit,
  Send, FileImage, Smile, PlusCircle, Filter, Search
} from 'lucide-react';

const ClanDetailsPage: React.FC = () => {
  const { clanId } = useParams();
  const [activeTab, setActiveTab] = useState('feed');

  // Demo clan data
  const clan = {
    id: 1,
    name: 'Активный Новосибирск',
    category: 'sports',
    members: 2450,
    events: 12,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    coverImage: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    location: 'Центральный район',
    description: 'Крупнейшее сообщество для любителей активного образа жизни и спорта в Новосибирске. Организуем спортивные мероприятия, совместные тренировки и соревнования. Развиваем городской спорт и пропагандируем здоровый образ жизни.',
    leader: {
      name: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      role: 'PRO-Соучастник'
    },
    admins: [
      {
        name: 'Анна Петрова',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'Модератор'
      },
      {
        name: 'Алексей Иванов',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'Организатор'
      }
    ],
    rating: 4.8,
    reviews: 156,
    socialRating: 850,
    stats: {
      posts: 450,
      photos: 1200,
      routes: 25
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'Утренняя пробежка',
        date: '20 мая 2025, 7:00',
        participants: 45,
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 2,
        title: 'Велозаезд по городу',
        date: '22 мая 2025, 10:00',
        participants: 120,
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      }
    ],
    feed: [
      {
        id: 1,
        author: {
          name: 'Михаил Сидоров',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
          role: 'PRO-Соучастник'
        },
        content: 'Отличная тренировка сегодня! Спасибо всем участникам за энергию и позитив! 💪',
        images: [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        date: '2 часа назад',
        likes: 45,
        comments: 12
      },
      {
        id: 2,
        author: {
          name: 'Анна Петрова',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
          role: 'Модератор'
        },
        content: 'Анонс! В эту субботу проводим большой велозаезд по городу. Маршрут: центр - Академгородок. Присоединяйтесь! 🚲',
        date: '5 часов назад',
        likes: 78,
        comments: 23
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    discussions: [
      {
        id: 1,
        title: 'Обсуждение маршрута велозаезда',
        lastMessage: 'Предлагаю добавить остановку у набережной',
        participants: 34,
        messages: 89,
        lastActivity: '15 минут назад'
      },
      {
        id: 2,
        title: 'Организация летнего спортивного фестиваля',
        lastMessage: 'Нужны волонтеры для помощи в организации',
        participants: 56,
        messages: 234,
        lastActivity: '2 часа назад'
      }
    ]
  };

  const tabs = [
    { id: 'feed', name: 'Лента', icon: MessageCircle },
    { id: 'events', name: 'События', icon: Calendar },
    { id: 'members', name: 'Участники', icon: Users },
    { id: 'photos', name: 'Фото', icon: Camera },
    { id: 'discussions', name: 'Обсуждения', icon: MessageCircle },
    { id: 'about', name: 'О клане', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-96">
        <img
          src={clan.coverImage}
          alt={clan.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/clans" className="flex items-center text-white mb-4 hover:text-gray-200">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Назад к списку кланов
            </Link>
            <div className="flex items-end">
              <img
                src={clan.image}
                alt={clan.name}
                className="w-32 h-32 rounded-xl border-4 border-white mr-6"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{clan.name}</h1>
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{clan.members} участников</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span>{clan.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{clan.reviews} отзывов</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-yellow-400 mr-1" />
                    <span>{clan.socialRating} SR</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Вступить в клан
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg hover:bg-white/20">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-1 mb-8">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Tab Content */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                      alt="Your avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        placeholder="Поделитесь новостями клана..."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                      />
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex space-x-4">
                          <button className="text-gray-500 hover:text-indigo-600">
                            <FileImage className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-indigo-600">
                            <Smile className="h-5 w-5" />
                          </button>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                          Опубликовать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feed Posts */}
                {clan.feed.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                          <span className="ml-2 text-sm text-gray-500">{post.author.role}</span>
                        </div>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-4">{post.content}</p>

                    {post.images && post.images.length > 0 && (
                      <div className="mb-4">
                        <img
                          src={post.images[0]}
                          alt="Post content"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-gray-500">
                      <button className="flex items-center hover:text-indigo-600">
                        <Heart className="h-5 w-5 mr-1" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center hover:text-indigo-600">
                        <MessageCircle className="h-5 w-5 mr-1" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center hover:text-indigo-600">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab Content */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Предстоящие события</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Создать событие
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clan.upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            <span>{event.participants} участников</span>
                          </div>
                        </div>
                        <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                          Присоединиться
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab Content */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Участники клана</h2>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Поиск участников..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Фильтры
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Администрация клана</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <img
                        src={clan.leader.avatar}
                        alt={clan.leader.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{clan.leader.name}</h4>
                          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                            Лидер клана
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{clan.leader.role}</p>
                      </div>
                      <button className="ml-auto text-indigo-600 hover:text-indigo-800">
                        Написать
                      </button>
                    </div>

                    {clan.admins.map((admin, index) => (
                      <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <img
                          src={admin.avatar}
                          alt={admin.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">{admin.name}</h4>
                            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                              {admin.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Активен сегодня</p>
                        </div>
                        <button className="ml-auto text-indigo-600 hover:text-indigo-800">
                          Написать
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Photos Tab Content */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Фотографии клана</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Добавить фото
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {clan.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={photo}
                        alt={`Clan photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussions Tab Content */}
            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Обсуждения</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Создать обсуждение
                  </button>
                </div>

                <div className="space-y-4">
                  {clan.discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{discussion.title}</h3>
                      <p className="text-gray-600 mb-4">{discussion.lastMessage}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {discussion.participants} участников
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {discussion.messages} сообщений
                          </span>
                        </div>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Tab Content */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">О клане</h2>
                  <p className="text-gray-600 mb-6">{clan.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Статистика</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Публикации:</span>
                          <span className="font-medium">{clan.stats.posts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Фотографии:</span>
                          <span className="font-medium">{clan.stats.photos}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Маршруты:</span>
                          <span className="font-medium">{clan.stats.routes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Рейтинг</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Общий рейтинг:</span>
                          <span className="font-medium">{clan.rating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Отзывы:</span>
                          <span className="font-medium">{clan.reviews}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Социальный рейтинг:</span>
                          <span className="font-medium">{clan.socialRating} SR</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Активность</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Участники:</span>
                          <span className="font-medium">{clan.members}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">События:</span>
                          <span className="font-medium">{clan.events}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Локация:</span>
                          <span className="font-medium">{clan.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Вступить в клан
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Написать сообщение
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Подписаться
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Ближайшие события</h3>
              <div className="space-y-4">
                {clan.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.participants} участников</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Administration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Администрация клана</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={clan.leader.avatar}
                    alt={clan.leader.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{clan.leader.name}</h4>
                    <p className="text-sm text-gray-500">Лидер клана</p>
                  </div>
                </div>
                {clan.admins.map((admin, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{admin.name}</h4>
                      <p className="text-sm text-gray-500">{admin.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClanDetailsPage;