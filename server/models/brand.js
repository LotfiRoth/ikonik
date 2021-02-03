const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name of the brand is required',
    },
    slug : {
        type: String,
        unique: true,
        lowercase: true,
        index: true,  
    }
}, {timestamps: true}
);

module.exports = mongoose.model('Brand', brandSchema)

