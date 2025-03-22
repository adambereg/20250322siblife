import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from '../types/auth';

// Расширяем тип Document для нашей модели пользователя
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
  joinDate: Date;
  tokens: number;
  friends?: number;
  followers?: number;
  stats?: {
    events?: number;
    reviews?: number;
    posts?: number;
  };
  lastLogin?: Date;
}

// Схема пользователя
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Введите корректный email'],
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    minlength: [8, 'Пароль должен содержать не менее 8 символов'],
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: {
      values: ['participant', 'vip', 'pro', 'business', 'admin'],
      message: 'Недопустимый тип аккаунта',
    },
    default: 'participant',
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  tokens: {
    type: Number,
    default: 50,
  },
  friends: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  stats: {
    events: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    posts: {
      type: Number,
      default: 0,
    },
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Добавим метод для сравнения хешированных паролей в будущем
// UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// Создаем и экспортируем модель
export default mongoose.model<IUser>('User', UserSchema); 