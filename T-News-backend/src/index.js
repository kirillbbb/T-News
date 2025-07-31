const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const searchRoutes = require('./routes/search');
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Разрешаем CORS для всех доменов в режиме production
// В локальном режиме используем только для нашего dev-сервера
app.use(cors({ origin: isProduction ? '*' : 'http://localhost:63342' }));

app.use(express.json());

const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/search', searchRoutes);

// Этот маршрут был добавлен ранее для чтения users.json
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

// --- ВАЖНО: ЭТА ЧАСТЬ НУЖНА ТОЛЬКО В РЕЖИМЕ PRODUCTION ---
// Отправка файла index.html для всех роутов фронтенда, которые не являются API
if (isProduction) {
    const frontendPath = path.join(__dirname, '..', '..', 'T-News');
    app.use(express.static(frontendPath));

    app.get('/api/base-url', (req, res) => {
        res.json({ url: req.protocol + '://' + req.get('host') });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'pages', 'main-pages', 'main-page.html'));
    });
}
// ----------------------------------------------------

// Render предоставляет порт в переменной окружения
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    if (isProduction) {
        console.log(`T-News server in PRODUCTION mode running on port ${PORT}`);
    } else {
        console.log(`T-News server in LOCAL mode running on http://localhost:${PORT}`);
    }
});
