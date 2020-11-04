const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fileSystem : {
        type : Object,
        default : []
    },
    clientId : {
        type : String,
        required : true
    },
    clientSecret : {
        type : String,
        required : true
    },
    badgeId : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Badge'
        }
    ],
    timeline : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Timeline'
        }
    ],
    students : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    badgeStatics : [
        Number
    ]
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;