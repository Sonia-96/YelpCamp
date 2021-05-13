const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const passport = require('passport');

router.get("/register", (req, res) => {
    res.render("users/register");
})

router.post("/register", async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email});
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect("/campgrounds");
        }) // 注册后自动登录
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
})

router.get("/login", (req, res) => {
    res.render("users/login");
})

router.post("/login", passport.authenticate('local', {failureFlash: true, failureRedirect: "/login"}), async (req, res) => {
    req.flash('success', "Wlecome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
})

module.exports = router;