const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const sneakerSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        txte: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    // brand: {
    //     type: ObjectId,
    //     ref: "Brand"
    // },  
    // serie: {
    //     type: Array,
    //     ref: "serie"
    // }   ,
    // stock: {
    //     type: Array
    //     },
    sold: {
        type: Number,
        default: 0
    },
    // images: {
    // type: Array
    // },
    mainColor: {
        type: String,
        required: true,
        enum: ["Red", "Pink", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Black", "Grey", "White"]
    },
    // otherColors: {
    //     type: Array
    // },
    style: {
        type: String,
        enum: ["High-Top", "Mid-Top", "Low-Top", "Special"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Sneaker", sneakerSchema);