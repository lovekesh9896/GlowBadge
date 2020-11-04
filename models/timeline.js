const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    content : {
        type : String,
        required : true
    },
    timesUsed : {
        type : Number,
        default: 0
    },
    rating : {
        type : Number,
        default: 0
    }
}, {
    timestamps: true
});


const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;