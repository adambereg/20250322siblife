import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Calendar, MapPin, Route, ShoppingBag, Home, Users,
  MessageCircle, Settings, Award, ChevronLeft, Camera, Edit,
  Star, Heart, Share2, ThumbsUp, MessageSquare, Clock, Phone,
  Mail, Bell, Lock, Globe, CheckCircle2, MapPinOff, Wallet,
  CreditCard, Search, Send, Coins, Gift, ShieldCheck, Trophy,
  Target, Map, Coffee, Ticket, UserPlus
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const navigate = useNavigate();

  const user = {
    name: 'Иван Петров',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'Participant',
    joinDate: '15 марта 2025',
    friends: 128,
    followers: 256,
    stats: {
      events: 15,
      reviews: 24,
      posts: 42
    },
    tokens: {
      balance: 1250,
      earned: 2500,
      spent: 1250
    }
  };

  const tabs = [
    { id: 'activity', name: 'Лента активности', icon: User },
    { id: 'events', name: 'События', icon: Calendar },
    { id: 'places', name: 'Места и отзывы', icon: MapPin },
    { id: 'routes', name: 'Маршруты', icon: Route },
    { id: 'marketplace', name: 'Покупки', icon: ShoppingBag },
    { id: 'housing', name: 'Бронирования', icon: Home },
    { id: 'referrals', name: 'Мои рефералы', icon: UserPlus },
    { id: 'friends', name: 'Друзья', icon: Users },
    { id: 'messages', name: 'Сообщения', icon: MessageCircle },
    { id: 'settings', name: 'Настройки', icon: Settings },
    { id: 'awards', name: 'Награды', icon: Award }
  ];

  // Demo data for activity feed
  const activities = [
    {
      id: 1,
      type: 'event',
      title: 'Посетил фестиваль "Urban Fest 2025"',
      date: '15 мая 2025',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      type: 'review',
      title: 'Оставил отзыв о "Новосибирский театр оперы и балета"',
      date: '12 мая 2025',
      rating: 5,
      content: 'Потрясающая постановка "Лебединого озера"! Обязательно приду снова.',
      likes: 18
    },
    {
      id: 3,
      type: 'route',
      title: 'Создал новый маршрут "Исторический центр"',
      date: '10 мая 2025',
      distance: '3.5 км',
      duration: '2 часа',
      likes: 32
    }
  ];

  // Demo data for events
  const events = [
    {
      id: 1,
      title: 'Urban Fest 2025',
      date: '15 мая 2025',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Михайловская набережная'
    },
    {
      id: 2,
      title: 'Выставка современного искусства',
      date: '20 мая 2025',
      status: 'interested',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Центр культуры и отдыха'
    }
  ];

  // Demo data for places
  const places = [
    {
      id: 1,
      name: 'Новосибирский театр оперы и балета',
      rating: 5,
      date: '12 мая 2025',
      image: 'https://images.unsplash.com/photo-1518998595787-967065c02967?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      review: 'Потрясающая постановка "Лебединого озера"! Обязательно приду снова.'
    },
    {
      id: 2,
      name: 'Центральный парк',
      rating: 4,
      date: '5 мая 2025',
      image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      review: 'Отличное место для прогулок и отдыха.'
    }
  ];

  // Demo data for routes
  const routes = [
    {
      id: 1,
      name: 'Исторический центр',
      distance: '3.5 км',
      duration: '2 часа',
      date: '10 мая 2025',
      image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      points: 5
    },
    {
      id: 2,
      name: 'Архитектурные памятники',
      distance: '5 км',
      duration: '3 часа',
      date: '1 мая 2025',
      image: 'https://images.unsplash.com/photo-1577720643272-6c6bb5cb4b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      points: 7
    }
  ];

  // Demo data for purchases
  const purchases = [
    {
      id: 1,
      name: 'Футболка Urban Fest 2025',
      price: 2500,
      date: '14 мая 2025',
      status: 'delivered',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Билет на мастер-класс по кофе',
      price: 3500,
      date: '20 мая 2025',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Demo data for bookings
  const bookings = [
    {
      id: 1,
      name: 'Современная студия в центре',
      dates: '15-17 мая 2025',
      price: 3500,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Люкс в Марриотт',
      dates: '20 мая 2025',
      price: 12000,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Demo data for friends
  const friends = [
    {
      id: 1,
      name: 'Анна Петрова',
      status: 'VIP-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 15
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      status: 'PRO-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 8
    }
  ];

  // Demo data for messages
  const messages = [
    {
      id: 1,
      sender: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      message: 'Привет! Идёшь на Urban Fest в эти выходные?',
      date: '15:30',
      unread: true
    },
    {
      id: 2,
      sender: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      message: 'Спасибо за рекомендацию маршрута!',
      date: 'Вчера',
      unread: false
    }
  ];

  // Demo data for awards
  const awards = [
    {
      id: 1,
      name: 'Городской исследователь',
      icon: Map,
      description: 'Посетил 10 новых мест',
      date: '10 мая 2025',
      progress: 100
    },
    {
      id: 2,
      name: 'Активный участник',
      icon: Star,
      description: 'Посетил 5 мероприятий',
      date: '5 мая 2025',
      progress: 80
    },
    {
      id: 3,
      name: 'Путешественник',
      icon: Route,
      description: 'Создал 3 маршрута',
      date: '1 мая 2025',
      progress: 60
    }
  ];

  // Demo data for referrals
  const recentReferrals = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'VIP-Соучастник',
      date: '15 мая 2025',
      earned: 500
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'PRO-Соучастник',
      date: '10 мая 2025',
      earned: 750
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
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
                  className="w-24 h-24 rounded-full"
                />
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
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
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
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
                <Coins className="h-6 w-6 text-indigo-600" />
                <span className="text-2xl font-bold text-indigo-600">{user.tokens.balance} SIBT</span>
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

        {/* Activity Feed Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Что у вас нового?"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-indigo-600">
                        <Camera className="h-5 w-5" />
                      </button>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      Опубликовать
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-2">{activity.title}</h3>

                {activity.image && (
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

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
                  <button className="flex items-center hover:text-indigo-600">
                    <Heart className="h-5 w-5 mr-1" />
                    <span>{activity.likes}</span>
                  </button>
                  {'comments' in activity && (
                    <button className="flex items-center hover:text-indigo-600">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      <span>{activity.comments}</span>
                    </button>
                  )}
                  <button className="flex items-center hover:text-indigo-600">
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
              <h3 className="text-xl font-semibold mb-4">Мои события</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
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
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          event.status === 'upcoming'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status === 'upcoming' ? 'Скоро' : 'Интересует'}
                        </span>
                        <button className="text-indigo-600 hover:text-indigo-800">
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
              <h3 className="text-xl font-semibold mb-4">Мои отзывы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {places.map((place) => (
                  <div key={place.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-lg mb-2">{place.name}</h4>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: place.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-2 text-gray-600">{place.date}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{place.review}</p>
                      <div className="flex justify-between items-center">
                        <button className="flex items-center text-gray-600 hover:text-indigo-600">
                          <Edit className="h-5 w-5 mr-2" />
                          Редактировать
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-800">
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
              <h3 className="text-xl font-semibold mb-4">Мои маршруты</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routes.map((route) => (
                  <div key={route.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-48 object-cover"
                    />
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
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{route.date}</span>
                        <button className="text-indigo-600 hover:text-indigo-800">
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
              <h3 className="text-xl font-semibold mb-4">Мои покупки</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={purchase.image}
                      alt={purchase.name}
                      className="w-full h-48 object-cover"
                    />
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
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          purchase.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {purchase.status === 'delivered' ? 'Доставлено' : 'В обработке'}
                        </span>
                        <button className="text-indigo-600 hover:text-indigo-800">
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
              <h3 className="text-xl font-semibold mb-4">Мои бронирования</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.name}
                      className="w-full h-48 object-cover"
                    />
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
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' ? 'Подтверждено' : 'В обработке'}
                        </span>
                        <button className="text-indigo-600 hover:text-indigo-800">
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

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            {/* Referral Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Реферальная программа</h2>
                  <p className="text-gray-600 mt-1">
                    Приглашайте друзей и зарабатывайте вместе с нами
                  </p>
                </div>
                <button
                  onClick={() => navigate('/referrals')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Пригласить друзей
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Рефералы</h3>
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">
                    8 активных
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Заработано</h3>
                    <Coins className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1500 SIBT</div>
                  <div className="text-sm text-gray-500">
                    за все время
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Достижения</h3>
                    <Trophy className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">3/10</div>
                  <div className="text-sm text-gray-500">
                    выполнено
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Последние рефералы</h3>
                <button
                  onClick={() => navigate('/referrals')}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Смотреть все
                </button>
              </div>

              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <img
                      src={referral.avatar}
                      alt={referral.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{referral.name}</h4>
                        <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {referral.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{referral.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{referral.earned} SIBT</div>
                      <div className="text-sm text-gray-500">заработано</div>
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
                <h3 className="text-xl font-semibold">Мои друзья</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск друзей..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-lg">{friend.name}</h4>
                      <span className="text-sm text-gray-600">{friend.status}</span>
                      <p className="text-sm text-gray-500 mt-1">
                        {friend.mutualFriends} общих друзей
                      </p>
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

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Сообщения</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск в сообщениях..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-center p-4 border border-gray-200 rounded-lg ${
                      message.unread ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{message.sender}</h4>
                        <span className="text-sm text-gray-500">{message.date}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{message.message}</p>
                    </div>
                    {message.unread && (
                      <div className="ml-4 h-3 w-3 bg-indigo-600 rounded-full"></div>
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
              <h3 className="text-xl font-semibold mb-6">Настройки</h3>
              
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value="ivan.petrov@example.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value="+7 (999) 123-45-67"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Город
                      </label>
                      <input
                        type="text"
                        value="Новосибирск"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
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
                        <span>Push-уведомления</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Email-уведомления</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
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
                        <span>Закрытый профиль</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPinOff className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Скрывать геолокацию</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Settings */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Способы оплаты</h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                      <div>
                        <h5 className="font-medium">Visa **** 4242</h5>
                        <p className="text-sm text-gray-500">Действует до 03/26</p>
                      </div>
                      <button className="ml-auto text-indigo-600 hover:text-indigo-800">
                        Изменить
                      </button>
                    </div>
                    <button className="flex items-center text-indigo-600 hover:text-indigo-800">
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
              <h3 className="text-xl font-semibold mb-6">Мои награды</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((award) => (
                  <div key={award.id} className="flex flex-col items-center p-6 border border-gray-200 rounded-lg">
                    <award.icon className="h-12 w-12 text-indigo-600 mb-4" />
                    <h4 className="text-lg font-medium text-center mb-2">{award.name}</h4>
                    <p className="text-sm text-gray-600 text-center mb-4">{award.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
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
  );
};

export default ProfilePage;