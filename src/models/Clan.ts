import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для участника клана
interface IClanMember {
  user: mongoose.Types.ObjectId;
  role: 'leader' | 'moderator' | 'member';
  joinDate: Date;
}

// Интерфейс для документа клана в MongoDB
export interface IClan extends Document {
  name: string;
  slug: string;
  description: string;
  logo: string;
  cover: string;
  creator: mongoose.Types.ObjectId;
  members: IClanMember[];
  memberCount: number;
  tags: string[];
  category: string;
  city: string;
  isVerified: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Схема участника клана
const ClanMemberSchema = new Schema<IClanMember>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['leader', 'moderator', 'member'],
    default: 'member'
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

// Схема клана
const ClanSchema = new Schema<IClan>({
  name: {
    type: String,
    required: [true, 'Название клана обязательно'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Описание клана обязательно']
  },
  logo: {
    type: String,
    default: ''
  },
  cover: {
    type: String,
    default: ''
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [ClanMemberSchema],
  memberCount: {
    type: Number,
    default: 1 // Создатель клана автоматически становится первым участником
  },
  tags: [{
    type: String
  }],
  category: {
    type: String,
    required: [true, 'Категория клана обязательна']
  },
  city: {
    type: String,
    required: [true, 'Город обязателен']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPrivate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Создание индекса для полнотекстового поиска
ClanSchema.index({ 
  name: 'text', 
  description: 'text',
  tags: 'text'
});

// Автоматический пересчет количества участников при изменении массива members
ClanSchema.pre('save', function(next) {
  if (this.isModified('members')) {
    this.memberCount = this.members.length;
  }
  next();
});

// Создаем модель
export default mongoose.model<IClan>('Clan', ClanSchema); 