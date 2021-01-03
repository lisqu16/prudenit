const express = require("express");
const fetch = require("node-fetch");
const { server } = require("../../config");
const router = express.Router();

router.post("/", async (req, res) => {
    fetch(`${server}/user/register`, {
        method: "POST",
        body: req.body
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (!data.ok) {
            return res.render("register", {
                locales: req.locales,
                email: req.body.email,
                username: req.body.username,
                errs: data.messages
            });
        }
        res.redirect("/login");
    });
});

module.exports = router;