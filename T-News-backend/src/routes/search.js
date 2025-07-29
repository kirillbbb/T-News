const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

async function readJSON(file) {
    return JSON.parse(await fs.readFile(path.join(__dirname, '../../data', file)));
}

router.get('/', async (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    if (!query) return res.status(400).json({ error: 'Query parameter "q" is required' });

    const [posts, users] = await Promise.all([readJSON('posts.json'), readJSON('users.json')]);

    // Поиск по тексту постов
    const matchedPosts = posts.filter(post => post.content.toLowerCase().includes(query));

    // Поиск по именам пользователей (используем login как имя)
    const matchedUsers = users.filter(user => user.login.toLowerCase().includes(query));

    res.json({
        posts: matchedPosts,
        users: matchedUsers
    });
});

module.exports = router;