const { app } = require('firebase-admin');

const express = require('express');

const router = express.Router();

router.get("/user", (req, res) => {
    res.json({
        data: "hello my beautiful API USER world",
    });
});

module.exports = router;