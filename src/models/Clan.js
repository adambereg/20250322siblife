import mongoose from 'mongoose';
import slugify from 'slugify';

const ClanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя клана обязательно'],
    unique: true,
    trim: true,
    maxlength: [50, 'Имя клана не может быть длиннее 50 символов']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Описание клана обязательно'],
    maxlength: [1000, 'Описание не может быть длиннее 1000 символов']
  },
  logo: {
    type: String,
    default: 'default-clan-logo.jpg'
  },
  cover: {
    type: String,
    default: 'default-clan-cover.jpg'
  },
  founder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Клан должен иметь основателя']
  },
  members: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['member', 'moderator', 'admin'],
        default: 'member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  memberCount: {
    type: Number,
    default: 1 // Основатель
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  tags: [String],
  category: {
    type: String,
    required: [true, 'Категория клана обязательна'],
    enum: [
      'Спорт и отдых',
      'Активный отдых',
      'Культура',
      'Образование',
      'Бизнес',
      'Развлечения',
      'Технологии',
      'Другое'
    ]
  },
  city: {
    type: String,
    required: [true, 'Город клана обязателен']
  },
  social: {
    website: String,
    vk: String,
    telegram: String,
    instagram: String
  },
  requiresApproval: {
    type: Boolean,
    default: false
  },
  membershipRequests: [
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
      requestedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Виртуальное поле для событий клана
ClanSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'clan',
  justOne: false
});

// Создание слага перед сохранением
ClanSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true,
      strict: true,
      locale: 'ru'
    });
  }
  
  // Обновление количества участников
  if (this.isModified('members')) {
    this.memberCount = this.members.length;
  }
  
  next();
});

export default mongoose.model('Clan', ClanSchema); 