const User = require('../../models/user');
const Badge = require('../../models/badges');
const Student = require('../../models/student');

module.exports.sendBadge = async function(req,res){
    
    try {
        let clientId = req.body.ClientId;
        let clientSecret = req.body.ClientSecret;
        let user = await User.findOne({clientId : clientId});
        if(user){
            if(user.clientSecret === clientSecret){
                var path = req.body.Path;
                let name = path.slice(path.lastIndexOf('/')+1);
                let badge = await Badge.findOne({name : name});
                if(badge && badge.user === user.clientId){
                    let student = await Student.findOne({email : req.body.email});
                    if(student){
                        student.lastBadge = new Date();
                        await student.badgeId.push(badge);
                        await student.clients.addToSet(user);
                        await student.save();
                        
                        let lastNumber;
                        if(user.badgeStatics){
                            lastNumber = user.badgeStatics.pop();
                        }else{
                            lastNumber = 0;
                        }

                        user.badgeStatics.push(lastNumber + 1);
                        await user.students.addToSet(student);
                        await user.save();

                        badge.timesUsed = badge.timesUsed + 1;
                        await badge.save();
                    }else{
                        let newStudent = await Student.create({
                            email: req.body.email,
                        });
                        newStudent.lastBadge = new Date();
                        await newStudent.badgeId.push(badge);
                        await newStudent.clients.addToSet(user);
                        await newStudent.save();

                        let lastNumber;
                        if(user.badgeStatics){
                            lastNumber = user.badgeStatics.pop();
                        }else{
                            lastNumber = 0;
                        }

                        user.badgeStatics.push(lastNumber + 1);
                        await user.students.addToSet(newStudent);
                        await user.save();

                        badge.timesUsed = badge.timesUsed + 1;
                        await badge.save();
                    }
                    return res.status(200).json({
                        success : true,
                        message : 'Badge Found and sent',
                        badge : badge
                    })
                }else{
                    return res.status(404).json({
                        success : false,
                        message : 'badge not found or wrong request',
                    })
                }
                
            }
        }else{
            if(req.xhr){
                return res.status(404).json({
                    success : false,
                    message : 'User not found'
                })
            }
        }
    } catch (err) {
        console.log(err);
        if(req.xhr){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
    }
    
}