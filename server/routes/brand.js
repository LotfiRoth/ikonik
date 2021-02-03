const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const {authCheck, adminCheck} = require('../middlewares/auth')

// IMPORT CONTROLLERS
const {create, read, update, remove, list} = require('../controllers/brand');

// routes
router.post('/brand', authCheck, adminCheck, create);
router.get('/brands', list);
router.get('/brand/:slug', read);
router.put('/brand/:slug', authCheck, adminCheck, update);
router.delete('/brand/:slug', authCheck, adminCheck, remove);


module.exports = router;