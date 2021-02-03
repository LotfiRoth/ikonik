const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    dateOfBirth: {
        type: Date,
        // required: true
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    cart: {
        type: Array,
        default: []
    }, 
    // favorites: [{ObjectId, ref: "Product"}],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
