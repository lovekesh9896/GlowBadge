const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        default: "Student"
    },
    badgeId : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Badge'
        }
    ],
    lastBadge : {
        type : Date,
    },
    session : {
        type : String,
    },
    clients : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    subscribed : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Timeline'
        }
    ]
}, {
    timestamps: true
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;