import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    trim: true,
    maxlength: [50, 'Имя не может быть длиннее 50 символов']
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста, введите корректный email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    minlength: [6, 'Пароль должен содержать минимум 6 символов'],
    select: false
  },
  role: {
    type: String,
    enum: ['participant', 'vip', 'pro', 'business', 'admin'],
    default: 'participant'
  },
  avatar: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  tokens: {
    type: Number,
    default: 50
  },
  friends: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  stats: {
    events: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    posts: { type: Number, default: 0 }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Виртуальное поле для связи с событиями пользователя
UserSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'creator',
  justOne: false
});

// Виртуальное поле для связи с кланами пользователя
UserSchema.virtual('clans', {
  ref: 'Clan',
  localField: '_id',
  foreignField: 'members.user',
  justOne: false
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Сравнение паролей для аутентификации
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Метод для генерации токена сброса пароля
UserSchema.methods.getResetPasswordToken = function() {
  // Логика генерации токена сброса пароля
  // Будет реализована позже при необходимости
  return null;
};

export default mongoose.model('User', UserSchema); 