const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const {authCheck, adminCheck} = require('../middlewares/auth')

// IMPORT CONTROLLERS
const {userCreateAndUpdate, userCurrent} = require('../controllers/auth');

router.post("/user-create-and-update", authCheck, userCreateAndUpdate);
router.post("/user-current", authCheck, userCurrent);
router.post("/admin-current", authCheck, adminCheck, userCurrent);



module.exports = router;