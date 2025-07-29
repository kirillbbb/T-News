const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

async function readJSON(file) {
    return JSON.parse(await fs.readFile(path.join(__dirname, '../../data', file)));
}

router.get('/:id', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    let userId;
    try {
        const decoded = jwt.verify(token, 'secret_key');
        userId = decoded.id;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (userId !== parseInt(req.params.id)) return res.status(403).json({ error: 'Access denied' });

    const users = await readJSON('users.json');
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Добавим заглушку для posts (пока берем из posts.json)
    const posts = await readJSON('posts.json');
    user.posts = posts.filter(p => p.user_id === userId);

    res.json(user);
});

module.exports = router;