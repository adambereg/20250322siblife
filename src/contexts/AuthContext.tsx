import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { 
  UserRole, 
  AuthState, 
  AuthContextType, 
  LoginCredentials, 
  RegisterData,
  User
} from '../types/auth';
import { authAPI } from '../api/client';

// Начальное состояние авторизации
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

// Типы действий для reducer
type AuthAction =
  | { type: 'LOGIN_START' | 'REGISTER_START' | 'LOGOUT' | 'CLEAR_ERROR' | 'AUTH_CHECK_START' }
  | { type: 'LOGIN_SUCCESS' | 'REGISTER_SUCCESS' | 'AUTH_CHECK_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' | 'REGISTER_FAILURE' | 'AUTH_CHECK_FAILURE'; payload: string };

// Редьюсер для управления состоянием авторизации
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
    case 'AUTH_CHECK_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'AUTH_CHECK_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'AUTH_CHECK_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Создание контекста аутентификации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер контекста аутентификации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Проверка наличия токена при первой загрузке
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      dispatch({ type: 'AUTH_CHECK_START' });
      try {
        const response = await authAPI.getCurrentUser();
        if (response.success && response.data) {
          dispatch({ type: 'AUTH_CHECK_SUCCESS', payload: response.data });
        } else {
          dispatch({ 
            type: 'AUTH_CHECK_FAILURE', 
            payload: response.message || 'Не удалось проверить авторизацию' 
          });
          localStorage.removeItem('token');
        }
      } catch (error) {
        dispatch({ 
          type: 'AUTH_CHECK_FAILURE', 
          payload: 'Ошибка проверки авторизации'
        });
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, []);

  // Авторизация
  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authAPI.login(credentials);
      if (response.success && response.data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      } else {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: response.message || 'Неверный логин или пароль' 
        });
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Произошла ошибка при входе. Попробуйте позже.' 
      });
    }
  }, []);

  // Регистрация
  const register = useCallback(async (data: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      const response = await authAPI.register(data);
      if (response.success && response.data) {
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      } else {
        dispatch({ 
          type: 'REGISTER_FAILURE', 
          payload: response.message || 'Ошибка при регистрации' 
        });
      }
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: 'Произошла ошибка при регистрации. Попробуйте позже.' 
      });
    }
  }, []);

  // Выход из системы
  const logout = useCallback(() => {
    authAPI.logout();
    dispatch({ type: 'LOGOUT' });
  }, []);

  // Очистка ошибок
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста авторизации
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 