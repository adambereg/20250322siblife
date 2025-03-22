import mongoose, { Document, Schema } from 'mongoose';

// Тип для определения статуса события
export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
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
  location: {
    address: string;
    city: string;
    region?: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
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
  participants: mongoose.Types.ObjectId[];
  interested: mongoose.Types.ObjectId[];
  visibility: 'public' | 'private' | 'clan-only';
  createdAt: Date;
  updatedAt: Date;
}

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
  location: {
    address: {
      type: String,
      required: [true, 'Адрес обязателен'],
    },
    city: {
      type: String,
      required: [true, 'Город обязателен'],
    },
    region: {
      type: String,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
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
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  interested: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  visibility: {
    type: String,
    enum: ['public', 'private', 'clan-only'],
    default: 'public',
  }
}, {
  timestamps: true,
});

// Пре-хук для генерации слага из названия события
EventSchema.pre('save', function(next) {
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