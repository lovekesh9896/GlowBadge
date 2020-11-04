const Student = require('../models/student');
const Badge = require('../models/badges');

module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    });
}

module.exports.verify = async function(req,res){
    try {
        let id = req.params.id;
        let studentId = id.substring(0,24);
        let badgeId = id.substring(24);
        let student = await Student.findById(studentId);
        if(!student){
            return res.render('verify', {
                error : "This badge can not be verified",
                title : 'Not Verified'
            })
        }
        let badge = await Badge.findById(badgeId).populate('user');
        if(!badge){
            return res.render('verify', {
                error : "This badge can not be verified",
                title : 'Not Verified'
            })
        }
        
        return res.render('verify', {
            student : student,
            badge : badge,
            error : '',
            title : 'Verified'
        })
    } catch (err) {
        console.log(err);
        return res.render('verify', {
            error : "This badge can not be verified",
            title : 'Not Verified'
        })
    }
    
}

// module.exports.actionName = function(req, res){}