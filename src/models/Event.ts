import mongoose, { Document, Schema } from 'mongoose';

// Тип для определения статуса события
export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}

// Геолокация
interface ILocation {
  address: string;
  city: string;
  coordinates?: [number, number]; // [долгота, широта]
}

// Участник события
interface IParticipant {
  user: mongoose.Types.ObjectId;
  status: 'registered' | 'attended' | 'canceled';
  registrationDate: Date;
}

// Отзыв о событии
interface IReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}

// Интерфейс для модели события
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  images: string[];
  organizer: mongoose.Types.ObjectId;
  clan?: mongoose.Types.ObjectId;
  location: ILocation;
  startDate: Date;
  endDate: Date;
  category: string[];
  tags: string[];
  price: {
    free: boolean;
    value?: number;
    currency?: string;
  };
  capacity: {
    limited: boolean;
    max?: number;
    registered: number;
  };
  status: EventStatus;
  participants: IParticipant[];
  interested: mongoose.Types.ObjectId[];
  visibility: 'public' | 'private' | 'clan-only';
  reviews: IReview[];
  viewCount: number;
  avgRating: number;
  createdAt: Date;
  updatedAt: Date;
}

// Схема локации
const LocationSchema = new Schema<ILocation>({
  address: {
    type: String,
    required: [true, 'Адрес обязателен']
  },
  city: {
    type: String,
    required: [true, 'Город обязателен']
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

// Схема участника
const ParticipantSchema = new Schema<IParticipant>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'canceled'],
    default: 'registered'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

// Схема отзыва
const ReviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Схема события
const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Название события обязательно'],
    trim: true,
    maxlength: [100, 'Название события не должно превышать 100 символов'],
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
    required: [true, 'Описание события обязательно'],
  },
  coverImage: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clan: {
    type: Schema.Types.ObjectId,
    ref: 'Clan',
  },
  location: LocationSchema,
  startDate: {
    type: Date,
    required: [true, 'Дата начала обязательна'],
  },
  endDate: {
    type: Date,
    required: [true, 'Дата окончания обязательна'],
  },
  category: [{
    type: String,
    required: [true, 'Категория обязательна'],
  }],
  tags: [{
    type: String,
  }],
  price: {
    free: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'RUB',
    },
  },
  capacity: {
    limited: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
    },
    registered: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: Object.values(EventStatus),
    default: EventStatus.DRAFT,
  },
  participants: [ParticipantSchema],
  interested: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  visibility: {
    type: String,
    enum: ['public', 'private', 'clan-only'],
    default: 'public',
  },
  reviews: [ReviewSchema],
  viewCount: {
    type: Number,
    default: 0
  },
  avgRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

// Создание индекса для полнотекстового поиска
EventSchema.index({ 
  title: 'text', 
  description: 'text',
  tags: 'text'
});

// Автоматический пересчет средней оценки при добавлении отзыва
EventSchema.pre('save', function(next) {
  if (this.reviews?.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.avgRating = totalRating / this.reviews.length;
  }
  if (this.isNew || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\sа-яА-Я]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

// Создаем и экспортируем модель
export default mongoose.model<IEvent>('Event', EventSchema); 