const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const serieSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name of serie is required',
    },
    slug : {
        type: String,
        unique: true,
        lowercase: true,
        index: true,  
    },
    parent: {
        type: ObjectId,
        ref: 'Brand',
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model('Serie', serieSchema)

