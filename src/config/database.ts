import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Загрузка переменных окружения из .env файла
dotenv.config();

// Получение URI для подключения к MongoDB из переменных окружения
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siblife';

// Опции для подключения к MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

// Функция для подключения к базе данных
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ Успешное подключение к MongoDB');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
};

// Обработчики событий соединения
mongoose.connection.on('error', (err) => {
  console.error('❌ Ошибка соединения с MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Соединение с MongoDB разорвано');
});

// Корректное закрытие соединения при завершении процесса
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Соединение с MongoDB закрыто');
  process.exit(0);
});

export default mongoose; 