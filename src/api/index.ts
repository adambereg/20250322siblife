import axios, { InternalAxiosRequestConfig } from 'axios';
import { LoginCredentials, RegisterData, User } from '../types/auth';

// Создаем инстанс axios с базовым URL
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерцептор для добавления токена к запросам
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Ошибка авторизации' };
      }
      return { success: false, message: 'Не удалось соединиться с сервером' };
    }
  },

  // Регистрация нового пользователя
  register: async (userData: RegisterData): Promise<ApiResponse<User>> => {
    try {
      const { data } = await API.post<ApiResponse<User>>('/auth/register', userData);
      if (data.success && data.data) {
        // Решение TypeScript проблемы
        const user = data.data as User & { token?: string };
        if (user.token) {
          localStorage.setItem('token', user.token);
        }
      }
      return data;
    } catch (error: any) {
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

export default API; 