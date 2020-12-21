const express = require("express");
const r = require("rethinkdb");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", (req, res) => {
    let errors = [];
    const e = () => {
        let errs = [];
        let errorsList = ["wrongEmailOrPassword"];
        errors.forEach(code => errs.push(errorsList[code-1]));
        return res.render("login", {
            locales: req.locales,
            email: req.body.email,
            errs
        });
    }

    if (req.body.email == "" 
    || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email))) {
        errors.push(1);
        return e();
    }
    r.table("users")
        .filter({
            "email": req.body.email
        }).run(req.db, function(err, cursor) {
            if (err) throw new Error("An unexcepted error occured!");
            cursor.toArray(function(err, result) {
                if (result.length < 1) {
                    errors.push(1);
                    return e();
                }
                let password = bcrypt.compareSync(req.body.password, result[0].password);
                if (!password) { 
                    errors.push(1);
                    return e();
                }
                // logowanie sie udało jej
            });
        });
});


module.exports = router;