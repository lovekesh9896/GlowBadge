const Student = require("../models/student");
// ////////////////////////// Students Sign-up & Sign-in and other auth //////////////////////////////////
module.exports.profile = function (req, res) {
    return res.render("student_profile", {
        title: "Student Profile",
    });
};

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/students/console");
    }
    return res.render("student_sign_up", {
        title: "GlowBadge | Sign Up",
    });
};

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/students/console");
    }
    return res.render("student_sign_in", {
        title: "GlowBadge | Sign In",
    });
};

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect("back");
        }
        let student = await Student.findOne({ email: req.body.email });
        if (!student) {
            let newStudent = await Student.create(req.body);
            newStudent.save();
            return res.redirect("/students/sign-in");
        } else {
            if(student.password != null){
                return res.redirect("/students/sign-in");    
            }else{
                student.password = req.body.password;
                student.name = req.body.name;
                await student.save();
            }
            return res.redirect("/students/sign-in");
        }
    } catch (err) {
        console.log("Controllers > students_controllers > create", err);
        return res.redirect("back");
    }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect("/students/console");
};

module.exports.destroySession = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log("errr", err);
            return next(err);
        }
        res.clearCookie("glowbadge");
        return res.redirect("/");
    });
};

// //////////////////////////// Students console & timeline and other routes //////////////////////////////

module.exports.consoleStudent = async function (req, res) {
    let user = await Student.findById(req.user._id)
            .populate({
                path : 'badgeId',
                populate : {
                    path : 'user',
                    model : 'User'
                }
            });
    return res.render("student_console", {
        title: "Student Console",
        badges: user.badgeId,
        student: user
    });
};

module.exports.timelineStudent = async function (req, res) {
    let user = await Student.findById(req.user._id)
            .populate('clients')
            .populate({
                path : 'clients',
                populate : {
                    path : 'timeline',
                    model : 'Timeline'
                }
            })
            .populate('badgeId')
            .populate('subscribed');
    
    return res.render("student_timeline", {
        title: "Timeline",
        student : user
    });
};
