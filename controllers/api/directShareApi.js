const Badge = require("../../models/badges");
const Student = require("../../models/student");
const directShareMailer = require("../../mailer/badge_mailer");
const User = require("../../models/user");

//  This functin takes the emails of students, badgeName
// and send email and that badge to theere email
// if also updates there respective db model
module.exports.directShare = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let emails = req.body.emails;
            let user = await User.findById(req.user._id);
            var path = req.body.path;
            let name = path.slice(path.lastIndexOf("/") + 1);
            let badge = await Badge.findOne({ name: name,user: user._id });
            if (badge) { // badge found
                let email = emails.split(",");
                for (let i = 0; i < email.length; i++) {
                    directShareMailer.newBadge(email[i], badge, req.body);
                    let student = await Student.findOne({ email: email[i] });
                    if (student != null) { // student exist
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

                    } else { // create new student
                        let newStudent = await Student.create({
                            'email': email[i]
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
                }
                return res.status(200).json({ // all done successfully
                    success: true,
                    message: "Done",
                });
            } else { // badge not found
                return res.status(404).json({
                    success: false,
                    message: "badge not found",
                });
            }
        } else { // user is not found
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
    } catch (err) {
        console.log("controllers > api > directShareApi",err);
        return res.status(400).json({
            success: false,
            message: "internal server error",
        });
    }
};
