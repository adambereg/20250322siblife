import mongoose from 'mongoose';
// Функция для подключения к MongoDB
export const connectDB = async () => {
    try {
        // В реальном приложении URI должен быть в env переменных
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siberia_life';
        await mongoose.connect(mongoURI);
        console.log('MongoDB подключена успешно');
    }
    catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
        process.exit(1);
    }
};
// Событие для отслеживания состояния подключения
mongoose.connection.on('connected', () => {
    console.log('Mongoose подключен к MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error(`Ошибка соединения Mongoose: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose отключен от MongoDB');
});
// Корректное закрытие соединения при завершении процесса
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Соединение с MongoDB закрыто. Процесс завершается.');
    process.exit(0);
});
//# sourceMappingURL=db.js.map