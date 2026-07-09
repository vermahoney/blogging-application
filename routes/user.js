const express = require("express");
const router = express.Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});


 router.post("/signin", async (req, res) => {
    const { email, password } = req.body;           
    const isMatched = user.matchpass(email, password)
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    await User.create({
        username,
        email,
        password,
    });

    return res.redirect("/");
});

module.exports = router;