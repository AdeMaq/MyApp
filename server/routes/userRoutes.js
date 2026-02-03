const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
