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
  Compass, Clipboard, Sliders
} from 'lucide-react';

const PROProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const user = {
    name: 'Михаил Сидоров',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'PRO-Соучастник',
    joinDate: '15 марта 2025',
    friends: 512,
    followers: 1024,
    stats: {
      events: 45,
      reviews: 128,
      posts: 256
    },
    tokens: {
      balance: 5000,
      earned: 12000,
      spent: 7000
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Панель управления', icon: BarChart },
    { id: 'clans', name: 'Управление кланами', icon: Users },
    { id: 'events', name: 'События', icon: Calendar },
    { id: 'marketplace', name: 'Маркетплейс PRO', icon: ShoppingBag },
    { id: 'consulting', name: 'Консультации', icon: Briefcase },
    { id: 'finance', name: 'Финансы', icon: DollarSign },
    { id: 'affiliate', name: 'Партнёрская программа', icon: UserPlus },
    { id: 'housing', name: 'Жильё', icon: Home },
    { id: 'social', name: 'Социальные функции', icon: Megaphone },
    { id: 'messages', name: 'Сообщения', icon: MessageCircle },
    { id: 'settings', name: 'Настройки', icon: Settings }
  ];

  // Dashboard demo data
  const dashboardStats = {
    earnings: {
      total: 125000,
      monthly: 15000,
      growth: 23
    },
    referrals: {
      total: 156,
      active: 89,
      pending: 12
    },
    events: {
      total: 45,
      upcoming: 8,
      participants: 1250
    },
    clans: {
      total: 3,
      members: 450,
      rating: 4.8
    }
  };

  // Clans demo data
  const clans = [
    {
      id: 1,
      name: 'Активный Новосибирск',
      members: 156,
      rating: 4.8,
      events: 12,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      category: 'Спорт и здоровье'
    },
    {
      id: 2,
      name: 'Культурный код',
      members: 98,
      rating: 4.6,
      events: 8,
      image: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      category: 'Искусство и культура'
    },
    {
      id: 3,
      name: 'IT-Community NSK',
      members: 234,
      rating: 4.9,
      events: 15,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      category: 'Технологии'
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
                  className="w-24 h-24 rounded-full ring-4 ring-indigo-400"
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
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Earnings Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Доходы</h3>
                    <DollarSign className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.earnings.total} ₽</span>
                      <span className="text-green-500 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {dashboardStats.earnings.growth}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">За месяц: {dashboardStats.earnings.monthly} ₽</p>
                  </div>
                </div>

                {/* Referrals Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Рефералы</h3>
                    <UserPlus className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.referrals.total}</span>
                      <span className="text-sm text-gray-500">
                        {dashboardStats.referrals.active} активных
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Ожидают: {dashboardStats.referrals.pending}</p>
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

                {/* Clans Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Кланы</h3>
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{dashboardStats.clans.total}</span>
                      <span className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {dashboardStats.clans.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Участников: {dashboardStats.clans.members}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clans Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Мои кланы</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Создать клан
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clans.map((clan) => (
                    <div key={clan.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-4">
                        <img
                          src={clan.image}
                          alt={clan.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="ml-3">
                          <h4 className="font-medium">{clan.name}</h4>
                          <span className="text-sm text-gray-500">{clan.category}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Участники</span>
                          <span className="font-medium">{clan.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">События</span>
                          <span className="font-medium">{clan.events}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Рейтинг</span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {clan.rating}
                          </span>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Управление
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs will be implemented next */}
        </div>
      </div>
    </div>
  );
};

export default PROProfilePage;