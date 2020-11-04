const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    url : {
        type : String,
        required : true
    },
    criteria : {
        type : String,
    },
    user : {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timesUsed : {
        type : Number,
        default : 0
    }
}, {
    timestamps: true
});


const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;