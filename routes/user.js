const express = require("express");
const router = express.Router();

// routes

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

// signin

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const token = await User.matchpass(email, password);

    return res.cookie("token", token).redirect("/"); 
}
catch(error) {
    return res.render("login",{
        error:"inncorrect email or password",
    });

}


// signup

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