const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const searchRoutes = require('./routes/search');
const app = express();

// --- ВАЖНО: ЭТА ЧАСТЬ НУЖНА ДЛЯ РАЗВЕРТЫВАНИЯ ---
// Путь к папке с фронтенд-файлами
const frontendPath = path.join(__dirname, '..', '..', 'T-News');
app.use(express.static(frontendPath));

// Роут для получения базового URL (полезно для фронтенда)
app.get('/api/base-url', (req, res) => {
    res.json({ url: req.protocol + '://' + req.get('host') });
});
// ----------------------------------------------------

app.use(cors({ origin: '*' })); // Для развертывания лучше использовать '*' или указать конкретный домен

app.use(express.json());

const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/search', searchRoutes);

app.get('/users', async (req, res) => {
    try {
        const usersData = await fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), 'utf8');
        res.json(JSON.parse(usersData));
    } catch (error) {
        console.error('Ошибка при чтении users.json:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.get('/', (req, res) => res.send('T-News API'));

// --- ВАЖНО: ЭТА ЧАСТЬ НУЖНА ДЛЯ РАЗВЕРТЫВАНИЯ ---
// Отправка файла index.html для всех роутов фронтенда
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'pages', 'main-pages', 'main-page.html'));
});
// ----------------------------------------------------

// Render предоставляет порт в переменной окружения
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`T-News server running on http://localhost:${PORT}`));
