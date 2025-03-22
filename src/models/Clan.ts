import mongoose, { Document, Schema } from 'mongoose';

// Интерфейс для модели клана
export interface IClan extends Document {
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  founder: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  level: number;
  points: number;
  isVerified: boolean;
  location: {
    city: string;
    region?: string;
  };
  tags: string[];
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Схема клана
const ClanSchema = new Schema<IClan>({
  name: {
    type: String,
    required: [true, 'Название клана обязательно'],
    trim: true,
    unique: true,
    maxlength: [50, 'Название клана не должно превышать 50 символов'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Описание клана обязательно'],
    maxlength: [1000, 'Описание не должно превышать 1000 символов'],
  },
  logo: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
  founder: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  level: {
    type: Number,
    default: 1,
    min: [1, 'Уровень клана не может быть меньше 1'],
  },
  points: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  location: {
    city: {
      type: String,
      required: [true, 'Город обязателен'],
    },
    region: {
      type: String,
    },
  },
  tags: [{
    type: String,
    trim: true,
  }],
  rules: {
    type: String,
  },
}, {
  timestamps: true,
});

// Пре-хук для генерации слага из названия клана
ClanSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\sа-яА-Я]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

// Создаем и экспортируем модель
export default mongoose.model<IClan>('Clan', ClanSchema); 