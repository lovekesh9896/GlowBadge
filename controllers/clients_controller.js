const User = require("../models/user");
const bcrypt = require("bcrypt");

// ////////////////////////// Clients Sign-up & Sign-in and other auth //////////////////////////////////
module.exports.profile = function (req, res) {
  return res.render("client_profile", {
    title: "User Profile",
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/clients/profile");
  }
  return res.render("client_sign_up", {
    title: "GlowBadge | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/clients/profile");
  }
  return res.render("client_sign_in", {
    title: "GlowBadge | Sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.body.clientId = await bcrypt.hash(req.body.email, 10);
      req.body.clientSecret = await bcrypt.hash(req.body.password, 10);
      let newUser = await User.create(req.body);
      return res.redirect("/clients/sign-in");
    } else {
      return res.redirect("/clients/sign-in");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/clients/console");
};

module.exports.destroySession = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log("errr", err);
      return next(err);
    }
    req.logout();
    res.clearCookie("codeial");
    return res.redirect("/");
  });
};

// //////////////////////////// Clients console & timeline and other routes //////////////////////////////

module.exports.console = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("client_console", {
      title: "Client Console",
      user: req.user.email,
      fileSystem: req.user.fileSystem,
    });
  } else {
    return res.redirect("/clients/sign-in");
  }
};

module.exports.giveTimelines = async function (req, res) {
  if (req.isAuthenticated()) {
    let user = await User.findById(req.user._id).populate("timeline");
    return res.render("client_timeline", {
      title: "Timeline",
      user: user,
    });
  } else {
    return res.redirect("/clients/sign-in");
  }
};

module.exports.giveStatics = async function (req,res) {
    if (req.isAuthenticated()) {
        let user = await User.findById(req.user._id)
          .populate('timeline', 'name rating',null,{ sort: '-rating' } )
          .populate('badgeId', 'url timesUsed', null, {sort: 'timesUsed'})
          .populate('students', 'name lastBadge',null, {sort: 'lastBadge'});
        let userStudent = await User.findById(req.user._id).populate('students');
        return res.render("client_statics", {
          title: "Statics",
          user: user,
          student: userStudent.students
        });
    } else {
        return res.redirect("/clients/sign-in");
    }
}
