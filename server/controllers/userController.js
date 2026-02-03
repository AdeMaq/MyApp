const service = require('../services/userService');


exports.signup = async (req, res) => {
    try {
        await service.signup(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await service.login(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await service.getAll();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const user = await service.getById(parseInt(req.params.id));
        res.json(user);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};

exports.update = async (req, res) => {
    try {
        await service.update(parseInt(req.params.id), req.body);
        res.json({ message: 'User updated' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(parseInt(req.params.id));
        res.json({ message: 'User deleted' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
