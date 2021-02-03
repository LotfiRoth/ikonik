const Serie = require('../models/serie');
const slugify = require('slugify');

exports.create= async (req, res) => {
    try {
        const {name, parent} = req.body
        // console.log(name)
        const serie = await new Serie({name, parent, slug: slugify(name)}).save();
        res.json();
    } catch (err) {
        console.log("ERR:", err)
        res.status(400).send('Serie creation failed')
    }
};

exports.list= async (req, res) => {
    res.json(await Serie.find({}).sort({createdAt: -1}).exec());
};

exports.read= async (req, res) => {
    let serie = await Serie.findOne({slug: req.params.slug}).exec();
    res.json(serie);
};

exports.update= async (req, res) => {
    const {name, parent} = req.body;
    try {
        const updated = await Serie.findOneAndUpdate(
            {slug: req.params.slug}, 
            {name, parent, slug: slugify(name)}, 
            {new: true}
        );
        res.json(updated);
    } catch(err) {
        res.statu(400).send('Serie update failed')
    }
    
};

exports.remove= async (req, res) => {
    try {
        const deleted = await Serie.findOneAndDelete({slug: req.params.slug})
        res.json(deleted)
    } catch (err) {
        res.status(400).send("Serie delete failed")
    }
};

