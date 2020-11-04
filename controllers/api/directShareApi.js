const Badge = require("../../models/badges");
const Student = require("../../models/student");
const directShareMailer = require("../../mailer/badge_mailer");
const User = require("../../models/user");

module.exports.directShare = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let emails = req.body.emails;
            let user = await User.findById(req.user._id);
            var path = req.body.path;
            let name = path.slice(path.lastIndexOf("/") + 1);
            let badge = await Badge.findOne({ name: name,user: user._id });
            if (badge) {
                let email = emails.split(",");
                for (let i = 0; i < email.length; i++) {
                    directShareMailer.newBadge(email[i], badge, req.body);
                    let student = await Student.findOne({ email: email[i] });
                    if (student != null) {
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

                    } else {
                        console.log("here in extra");
                        let newStudent = await Student.create({
                            'email': email[i]
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
                }
                return res.status(200).json({
                    success: true,
                    message: "Done",
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "badge not found",
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
    } catch (err) {
        console.log("here in error",err);
        return res.status(400).json({
            success: false,
            message: "internal server error",
        });
    }
};
