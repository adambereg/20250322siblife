import mongoose, { Schema } from 'mongoose';
// Схема пользователя
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Имя обязательно'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email обязателен'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Некорректный формат email']
    },
    password: {
        type: String,
        required: [true, 'Пароль обязателен'],
        minlength: [6, 'Пароль должен быть не менее 6 символов']
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
        events: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        },
        posts: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});
// Метод для удаления пароля при сериализации пользователя
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
// Создаем модель
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map