import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Eye, Heart, MessageCircle } from 'lucide-react';
import { newsCategories, newsArticles } from '../data/news';

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Новости Новосибирска</h1>
          <p className="text-xl text-gray-600">
            Будьте в курсе последних событий города
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Поиск новостей..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Фильтры
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${category.id === selectedCategory
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-800">
                    {article.subcategory}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {article.summary}
                </p>

                <div className="flex items-center text-gray-500 text-sm">
                  <div className="flex items-center mr-4">
                    <Eye className="h-4 w-4 mr-1" />
                    {article.views}
                  </div>
                  <div className="flex items-center mr-4">
                    <Heart className="h-4 w-4 mr-1" />
                    {article.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {article.comments}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;