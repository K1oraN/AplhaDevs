// server/routes/authRoutes.js
const express = require('express');
// Remove 'registerUser' daqui
const { loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginUser);
// router.post('/register', registerUser); // <-- REMOVIDO OU COMENTADO

module.exports = router;