const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

async function readJSON(file) {
    return JSON.parse(await fs.readFile(path.join(__dirname, '../../data', file)));
}

async function writeJSON(file, data) {
    await fs.writeFile(path.join(__dirname, '../../data', file), JSON.stringify(data, null, 2));
}

router.get('/', async (req, res) => {
    const posts = await readJSON('posts.json');
    res.json(posts);
});

router.post('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    let userId;
    try {
        const decoded = jwt.verify(token, 'secret_key');
        userId = decoded.id;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { content } = req.body;
    if (!content || content.trim() === '') return res.status(400).json({ error: 'Content is required' });

    const posts = await readJSON('posts.json');
    const newPost = {
        id: posts.length + 1,
        user_id: userId,
        content: content.trim(),
        created_at: new Date().toISOString()
    };
    posts.push(newPost);
    await writeJSON('posts.json', posts);
    res.status(201).json(newPost);
});

module.exports = router;