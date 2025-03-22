import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Heart, MessageCircle, ChevronLeft, Share2, Send } from 'lucide-react';
import { newsArticles, getArticleComments, type Comment } from '../data/news';

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="border-b border-gray-200 py-6 last:border-0">
      <div className="flex items-start space-x-4">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
          <p className="mt-1 text-gray-600">{comment.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-indigo-600">
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-sm">{comment.likes}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Ответить
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Your avatar"
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Написать ответ..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => setShowReplyForm(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Отмена
                    </button>
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {comment.replies && (
            <div className="mt-4 ml-8 space-y-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={reply.author.avatar}
                      alt={reply.author.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{reply.author.name}</h4>
                        <span className="text-sm text-gray-500">{reply.date}</span>
                      </div>
                      <p className="mt-1 text-gray-600">{reply.content}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-indigo-600">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-sm">{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewsArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const article = newsArticles.find(a => a.id === articleId);
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (articleId) {
      const initialComments = getArticleComments(articleId, 1);
      setComments(initialComments);
      setPage(1);
      setHasMore(initialComments.length === 10);
    }
  }, [articleId]);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreComments();
      }
    });

    if (lastCommentRef.current) {
      observer.current.observe(lastCommentRef.current);
    }
  }, [loading, hasMore]);

  const loadMoreComments = () => {
    if (loading || !hasMore || !articleId) return;

    setLoading(true);
    const nextPage = page + 1;
    const newComments = getArticleComments(articleId, nextPage);
    
    setComments(prev => [...prev, ...newComments]);
    setPage(nextPage);
    setHasMore(newComments.length === 10);
    setLoading(false);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/news" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Вернуться к списку новостей
          </Link>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Статья не найдена</h1>
            <p className="mt-2 text-gray-600">
              К сожалению, запрашиваемая статья не существует или была удалена.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link to="/news" className="flex items-center text-white mb-4 hover:text-gray-200">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Назад к списку новостей
            </Link>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-1" />
                  {article.views}
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-1" />
                  {article.likes}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  {article.comments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{article.content}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Комментарии ({article.comments})
              </h2>

              {/* New Comment Form */}
              <div className="mb-8">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Your avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Написать комментарий..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      rows={3}
                    />
                    <div className="mt-2 flex justify-end">
                      <button className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                        <Send className="h-4 w-4 mr-2" />
                        Отправить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    ref={index === comments.length - 1 ? lastCommentRef : null}
                  >
                    <CommentComponent comment={comment} />
                  </div>
                ))}
              </div>

              {loading && (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mr-2">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Категория</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {article.subcategory}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;