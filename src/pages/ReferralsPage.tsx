import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, ChevronLeft, QrCode, Copy, Share2, Trophy,
  Coins, UserPlus, Filter, Search, Calendar, Star,
  BarChart, PieChart, TrendingUp, HelpCircle, Award,
  Crown, Gift, Target, Medal, ArrowUpRight
} from 'lucide-react';

const ReferralsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data
  const referralStats = {
    totalReferrals: 156,
    activeReferrals: 124,
    subReferrals: 45,
    totalEarned: 25000,
    monthlyEarned: 3500,
    leaderboardRank: 12
  };

  const referrals = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'VIP-Соучастник',
      registrationDate: '15 мая 2025',
      activity: {
        events: 12,
        purchases: 5,
        tokens: 1500
      },
      earned: 2500
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      status: 'PRO-Соучастник',
      registrationDate: '10 мая 2025',
      activity: {
        events: 8,
        purchases: 3,
        tokens: 2000
      },
      earned: 3000
    }
  ];

  const achievements = [
    {
      id: 1,
      name: 'Первые 10 рефералов',
      icon: UserPlus,
      description: 'Пригласите 10 друзей на платформу',
      progress: 100,
      reward: 1000,
      completed: true
    },
    {
      id: 2,
      name: 'Активный рекрутер',
      icon: Trophy,
      description: 'Заработайте 10000 SIBT на рефералах',
      progress: 80,
      reward: 2000,
      completed: false
    },
    {
      id: 3,
      name: 'VIP-наставник',
      icon: Crown,
      description: 'Пригласите 5 VIP-пользователей',
      progress: 60,
      reward: 5000,
      completed: false
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Обзор', icon: BarChart },
    { id: 'referrals', name: 'Мои рефералы', icon: Users },
    { id: 'stats', name: 'Статистика', icon: PieChart },
    { id: 'achievements', name: 'Достижения', icon: Trophy },
    { id: 'faq', name: 'Как это работает?', icon: HelpCircle }
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://souchastniki.ru/ref/user123');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          На главную
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Реферальная программа</h1>
          <p className="text-xl text-gray-600">
            Приглашайте друзей и зарабатывайте вместе с нами
          </p>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Referral Link */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ваша реферальная ссылка</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value="https://souchastniki.ru/ref/user123"
                    readOnly
                    className="w-full pl-4 pr-20 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    QR-код
                  </button>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Поделиться
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Referrals Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Рефералы</h3>
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">{referralStats.totalReferrals}</span>
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +{referralStats.activeReferrals} активных
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Субрефералы: {referralStats.subReferrals}
                  </div>
                </div>
              </div>

              {/* Earnings Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Заработок</h3>
                  <Coins className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">{referralStats.totalEarned} SIBT</span>
                    <span className="text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +{referralStats.monthlyEarned} за месяц
                    </span>
                  </div>
                </div>
              </div>

              {/* Leaderboard Position */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Рейтинг</h3>
                  <Trophy className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">#{referralStats.leaderboardRank}</span>
                    <span className="text-sm text-gray-500">место в топе</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Топ 1% рефереров
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Последние рефералы</h3>
                <button className="text-indigo-600 hover:text-indigo-800">
                  Смотреть все
                </button>
              </div>
              <div className="space-y-4">
                {referrals.slice(0, 3).map((referral) => (
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
                      <p className="text-sm text-gray-500">{referral.registrationDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{referral.earned} SIBT</div>
                      <div className="text-sm text-gray-500">заработано</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Достижения</h3>
                <button className="text-indigo-600 hover:text-indigo-800">
                  Все достижения
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-4">
                      <achievement.icon className={`h-8 w-8 ${
                        achievement.completed ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{achievement.progress}%</span>
                        <span className="text-indigo-600">{achievement.reward} SIBT</span>
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Поиск рефералов..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Фильтры
                  </button>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Пригласить
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center p-6 border border-gray-200 rounded-lg">
                    <img
                      src={referral.avatar}
                      alt={referral.name}
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-medium text-gray-900">{referral.name}</h4>
                        <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {referral.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Регистрация:</span>
                          <br />
                          <span className="font-medium">{referral.registrationDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">События:</span>
                          <br />
                          <span className="font-medium">{referral.activity.events}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Покупки:</span>
                          <br />
                          <span className="font-medium">{referral.activity.purchases}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Токены:</span>
                          <br />
                          <span className="font-medium">{referral.activity.tokens} SIBT</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">{referral.earned} SIBT</div>
                      <div className="text-sm text-gray-500">заработано с реферала</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Подробная статистика</h2>
              {/* Add charts and detailed statistics here */}
              <p className="text-gray-600">Статистика и аналитика будут добавлены позже</p>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Достижения и награды</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-4">
                      <achievement.icon className={`h-10 w-10 ${
                        achievement.completed ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{achievement.progress}%</span>
                        <span className="text-indigo-600">{achievement.reward} SIBT</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Как это работает?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Как начисляются токены?
                  </h3>
                  <p className="text-gray-600">
                    За каждого приглашённого пользователя вы получаете бонусные токены SIBT.
                    Дополнительные токены начисляются за активность ваших рефералов на платформе.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Что такое субрефералы?
                  </h3>
                  <p className="text-gray-600">
                    Субрефералы - это пользователи, которых пригласили ваши рефералы.
                    Вы получаете дополнительные токены и с их активности.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Как использовать токены?
                  </h3>
                  <p className="text-gray-600">
                    Токены SIBT можно использовать для оплаты услуг на платформе,
                    участия в мероприятиях или обменять на другие бонусы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralsPage;