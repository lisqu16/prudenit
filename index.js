const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { join } = require("path");

const app = express();
app.use(express.static(join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use("/*", async (req, res, next) => {
    var langs = ["en-GB", "pl-PL"];
    if (!req.cookies.lang) {
        let lang = (req.acceptsLanguages(langs) || "en-GB")
        res.cookie("lang", lang)
        req.locales = require(join(__dirname + `/locales/${lang}.json`));
    } else if (!langs.includes(req.cookies.lang)) {
            res.cookie("lang", "en-GB");
            req.locales = require(join(__dirname + `/locales/en-GB.json`));
    } else {
        req.locales = require(join(__dirname + `/locales/${req.cookies.lang}.json`));
    }
    next();
});

app.use("/login", require("./routes/user/login.js"));
app.use("/register", require("./routes/user/register.js"));

app.get("/login", (req, res) => {
    res.render("login", {
        locales: req.locales,
        email: "",
        errs: []
    });
})
app.get("/register", (req, res) => {
    res.render("register", {
        locales: req.locales,
        email: "",
        username: "",
        errs: []
    });
})

app.get("/", (req, res) => {
    res.render("index", {
        locales: req.locales
    });
});

app.listen(8080);