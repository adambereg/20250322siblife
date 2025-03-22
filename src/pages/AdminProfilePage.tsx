import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Calendar, MapPin, Route, ShoppingBag, Home, Users,
  MessageCircle, Settings, Award, ChevronLeft, Camera, Edit,
  Star, Heart, Share2, ThumbsUp, MessageSquare, Clock, Phone,
  Mail, Bell, Lock, Globe, CheckCircle2, MapPinOff, Wallet,
  CreditCard, Search, Send, Coins, Gift, ShieldCheck, Trophy,
  Target, Map, Coffee, Ticket, Crown, Diamond, Sparkles,
  Building2, Briefcase, DollarSign, UserPlus, Megaphone,
  BarChart, PieChart, TrendingUp, FileText, Zap, Layers,
  Compass, Clipboard, Sliders, Store, Package, Tag, Truck,
  ShieldPlus, Percent, Handshake, LineChart, Activity,
  AlertTriangle, Ban, CheckCircle, Eye, Flag, HelpCircle,
  LayoutDashboard, List, Newspaper, Settings2, UserCog,
  Shield
} from 'lucide-react';

const AdminProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const admin = {
    name: 'Администратор системы',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    role: 'Главный администратор',
    stats: {
      users: 12500,
      events: 450,
      places: 850,
      orders: 2800
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Панель управления', icon: LayoutDashboard },
    { id: 'users', name: 'Пользователи', icon: Users },
    { id: 'events', name: 'События', icon: Calendar },
    { id: 'places', name: 'Места', icon: MapPin },
    { id: 'marketplace', name: 'Маркетплейс', icon: ShoppingBag },
    { id: 'housing', name: 'Жильё', icon: Home },
    { id: 'gamification', name: 'Геймификация', icon: Trophy },
    { id: 'affiliate', name: 'Партнёрская программа', icon: Handshake },
    { id: 'analytics', name: 'Аналитика', icon: LineChart },
    { id: 'content', name: 'Контент', icon: Newspaper },
    { id: 'advertising', name: 'Реклама', icon: Megaphone },
    { id: 'support', name: 'Поддержка', icon: HelpCircle },
    { id: 'technical', name: 'Технические настройки', icon: Settings2 },
    { id: 'access', name: 'Управление доступом', icon: UserCog }
  ];

  // Dashboard demo data
  const dashboardStats = {
    platform: {
      users: {
        total: 12500,
        new: 250,
        active: 8500,
        distribution: {
          participant: 10000,
          vip: 1500,
          pro: 800,
          business: 200
        }
      },
      visits: {
        daily: 15000,
        monthly: 450000,
        growth: 12
      },
      revenue: {
        total: 2500000,
        monthly: 350000,
        growth: 15
      }
    },
    moderation: {
      pending: {
        users: 45,
        events: 23,
        reviews: 78,
        places: 12
      },
      reported: {
        content: 34,
        users: 15,
        comments: 56
      }
    }
  };

  // Users demo data
  const recentUsers = [
    {
      id: 1,
      name: 'Анна Петрова',
      type: 'VIP-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'active',
      registrationDate: '15.05.2025'
    },
    {
      id: 2,
      name: 'Coffee Lab',
      type: 'Бизнес-партнёр',
      avatar: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'pending',
      registrationDate: '14.05.2025'
    },
    {
      id: 3,
      name: 'Михаил Сидоров',
      type: 'PRO-Соучастник',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'active',
      registrationDate: '13.05.2025'
    }
  ];

  // System alerts demo data
  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Высокая нагрузка на сервер',
      time: '15:30',
      details: 'CPU использование > 80%'
    },
    {
      id: 2,
      type: 'error',
      message: 'Ошибка в платёжной системе',
      time: '14:45',
      details: 'Временные сбои при обработке платежей'
    },
    {
      id: 3,
      type: 'success',
      message: 'Бэкап успешно завершён',
      time: '14:00',
      details: 'Размер: 2.5 GB'
    }
  ];

  // Recent activities demo data
  const recentActivities = [
    {
      id: 1,
      type: 'moderation',
      action: 'Одобрено мероприятие',
      target: 'Фестиваль уличной культуры',
      time: '15:45',
      user: 'Модератор Иван'
    },
    {
      id: 2,
      type: 'user',
      action: 'Блокировка пользователя',
      target: 'user123',
      time: '15:30',
      user: 'Администратор Анна'
    },
    {
      id: 3,
      type: 'system',
      action: 'Обновление системы',
      target: 'v2.5.0',
      time: '15:00',
      user: 'Система'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-800 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          На главную
        </Link>

        {/* Admin Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  className="w-24 h-24 rounded-full ring-4 ring-red-400"
                />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full">
                  <Shield className="h-4 w-4" />
                </div>
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">{admin.name}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    {admin.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Системные оповещения
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
                <Settings2 className="h-5 w-5 mr-2" />
                Настройки системы
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{admin.stats.users}</div>
              <div className="text-sm text-gray-500">пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{admin.stats.events}</div>
              <div className="text-sm text-gray-500">мероприятий</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{admin.stats.places}</div>
              <div className="text-sm text-gray-500">мест</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{admin.stats.orders}</div>
              <div className="text-sm text-gray-500">заказов</div>
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
                    ? 'bg-red-600 text-white'
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
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Platform Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Пользователи</h3>
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.platform.users.total}</span>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.platform.users.new} новых
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Participant</span>
                        <span>{dashboardStats.platform.users.distribution.participant}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>VIP</span>
                        <span>{dashboardStats.platform.users.distribution.vip}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>PRO</span>
                        <span>{dashboardStats.platform.users.distribution.pro}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Business</span>
                        <span>{dashboardStats.platform.users.distribution.business}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visits Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Посещаемость</h3>
                    <Eye className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.platform.visits.daily}</span>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.platform.visits.growth}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>За день</span>
                        <span>{dashboardStats.platform.visits.daily}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>За месяц</span>
                        <span>{dashboardStats.platform.visits.monthly}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Доходы</h3>
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.platform.revenue.total} ₽</span>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{dashboardStats.platform.revenue.growth}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>За месяц</span>
                        <span>{dashboardStats.platform.revenue.monthly} ₽</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderation Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pending Moderation */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Ожидают модерации</h3>
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Пользователи</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.pending.users}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <span>События</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.pending.events}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Отзывы</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.pending.reviews}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Места</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.pending.places}</span>
                    </div>
                  </div>
                </div>

                {/* Reported Content */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Жалобы</h3>
                    <Flag className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Контент</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.reported.content}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Пользователи</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.reported.users}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Комментарии</span>
                      </div>
                      <span className="font-medium">{dashboardStats.moderation.reported.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities and System Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Последние действия</h3>
                    <Activity className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          {activity.type === 'moderation' && <CheckCircle className="h-5 w-5 text-green-500 mr-3" />}
                          {activity.type === 'user' && <Ban className="h-5 w-5 text-red-500 mr-3" />}
                          {activity.type === 'system' && <Settings2 className="h-5 w-5 text-blue-500 mr-3" />}
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.target}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{activity.time}</p>
                          <p className="text-sm font-medium">{activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Системные уведомления</h3>
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg ${
                        alert.type === 'warning' ? 'bg-yellow-50' :
                        alert.type === 'error' ? 'bg-red-50' :
                        'bg-green-50'
                      }`}>
                        <div className="flex items-center">
                          {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />}
                          {alert.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />}
                          {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mr-3" />}
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-gray-500">{alert.details}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{alert.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Новые пользователи</h3>
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status === 'active' ? 'Активен' : 'На модерации'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{user.registrationDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs will be implemented as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;