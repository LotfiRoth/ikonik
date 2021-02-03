const Sneaker = require('../models/sneaker');
const slugify = require('slugify');
const { json } = require('body-parser');

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newSneaker = await new Sneaker(req.body).save();
        res.json(newSneaker)
    } catch (err) {
        console.log(err);
        res.status(400).send("Create sneaker failed")
    }
}