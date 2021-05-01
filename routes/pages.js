const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("welcome");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/home", (req, res) => {
    res.render("home");
});

router.get("/aboutus", (req, res) => {
    res.render("aboutus");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/contactus", (req, res) => {
    res.render("contactus");
});

module.exports = router;