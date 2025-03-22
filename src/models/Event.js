import mongoose from 'mongoose';
import slugify from 'slugify';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название события обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Описание события обязательно'],
    maxlength: [2000, 'Описание не может быть длиннее 2000 символов']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Краткое описание не может быть длиннее 200 символов']
  },
  category: {
    type: String,
    required: [true, 'Категория события обязательна'],
    enum: [
      'Походы',
      'Кулинария',
      'Спорт',
      'Культура',
      'Образование',
      'Развлечения',
      'Бизнес',
      'Другое'
    ]
  },
  image: {
    type: String,
    default: 'default-event.jpg'
  },
  gallery: [String],
  dateStart: {
    type: Date,
    required: [true, 'Дата начала события обязательна']
  },
  dateEnd: {
    type: Date,
    required: [true, 'Дата окончания события обязательна']
  },
  price: {
    type: Number,
    default: 0
  },
  capacity: {
    type: Number,
    required: [true, 'Вместимость события обязательна']
  },
  participants: {
    type: Number,
    default: 0
  },
  location: {
    address: {
      type: String,
      required: [true, 'Адрес события обязателен']
    },
    city: {
      type: String,
      required: [true, 'Город события обязателен']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Событие должно иметь создателя']
  },
  clan: {
    type: mongoose.Schema.ObjectId,
    ref: 'Clan'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  requiresApproval: {
    type: Boolean,
    default: false
  },
  attendees: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  averageRating: {
    type: Number,
    min: [1, 'Рейтинг должен быть не менее 1'],
    max: [5, 'Рейтинг должен быть не более 5']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Виртуальное поле для отзывов (будет реализовано позже)
EventSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'event',
  justOne: false
});

// Создание слага перед сохранением
EventSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { 
      lower: true,
      strict: true,
      locale: 'ru'
    });
  }
  
  // Генерация краткого описания, если оно не задано
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 197) + '...';
  }
  
  next();
});

// Обновление количества участников при изменении массива attendees
EventSchema.pre('save', function(next) {
  if (this.isModified('attendees')) {
    this.participants = this.attendees.filter(
      attendee => attendee.status === 'approved'
    ).length;
  }
  next();
});

export default mongoose.model('Event', EventSchema); 