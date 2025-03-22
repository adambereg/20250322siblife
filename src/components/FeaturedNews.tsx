import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Heart, MessageCircle, ChevronRight } from 'lucide-react';
import { newsArticles } from '../data/news';

const FeaturedNews: React.FC = () => {
  const featuredArticles = newsArticles.slice(0, 3);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Новости
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Последние события города
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="bg-white overflow-hidden shadow rounded-lg transition-transform duration-300 hover:scale-105"
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
              <div className="px-4 py-5 sm:p-6">
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

                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
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

        <div className="mt-8 text-center">
          <Link
            to="/news"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Все новости
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;