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
  ShieldPlus, Percent, Handshake, LineChart, Activity
} from 'lucide-react';

const BusinessProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const business = {
    name: 'Coffee Lab',
    logo: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    cover: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    type: 'Бизнес-партнёр',
    category: 'Кафе и рестораны',
    joinDate: '15 марта 2025',
    followers: 1250,
    rating: 4.9,
    reviews: 256,
    stats: {
      products: 45,
      events: 12,
      orders: 1280
    },
    tokens: {
      balance: 15000,
      earned: 25000,
      spent: 10000
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Панель управления', icon: BarChart },
    { id: 'profile', name: 'Профиль компании', icon: Building2 },
    { id: 'products', name: 'Товары и услуги', icon: Package },
    { id: 'events', name: 'Мероприятия', icon: Calendar },
    { id: 'analytics', name: 'Аналитика', icon: LineChart },
    { id: 'affiliate', name: 'Партнёрская программа', icon: Handshake },
    { id: 'advertising', name: 'Реклама', icon: Megaphone },
    { id: 'finance', name: 'Финансы', icon: DollarSign },
    { id: 'customers', name: 'Клиенты и отзывы', icon: Users },
    { id: 'messages', name: 'Сообщения', icon: MessageCircle },
    { id: 'settings', name: 'Настройки', icon: Settings }
  ];

  // Dashboard demo data
  const dashboardStats = {
    sales: {
      total: 850000,
      monthly: 125000,
      growth: 15
    },
    customers: {
      total: 3450,
      new: 156,
      returning: 78
    },
    orders: {
      total: 1280,
      pending: 45,
      completed: 1235
    },
    events: {
      total: 12,
      upcoming: 4,
      participants: 450
    }
  };

  // Products demo data
  const products = [
    {
      id: 1,
      name: 'Мастер-класс по кофе',
      type: 'service',
      price: 3500,
      sold: 156,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Кофе в зёрнах Premium',
      type: 'product',
      price: 1200,
      sold: 89,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1587734005433-8a2fb686e4b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Подарочный сертификат',
      type: 'certificate',
      price: 5000,
      sold: 45,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Events demo data
  const events = [
    {
      id: 1,
      title: 'Мастер-класс по латте-арту',
      date: '20 мая 2025',
      participants: 24,
      price: 3500,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Дегустация редких сортов',
      date: '25 мая 2025',
      participants: 18,
      price: 2500,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // Analytics demo data
  const analyticsData = {
    views: {
      total: 25600,
      growth: 12,
      chart: [45, 52, 38, 45, 19, 23, 25]
    },
    conversion: {
      rate: 3.2,
      growth: 0.5,
      chart: [2.8, 2.9, 3.0, 3.1, 3.2, 3.2, 3.2]
    },
    revenue: {
      total: 850000,
      growth: 15,
      chart: [125000, 130000, 115000, 140000, 125000, 135000, 150000]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          На главную
        </Link>

        {/* Business Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-48">
            <img
              src={business.cover}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="relative -mt-20">
                  <img
                    src={business.logo}
                    alt={business.name}
                    className="w-24 h-24 rounded-xl ring-4 ring-white bg-white"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="ml-6">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
                    <button className="ml-2 text-gray-400 hover:text-gray-500">
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {business.type}
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{business.category}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{business.rating}</span>
                      <span className="mx-1">•</span>
                      <span className="text-gray-500">{business.reviews} отзывов</span>
                    </div>
                    <span className="text-gray-500">{business.followers} подписчиков</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-4">
                  <Coins className="h-6 w-6 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-600">{business.tokens.balance} SIBT</span>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Заработано: {business.tokens.earned} SIBT</div>
                  <div>Потрачено: {business.tokens.spent} SIBT</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{business.stats.products}</div>
                <div className="text-sm text-gray-500">товаров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{business.stats.events}</div>
                <div className="text-sm text-gray-500">мероприятий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{business.stats.orders}</div>
                <div className="text-sm text-gray-500">заказов</div>
              </div>
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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sales Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Продажи</h3>
                    <DollarSign className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.sales.total} ₽</span>
                      <span className="text-green-500 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {dashboardStats.sales.growth}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">За месяц: {dashboardStats.sales.monthly} ₽</p>
                  </div>
                </div>

                {/* Customers Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Клиенты</h3>
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.customers.total}</span>
                      <span className="text-sm text-gray-500">
                        +{dashboardStats.customers.new} новых
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Вернулись: {dashboardStats.customers.returning}
                    </p>
                  </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Заказы</h3>
                    <Package className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.orders.total}</span>
                      <span className="text-sm text-gray-500">
                        {dashboardStats.orders.pending} в обработке
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Выполнено: {dashboardStats.orders.completed}
                    </p>
                  </div>
                </div>

                {/* Events Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">События</h3>
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.events.total}</span>
                      <span className="text-sm text-gray-500">
                        {dashboardStats.events.upcoming} предстоящих
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Участников: {dashboardStats.events.participants}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Популярные товары и услуги</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Добавить товар
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-800">
                            {product.type === 'service' ? 'Услуга' : 
                             product.type === 'certificate' ? 'Сертификат' : 'Товар'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900">{product.price} ₽</span>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Продано: {product.sold}
                        </p>
                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                          Управление
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Предстоящие мероприятия</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Создать событие
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2">{event.title}</h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-5 w-5 mr-2" />
                            <span>{event.participants} участников</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Coins className="h-5 w-5 mr-2" />
                            <span>{event.price} ₽</span>
                          </div>
                        </div>
                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                          Управление
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Аналитика</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Подробный отчёт
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Views Analytics */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Просмотры</h4>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{analyticsData.views.growth}%
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-4">
                      {analyticsData.views.total}
                    </div>
                    <div className="h-16 flex items-end space-x-1">
                      {analyticsData.views.chart.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-indigo-100 rounded-t"
                          style={{ height: `${(value / 60) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Conversion Analytics */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Конверсия</h4>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{analyticsData.conversion.growth}%
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-4">
                      {analyticsData.conversion.rate}%
                    </div>
                    <div className="h-16 flex items-end space-x-1">
                      {analyticsData.conversion.chart.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-green-100 rounded-t"
                          style={{ height: `${(value / 4) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Revenue Analytics */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Выручка</h4>
                      <span className="text-green-500 flex items-center text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{analyticsData.revenue.growth}%
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-4">
                      {analyticsData.revenue.total} ₽
                    </div>
                    <div className="h-16 flex items-end space-x-1">
                      {analyticsData.revenue.chart.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-yellow-100 rounded-t"
                          style={{ height: `${(value / 160000) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
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

export default BusinessProfilePage;