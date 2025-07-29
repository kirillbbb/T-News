const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const searchRoutes = require('./routes/search'); // Новый маршрут
const app = express();

app.use(cors({ origin: 'http://localhost:63342' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/search', searchRoutes); // Подключение маршрута поиска

app.get('/', (req, res) => res.send('T-News API'));

app.listen(3000, () => console.log('T-News server running on http://localhost:3000'));