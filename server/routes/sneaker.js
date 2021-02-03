const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const {authCheck, adminCheck} = require('../middlewares/auth')

// IMPORT CONTROLLERS
const {create} = require('../controllers/sneaker');

// routes
router.post('/sneaker', authCheck, adminCheck, create);


module.exports = router;