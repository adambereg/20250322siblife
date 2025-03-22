import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Calendar, MapPin, Route, ShoppingBag, Home, Users,
  MessageCircle, Settings, Award, ChevronLeft, Camera, Edit,
  Star, Heart, Share2, ThumbsUp, MessageSquare, Clock, Phone,
  Mail, Bell, Lock, Globe, CheckCircle2, MapPinOff, Wallet,
  CreditCard, Search, Send, Coins, Gift, ShieldCheck, Trophy,
  Target, Map, Coffee, Ticket, Crown, Diamond, Sparkles
} from 'lucide-react';

const VIPProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const user = {
    name: 'Анна Петрова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'VIP-Соучастник',
    joinDate: '15 марта 2025',
    friends: 256,
    followers: 512,
    stats: {
      events: 25,
      reviews: 48,
      posts: 86
    },
    tokens: {
      balance: 2500,
      earned: 5000,
      spent: 2500
    }
  };

  const tabs = [
    { id: 'activity', name: 'Лента активности', icon: User },
    { id: 'events', name: 'События', icon: Calendar },
    { id: 'places', name: 'Места и отзывы', icon: MapPin },
    { id: 'routes', name: 'Маршруты', icon: Route },
    { id: 'marketplace', name: 'Покупки', icon: ShoppingBag },
    { id: 'housing', name: 'Бронирования', icon: Home },
    { id: 'friends', name: 'Друзья', icon: Users },
    { id: 'messages', name: 'Сообщения', icon: MessageCircle },
    { id: 'settings', name: 'Настройки', icon: Settings },
    { id: 'awards', name: 'Награды', icon: Award }
  ];

  // VIP-specific demo data
  const demoActivities = [
    {
      id: 1,
      type: 'vip_event',
      title: 'Посетила VIP-премьеру в Оперном театре',
      date: '15 мая 2025',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      likes: 124,
      comments: 15,
      vipBadge: true
    },
    {
      id: 2,
      type: 'review',
      title: 'Эксклюзивный отзыв о новом ресторане "La Maison"',
      date: '12 мая 2025',
      rating: 5,
      content: 'Великолепная атмосфера и изысканная кухня. Особая благодарность шеф-повару за персональные рекомендации.',
      likes: 98,
      vipBadge: true
    },
    {
      id: 3,
      type: 'route',
      title: 'Создала премиум-маршрут "Гастрономическое путешествие"',
      date: '10 мая 2025',
      distance: '4.5 км',
      duration: '3 часа',
      likes: 156,
      vipBadge: true
    }
  ];

  const demoEvents = [
    {
      id: 1,
      title: 'VIP-ложа на премьере балета',
      date: '20 мая 2025',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Новосибирский театр оперы и балета',
      vipPerks: ['Отдельный вход', 'Персональный консьерж', 'Праздничный фуршет']
    },
    {
      id: 2,
      title: 'Закрытая дегустация вин',
      date: '25 мая 2025',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Винный бутик "Le Cave"',
      vipPerks: ['Эксклюзивная коллекция', 'Встреча с сомелье', 'Подарочный набор']
    }
  ];

  const demoPlaces = [
    {
      id: 1,
      name: 'La Maison Restaurant',
      rating: 5,
      date: '12 мая 2025',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      review: 'Изысканная кухня и безупречный сервис. VIP-зал превзошел все ожидания.',
      vipPerks: ['Приоритетное бронирование', 'Особое меню', 'Личный официант']
    },
    {
      id: 2,
      name: 'Спа-центр "Oasis"',
      rating: 5,
      date: '5 мая 2025',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      review: 'Непревзойденный уровень релаксации и комфорта. VIP-программа стоит каждой копейки.',
      vipPerks: ['Отдельный кабинет', 'Расширенное время сеансов', 'Премиум-косметика']
    }
  ];

  const demoRoutes = [
    {
      id: 1,
      name: 'Гастрономическое путешествие',
      distance: '4.5 км',
      duration: '3 часа',
      date: '10 мая 2025',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      points: 8,
      vipPerks: ['Бронирование столиков', 'Особое меню', 'Трансфер']
    },
    {
      id: 2,
      name: 'Культурные жемчужины',
      distance: '6 км',
      duration: '4 часа',
      date: '1 мая 2025',
      image: 'https://images.unsplash.com/photo-1577720643272-6c6bb5cb4b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      points: 10,
      vipPerks: ['Личный гид', 'Доступ к закрытым экспозициям', 'Сувениры']
    }
  ];

  const demoPurchases = [
    {
      id: 1,
      name: 'VIP-абонемент в спа',
      price: 25000,
      date: '14 мая 2025',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      vipPerks: ['Безлимитное посещение', 'Персональный менеджер', 'Премиум-услуги']
    },
    {
      id: 2,
      name: 'Коллекционное вино',
      price: 35000,
      date: '20 мая 2025',
      status: 'processing',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      vipPerks: ['Сертификат подлинности', 'Особые условия хранения', 'Доставка']
    }
  ];

  const demoBookings = [
    {
      id: 1,
      name: 'Президентский люкс',
      dates: '15-17 мая 2025',
      price: 35000,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      vipPerks: ['Ранний заезд', 'Персональный батлер', 'Спа-процедуры включены']
    },
    {
      id: 2,
      name: 'Вилла с бассейном',
      dates: '20-25 мая 2025',
      price: 52000,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1518998595787-967065c02967?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      vipPerks: ['Трансфер', 'Личный повар', 'Консьерж-сервис']
    }
  ];

  const demoFriends = [
    {
      id: 1,
      name: 'Михаил Соколов',
      status: 'VIP-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 25,
      vipBadge: true
    },
    {
      id: 2,
      name: 'Елена Волкова',
      status: 'PRO-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 18,
      vipBadge: false
    }
  ];

  const demoMessages = [
    {
      id: 1,
      sender: 'Михаил Соколов',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      message: 'Увидимся на VIP-премьере в пятницу?',
      date: '15:30',
      unread: true,
      vipBadge: true
    },
    {
      id: 2,
      sender: 'Елена Волкова',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      message: 'Спасибо за приглашение на закрытую дегустацию!',
      date: 'Вчера',
      unread: false,
      vipBadge: false
    }
  ];

  const demoAwards = [
    {
      id: 1,
      name: 'VIP Эксперт',
      icon: Diamond,
      description: 'Посетила 20 VIP-мероприятий',
      date: '10 мая 2025',
      progress: 100,
      vipBadge: true
    },
    {
      id: 2,
      name: 'Гурман',
      icon: Star,
      description: 'Оставила 50 отзывов о ресторанах',
      date: '5 мая 2025',
      progress: 80,
      vipBadge: true
    },
    {
      id: 3,
      name: 'Путешественник',
      icon: Route,
      description: 'Создала 10 премиум-маршрутов',
      date: '1 мая 2025',
      progress: 60,
      vipBadge: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          На главную
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full ring-4 ring-yellow-400"
                />
                <button className="absolute bottom-0 right-0 bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <button className="ml-2 text-gray-400 hover:text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center mt-1">
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    {user.status}
                  </span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-500">С нами с {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-500">{user.friends} друзей</span>
                  <span className="text-gray-500">{user.followers} подписчиков</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-6 w-6 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-600">{user.tokens.balance} SIBT</span>
              </div>
              <div className="text-sm text-gray-500">
                <div>Заработано: {user.tokens.earned} SIBT</div>
                <div>Потрачено: {user.tokens.spent} SIBT</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.events}</div>
              <div className="text-sm text-gray-500">мероприятий</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.reviews}</div>
              <div className="text-sm text-gray-500">отзывов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.posts}</div>
              <div className="text-sm text-gray-500">публикаций</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Activity Feed Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Создать публикацию</h3>
                </div>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-4 mb-4"
                  placeholder="Поделитесь своими VIP-впечатлениями..."
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-yellow-600">
                      <Camera className="h-5 w-5 mr-2" />
                      Фото/Видео
                    </button>
                  </div>
                  <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500">
                    Опубликовать
                  </button>
                </div>
              </div>

              {demoActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full ring-2 ring-yellow-400"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        {activity.vipBadge && (
                          <span className="ml-2">
                            <Crown className="h-4 w-4 text-yellow-400" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  
                  {activity.image && (
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <h3 className="text-lg font-medium mb-2">{activity.title}</h3>
                  
                  {'content' in activity && (
                    <p className="text-gray-600 mb-4">{activity.content}</p>
                  )}
                  
                  {'rating' in activity && (
                    <div className="flex items-center mb-4">
                      {Array.from({ length: activity.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                  
                  {'distance' in activity && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <Route className="h-5 w-5 mr-2" />
                      <span>{activity.distance}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{activity.duration}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center hover:text-yellow-600">
                      <Heart className="h-5 w-5 mr-1" />
                      <span>{activity.likes}</span>
                    </button>
                    {'comments' in activity && (
                      <button className="flex items-center hover:text-yellow-600">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        <span>{activity.comments}</span>
                      </button>
                    )}
                    <button className="flex items-center hover:text-yellow-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">VIP-события</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
                          <Crown className="h-4 w-4 mr-1" />
                          <span>VIP</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{event.title}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-sm text-yellow-600">VIP-привилегии:</h5>
                          {event.vipPerks.map((perk, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            event.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.status === 'confirmed' ? 'Подтверждено' : 'Скоро'}
                          </span>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Places Tab */}
          {activeTab === 'places' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">VIP-отзывы</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoPlaces.map((place) => (
                    <div key={place.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
                          <Crown className="h-4 w-4 mr-1" />
                          <span>VIP</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{place.name}</h4>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: place.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                          <span className="ml-2 text-gray-600">{place.date}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{place.review}</p>
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-sm text-yellow-600">VIP-привилегии:</h5>
                          {place.vipPerks.map((perk, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <button className="flex items-center text-gray-600 hover:text-yellow-600">
                            <Edit className="h-5 w-5 mr-2" />
                            Редактировать
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">VIP-маршруты</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoRoutes.map((route) => (
                    <div key={route.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={route.image}
                          alt={route.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
                          <Crown className="h-4 w-4 mr-1" />
                          <span>VIP</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{route.name}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Route className="h-5 w-5 mr-2" />
                          <span>{route.distance}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-5 w-5 mr-2" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{route.points} точек маршрута</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-sm text-yellow-600">VIP-привилегии:</h5>
                          {route.vipPerks.map((perk, index) => (
                            
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{route.date}</span>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Marketplace Tab */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">VIP-покупки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoPurchases.map((purchase) => (
                    <div key={purchase.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={purchase.image}
                          alt={purchase.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
                          <Crown className="h-4 w-4 mr-1" />
                          <span>VIP</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{purchase.name}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{purchase.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Coins className="h-5 w-5 mr-2" />
                          <span>{purchase.price} ₽</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-sm text-yellow-600">VIP-привилегии:</h5>
                          {purchase.vipPerks.map((perk, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            purchase.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {purchase.status === 'active' ? 'Активно' : 'В обработке'}
                          </span>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Housing Tab */}
          {activeTab === 'housing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">VIP-бронирования</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={booking.image}
                          alt={booking.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
                          <Crown className="h-4 w-4 mr-1" />
                          <span>VIP</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{booking.name}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{booking.dates}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Coins className="h-5 w-5 mr-2" />
                          <span>{booking.price} ₽/сутки</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-sm text-yellow-600">VIP-привилегии:</h5>
                          {booking.vipPerks.map((perk, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className="h-4 w-4 text-yellow-400 mr-2" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'Подтверждено' : 'В обработке'}
                          </span>
                          <button className="text-yellow-600 hover:text-yellow-800">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">VIP-друзья</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Поиск друзей..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="h-16 w-16 rounded-full"
                        />
                        {friend.vipBadge && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                            <Crown className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-lg">{friend.name}</h4>
                        <span className="text-sm text-gray-600">{friend.status}</span>
                        <p className="text-sm text-gray-500 mt-1">
                          {friend.mutualFriends} общих друзей
                        </p>
                      </div>
                      <button className="ml-auto text-yellow-600 hover:text-yellow-800">
                        Написать
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">VIP-сообщения</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Поиск в сообщениях..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  {demoMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-center p-4 border border-gray-200 rounded-lg ${
                        message.unread ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={message.avatar}
                          alt={message.sender}
                          className="h-12 w-12 rounded-full"
                        />
                        {message.vipBadge && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                            <Crown className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{message.sender}</h4>
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{message.message}</p>
                      </div>
                      {message.unread && (
                        <div className="ml-4 h-3 w-3 bg-yellow-400 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">VIP-настройки</h3>
                
                <div className="space-y-6">
                  {/* Profile Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-medium mb-4">Профиль</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Имя
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value="anna.petrova@example.com"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value="+7 (999) 123-45-67"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Город
                        </label>
                        <input
                          type="text"
                          value="Новосибирск"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* VIP Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-medium mb-4">VIP-настройки</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Crown className="h-5 w-5 text-yellow-400 mr-3" />
                          <span>Приоритетное обслуживание</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Gift className="h-5 w-5 text-yellow-400 mr-3" />
                          <span>VIP-бонусы</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ShieldCheck className="h-5 w-5 text-yellow-400 mr-3" />
                          <span>Расширенная защита</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-medium mb-4">Уведомления</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <span>VIP-события</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <span>VIP-рассылка</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-medium mb-4">Приватность</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-gray-400 mr-3" />
                          <span>Закрытый VIP-профиль</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPinOff className="h-5 w-5 text-gray-400 mr-3" />
                          <span>Скрывать геолокацию</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Settings */}
                  <div>
                    <h4 className="text-lg font-medium mb-4">VIP-платежи</h4>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <CreditCard className="h-6 w-6 text-yellow-400 mr-3" />
                        <div>
                          <h5 className="font-medium">Visa **** 4242</h5>
                          <p className="text-sm text-gray-500">Действует до 03/26</p>
                        </div>
                        <button className="ml-auto text-yellow-600 hover:text-yellow-800">
                          Изменить
                        </button>
                      </div>
                      <button className="flex items-center text-yellow-600 hover:text-yellow-800">
                        <Wallet className="h-5 w-5 mr-2" />
                        Добавить способ оплаты
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Awards Tab */}
          {activeTab === 'awards' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">VIP-награды</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoAwards.map((award) => (
                    <div key={award.id} className="flex flex-col items-center p-6 border border-gray-200 rounded-lg">
                      <award.icon className="h-12 w-12 text-yellow-400 mb-4" />
                      <h4 className="text-lg font-medium text-center mb-2">{award.name}</h4>
                      <p className="text-sm text-gray-600 text-center mb-4">{award.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div
                          className="bg-yellow-400 h-2.5 rounded-full"
                          style={{ width: `${award.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{award.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VIPProfilePage;