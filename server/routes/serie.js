const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const {authCheck, adminCheck} = require('../middlewares/auth')

// IMPORT CONTROLLERS
const {create, read, update, remove, list} = require('../controllers/serie');

// routes
router.post('/serie', authCheck, adminCheck, create);
router.get('/series', list);
router.get('/serie/:slug', read);
router.put('/serie/:slug', authCheck, adminCheck, update);
router.delete('/serie/:slug', authCheck, adminCheck, remove);


module.exports = router;