const express = require('express');
const bcrypt = require('bcrypt');
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

router.post('/register', async (req, res) => {
    const { login, password } = req.body; // Убрали email из деструктуризации
    if (!login || !password) return res.status(400).json({ error: 'Missing required fields' }); // Только login и password
    const users = await readJSON('users.json');
    if (users.find(u => u.login === login)) return res.status(409).json({ error: 'User already exists' });
    const id = users.length + 1;
    const password_hash = await bcrypt.hash(password, 10);
    users.push({ id, login, password_hash, about: '', avatar_path: '' }); // Убрали email
    await writeJSON('users.json', users);
    res.status(201).json({ id });
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const users = await readJSON('users.json');
    const user = users.find(u => u.login === login);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;