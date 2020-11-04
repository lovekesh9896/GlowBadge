const express = require("express");
const router = express.Router();
const passport = require("passport");

const clientsController = require("../controllers/clients_controller");

router.get("/profile", passport.checkAuthentication, clientsController.profile);

router.get("/sign-up", clientsController.signUp);
router.get("/sign-in", clientsController.signIn);

router.post("/create", clientsController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/clients/sign-in" }),
  clientsController.createSession
);

router.get("/sign-out", clientsController.destroySession);

router.get("/console", clientsController.console);

router.get("/timeline", clientsController.giveTimelines);

router.get('/statics', clientsController.giveStatics);

module.exports = router;
