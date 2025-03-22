import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { LoginCredentials, RegisterData, User } from '../types/auth';

// Базовый URL для API — используем полный путь для прямого доступа к серверу на порту 5000
const API_BASE_URL = 'http://localhost:5000/api';

// Создаем инстанс axios с базовым URL
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Время ожидания ответа от сервера - 10 секунд
  timeout: 10000,
  // Разрешаем отправку куки с кросс-доменными запросами
  withCredentials: true,
});

// Добавляем интерцептор для добавления токена к запросам
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Не удаляем Content-Type для multipart/form-data запросов
  if (config.data instanceof FormData) {
    console.log('Отправка FormData - сохраняем заголовок Content-Type для multipart/form-data');
    // Axios автоматически установит правильный Content-Type для FormData
  }
  
  console.log(`🚀 Запрос: ${config.method?.toUpperCase()} ${config.url}`, config.data || '', 'Заголовки:', config.headers);
  return config;
});

// Интерцептор ответов для логирования
API.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Ответ: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error(`❌ Ошибка: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response.data);
    } else if (error.request) {
      console.error(`❌ Нет ответа от сервера: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.message);
    } else {
      console.error(`❌ Ошибка запроса: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Интерфейсы для ответов API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Функции для работы с аутентификацией
export const authAPI = {
  // Авторизация пользователя
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const { data } = await API.post<ApiResponse<User>>('/auth/login', credentials);
      if (data.success && data.data) {
        // Решение TypeScript проблемы
        const userData = data.data as User & { token?: string };
        if (userData.token) {
          localStorage.setItem('token', userData.token);
        }
      }
      return data;
    } catch (error: any) {
      console.error('Ошибка при логине:', error);
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка авторизации' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Регистрация нового пользователя
  register: async (userData: RegisterData): Promise<ApiResponse<User>> => {
    try {
      console.log('Отправка запроса регистрации:', userData);
      const response = await API.post<ApiResponse<User>>('/auth/register', userData);
      console.log('Ответ на запрос регистрации:', response);
      
      const { data } = response;
      if (data.success && data.data) {
        // Решение TypeScript проблемы
        const user = data.data as User & { token?: string };
        if (user.token) {
          localStorage.setItem('token', user.token);
        }
      }
      return data;
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка регистрации' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Выход пользователя
  logout: (): void => {
    localStorage.removeItem('token');
  },

  // Получение текущего пользователя
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const { data } = await API.get<ApiResponse<User>>('/auth/me');
      return data;
    } catch (error: any) {
      console.error('Ошибка при получении данных пользователя:', error);
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка получения данных пользователя' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },
};

// API для работы с кланами
export const clansAPI = {
  // Получение списка кланов
  getClans: async (): Promise<ApiResponse<any[]>> => {
    try {
      const { data } = await API.get<ApiResponse<any[]>>('/clans');
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка получения кланов' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Получение информации о конкретном клане
  getClanById: async (clanId: string): Promise<ApiResponse<any>> => {
    try {
      const { data } = await API.get<ApiResponse<any>>(`/clans/${clanId}`);
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка получения данных клана' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },
};

// API для работы с событиями
export const eventsAPI = {
  // Получение списка событий
  getEvents: async (filters?: any): Promise<ApiResponse<any[]>> => {
    try {
      const { data } = await API.get<ApiResponse<any[]>>('/events', { params: filters });
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка получения событий' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Получение информации о конкретном событии
  getEventBySlug: async (slug: string): Promise<ApiResponse<any>> => {
    try {
      const { data } = await API.get<ApiResponse<any>>(`/events/${slug}`);
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка получения данных события' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },
};

// API для работы с пользователями
export const userAPI = {
  // Обновление профиля пользователя (без аватара)
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const { data } = await API.put<ApiResponse<User>>('/users/profile', userData);
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка обновления профиля' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Обновление профиля с аватаром (используем FormData)
  updateProfileWithAvatar: async (formData: FormData): Promise<ApiResponse<User>> => {
    try {
      console.log('Отправка FormData на сервер');
      
      // Проверим содержимое FormData для отладки
      console.log('FormData содержит следующие поля:');
      for (const pair of formData.entries()) {
        console.log(`- ${pair[0]}: ${pair[1] instanceof File ? `Файл (${(pair[1] as File).name})` : pair[1]}`);
      }
      
      const { data } = await API.put<ApiResponse<User>>('/users/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Все остальные заголовки добавятся автоматически через интерцептор
        },
      });
      
      console.log('Ответ сервера на обновление аватара:', data);
      return data;
    } catch (error: any) {
      console.error('Ошибка при загрузке аватара:', error);
      
      if (error.response) {
        console.error('Детали ответа сервера:', error.response.data, 'Статус:', error.response.status);
        return { 
          success: false, 
          message: error.response.data.message || `Ошибка загрузки аватара (${error.response.status})`
        };
      }
      
      return { 
        success: false, 
        message: error.message || 'Не удалось соединиться с сервером' 
      };
    }
  },

  // Изменение пароля пользователя
  changePassword: async (passwordData: { currentPassword: string, newPassword: string }): Promise<ApiResponse<User>> => {
    try {
      const { data } = await API.put<ApiResponse<User>>('/users/password', passwordData);
      return data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка изменения пароля' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },
}; 