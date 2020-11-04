const User = require('../../models/user');
const Timeline = require('../../models/timeline');
//   Hnadles the badge Ststics 
module.exports.badgeStatics = async function (req,res) {
    try {
        let user = await User.findById(req.user._id);
        if(!user){
            return res.status(200).json({
                message : 'User not found',
                success : false
            });
        }
        let statics = await user.badgeStatics;
        return res.status(200).json({
            message : 'done',
            success : true,
            statics : statics
        });
    } catch (err) {
        console.log("controller > api > staticsApi.js > badgeStatics", err);
        return res.status(200).json({
            message : 'Internal server error',
            success : false
        });
    }
    
}

module.exports.timelineSubs = async function (req,res) {
    try {
        let user = await User.findById(req.user._id)
            .populate('timeline','name timesUsed');
        if(!user){
            return res.status(200).json({
                message : 'User not found',
                success : false
            });
        }
        return res.status(200).json({
            success : true,
            statics : user.timeline
        });
    } catch (err) {
        console.log("controller > api > staticsApi.js > timelineStstsics", err);
        return res.status(200).json({
            message : 'Internal server error',
            success : false
        });
    }
}   