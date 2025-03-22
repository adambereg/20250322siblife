import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Search, Filter, Star, MapPin, Calendar, Crown,
  ChevronRight, Shield, Target, Trophy, UserPlus, Settings,
  MessageCircle, Heart, Share2, Activity
} from 'lucide-react';

const ClansPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Все кланы' },
    { id: 'hobby', name: 'Хобби и интересы' },
    { id: 'events', name: 'Организация мероприятий' },
    { id: 'pro', name: 'PRO и бизнес' },
    { id: 'sports', name: 'Спорт и здоровье' },
    { id: 'culture', name: 'Искусство и культура' },
    { id: 'tech', name: 'Технологии' },
    { id: 'city', name: 'Развитие города' }
  ];

  const clans = [
    {
      id: 1,
      name: 'Активный Новосибирск',
      category: 'sports',
      members: 2450,
      events: 12,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Центральный район',
      description: 'Сообщество для любителей активного образа жизни и спорта',
      leader: {
        name: 'Михаил Сидоров',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'PRO-Соучастник'
      },
      rating: 4.8,
      reviews: 156,
      socialRating: 850,
      featured: true
    },
    {
      id: 2,
      name: 'Культурный код',
      category: 'culture',
      members: 1830,
      events: 8,
      image: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Академгородок',
      description: 'Объединение творческих людей и ценителей искусства',
      leader: {
        name: 'Анна Петрова',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'VIP-Соучастник'
      },
      rating: 4.6,
      reviews: 98,
      socialRating: 720,
      featured: true
    },
    {
      id: 3,
      name: 'IT-Community NSK',
      category: 'tech',
      members: 3200,
      events: 15,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Технопарк',
      description: 'Сообщество IT-специалистов и энтузиастов технологий',
      leader: {
        name: 'Алексей Иванов',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'PRO-Соучастник'
      },
      rating: 4.9,
      reviews: 234,
      socialRating: 950,
      featured: true
    },
    {
      id: 4,
      name: 'Городские инициативы',
      category: 'city',
      members: 1650,
      events: 6,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      location: 'Весь город',
      description: 'Платформа для развития городских проектов и инициатив',
      leader: {
        name: 'Екатерина Смирнова',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        role: 'PRO-Соучастник'
      },
      rating: 4.7,
      reviews: 156,
      socialRating: 780,
      featured: false
    }
  ];

  const filteredClans = selectedCategory && selectedCategory !== 'all'
    ? clans.filter(clan => clan.category === selectedCategory)
    : clans;

  const searchedClans = searchQuery
    ? filteredClans.filter(clan =>
        clan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clan.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredClans;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Кланы и сообщества</h1>
          <p className="text-xl text-gray-600">
            Присоединяйтесь к единомышленникам и создавайте собственные сообщества
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск кланов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Фильтры
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Создать клан
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  category.id === selectedCategory
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Clans */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Популярные кланы</h2>
            <Link
              to="/clans/featured"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Все популярные
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedClans.filter(clan => clan.featured).map((clan) => (
              <div
                key={clan.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <Link to={`/clans/${clan.id}`}>
                  <div className="relative h-48">
                    <img
                      src={clan.image}
                      alt={clan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-gray-800">
                        {categories.find(cat => cat.id === clan.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={clan.leader.avatar}
                        alt={clan.leader.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">{clan.leader.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                          {clan.leader.role}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{clan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{clan.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="text-sm">{clan.location}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          <span className="text-sm">{clan.members} участников</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span className="text-sm">{clan.events} событий</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{clan.rating} ({clan.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-indigo-400 mr-1" />
                          <span className="text-sm">{clan.socialRating} SR</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Вступить
                      </button>
                      <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* All Clans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? 'Результаты поиска' : 'Все кланы'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedClans.map((clan) => (
              <div
                key={clan.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <Link to={`/clans/${clan.id}`}>
                  <div className="relative h-48">
                    <img
                      src={clan.image}
                      alt={clan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-gray-800">
                        {categories.find(cat => cat.id === clan.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={clan.leader.avatar}
                        alt={clan.leader.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium">{clan.leader.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                          {clan.leader.role}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{clan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{clan.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="text-sm">{clan.location}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          <span className="text-sm">{clan.members} участников</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span className="text-sm">{clan.events} событий</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{clan.rating} ({clan.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-indigo-400 mr-1" />
                          <span className="text-sm">{clan.socialRating} SR</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Вступить
                      </button>
                      <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClansPage;