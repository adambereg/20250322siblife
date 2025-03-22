export type UserRole = 'participant' | 'vip' | 'pro' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  joinDate: string;
  tokens: number;
  friends?: number;
  followers?: number;
  stats?: {
    events?: number;
    reviews?: number;
    posts?: number;
  };
  token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserData: () => Promise<boolean>;
} 