const express = require("express");
const router = express.Router();
const passport = require("passport");
const Student = require("../models/student");
const studentController = require("../controllers/students_controller");
const bcrypt = require("bcrypt");

router.get(
  "/profile",
  function (req, res, next) {
    let cookie = req.cookies.glowbadge;
    console.log(cookie);
    Student.findOne({ session: cookie }, function (err, student) {
      if (err) {
        return res.redirect("/students/sign-in");
      }
      if (!student) {
        return res.redirect("/students/sign-in");
      } else {
        req.user = student;
        next(null, student);
      }
    });
  },
  studentController.profile
);
router.get("/sign-up", studentController.signUp);
router.get("/sign-in", studentController.signIn);
router.post("/create", studentController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  function (req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    Student.findOne({ email: email }, function (err, student) {
      if (err) {
        console.log("some error in create session for student");
        return next(err);
      }
      if (!student || student.password != pass) {
        console.log("Invalid Username/Password");
        return next(null, false);
      }
      bcrypt.hash(student.password, 10, function (err, hash) {
        if (err) {
          return next(err, false);
        }
        student.session = hash;
        student.save();
        res.cookie("glowbadge", hash);
        req.name = "lovekesh";
        return next(null, student);
      });
    });
  },
  studentController.createSession
);

router.get("/sign-out", studentController.destroySession);

router.get(
  "/console",
  function (req, res, next) {
    let cookie = req.cookies.glowbadge;
    console.log(cookie);
    Student.findOne({ session: cookie }, function (err, student) {
      if (err) {
        return res.redirect("/students/sign-in");
      }
      if (!student) {
        return res.redirect("/students/sign-in");
      } else {
        req.user = student;
        next(null, student);
      }
    });
  },
  studentController.consoleStudent
);

router.get(
  "/timeline",
  function (req, res, next) {
    let cookie = req.cookies.glowbadge;
    console.log(cookie);
    Student.findOne({ session: cookie }, function (err, student) {
      if (err) {
        return res.redirect("/students/sign-in");
      }
      if (!student) {
        return res.redirect("/students/sign-in");
      } else {
        req.user = student;
        next(null, student);
      }
    });
  },
  studentController.timelineStudent
);

module.exports = router;
