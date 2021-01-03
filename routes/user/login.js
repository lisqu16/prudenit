const express = require("express");
const fetch = require("node-fetch")
const { server } = require("../../config")
const router = express.Router();

router.post("/", async (req, res) => {
    fetch(`${server}/user/login`, {
        method: "POST",
        body: req.body
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (!data.ok) {
            return res.render("login", {
                locales: req.locales,
                email: req.body.email,
                errs: data.messages
            });
        }
        // yay logged in
    });
});

module.exports = router;