const express = require("express");
const { captcha: { sitekey } } = require("../../config.js");
const r = require("rethinkdb");
const bcrypt = require("bcrypt");

const router = express.Router();

const notAllowedPhrases = [
    "password",
    "123",
    "qwerty",
    "abc",
    "1q2w3e4r",
    "admin",
    "welcome",
    "freedom",
    "donald",
    "1qaz2wsx",
    "letmein",
    "football",
    "trustno1",
    "michael"
];

router.post("/", async (req, res) => {
    let errors = [];
    const e = () => {
        let errs = [];
        let errorsList = ["wrongEmail", "wrongUsernameLength", "differentPasswords", "tooShortPassword", "withoutNumberPassword", "commonlyUsedPassword", "alreadyAssignedEmail"];
        errors.forEach(code => errs.push(errorsList[code-1]));
        return res.render("register", {
            locales: req.locales,
            email: req.body.email,
            username: req.body.username,
            errs,
            sitekey
        });
    }

    try {
        // email check
        if (req.body.email == "" 
            || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)))
            errors.push(1); 

        // username check
        if (req.body.username.length <= 1 || req.body.username.length > 48)
            errors.push(2); 

        // password check
        if (req.body.password !== req.body.repassword) errors.push(3);
        if (!(req.body.password.length >= 8)) errors.push(4); 
        if (!(/\d/.test(req.body.password))) errors.push(5); 
        if (notAllowedPhrases.indexOf(req.body.password.toLowerCase()) > -1) errors.push(6);

        // checking if email already exists in database
        r.table("users")
            .filter({
                "email": req.body.email
            }).run(req.db, function(err, cursor) {
                if (err) throw new Error("An unexcepted error occured!");
                cursor.toArray(function(err, result) {
                    if (result.length > 0) {
                        errors.push(7);
                    }
                    if (errors.length !== 0) {
                        return e();
                    } else {
                        // hashing password
                        let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

                        // inserting data to database
                        r.table("users").insert({
                            email: req.body.email,
                            username: req.body.username,
                            password
                        }).run(req.db, function(err, result){
                            if (err) throw new Error("An unexcepted error occured!");
                            res.redirect("/login");
                        });
                    }
                });
            });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;