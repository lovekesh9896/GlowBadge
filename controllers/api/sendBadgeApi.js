const User = require('../../models/user');
const Badge = require('../../models/badges');
const Student = require('../../models/student');
// This funciton takes the clientId, clientSecret, badgeName and student email
// find that user(client), checks for auth and then update the syudent db for 
// that badge 
module.exports.sendBadge = async function(req,res){
    console.log("here");
    try {
        let clientId = req.body.ClientId;
        let clientSecret = req.body.ClientSecret;
        let user = await User.findOne({clientId : clientId});
        console.log(user);
        console.log(clientSecret);
        if(user){ // user found
            if(user.clientSecret === clientSecret){ // user authenticated
                console.log("here too");
                var path = req.body.Path;
                let name = path.slice(path.lastIndexOf('/')+1);
                let badge = await Badge.findOne({name : name});
                console.log(badge);
                if(badge && badge.user === user._id){ // badge found
                    let student = await Student.findOne({email : req.body.email});
                    if(student){ // student exist
                        student.lastBadge = new Date();
                        await student.badgeId.push(badge);
                        await student.clients.addToSet(user);
                        await student.save();
                        
                        let lastNumber;
                        if(user.badgeStatics.length > 0){
                            lastNumber = user.badgeStatics.pop();
                        }else{
                            lastNumber = 0;
                        }

                        user.badgeStatics.push(lastNumber + 1);
                        await user.students.addToSet(student);
                        await user.save();

                        badge.timesUsed = badge.timesUsed + 1;
                        await badge.save();
                    }else{ // create new student
                        let newStudent = await Student.create({
                            email: req.body.email,
                        });
                        newStudent.lastBadge = new Date();
                        await newStudent.badgeId.push(badge);
                        await newStudent.clients.addToSet(user);
                        await newStudent.save();

                        let lastNumber;
                        if(user.badgeStatics.length > 0){
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
                }else{ // the badge does not belongs to that user
                    return res.status(404).json({
                        success : false,
                        message : 'badge not found or wrong request',
                    })
                }
                
            }
        }else{ // user not found
            if(req.xhr){
                return res.status(404).json({
                    success : false,
                    message : 'User not found'
                })
            }
        }
    } catch (err) {
        console.log("Controller > api > sendBadgeApi", err);
        if(req.xhr){
            return res.status(404).json({
                success : false,
                message : 'Internal server error'
            })
        }
    }
    
}