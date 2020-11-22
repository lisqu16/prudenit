const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const rethinkdb = require("rethinkdb");
const { join } = require("path");
const { rethinkdb: { host, port, user, password, db } } = require("./config.json");

// connecting with database
let connection;
rethinkdb.connect({
    host,
    port,
    user,
    password,
    db
}, function (err, conn) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    connection = conn;
});

const app = express();
app.use(express.static(join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
})); 

const getLocales = (component, request, response) => {
    if (!request.cookies.lang) {
        let lang = (request.acceptsLanguages("en-GB", "pl-PL") || "en-GB")
        response.cookie("lang", lang)
        return require(join(__dirname + `/locales/${lang}/${component}.json`));
    } else {
        return require(join(__dirname + `/locales/${request.cookies.lang}/${component}.json`))
    }
}

app.use("/auth/", async (req, res, next) => {
    req.db = connection;
    next();
}, require("./api/auth.js"));

app.get("/login", (req, res) => {
    res.render(join(__dirname + "/pages/login"), {
        locales: getLocales("login", req, res)
    });
})
app.get("/register", (req, res) => {
    var errors = [];
    if (req.cookies.errors) {
        errors = req.cookies.errors;
        res.clearCookie("errors");
    }
    res.render(join(__dirname + "/pages/register"), {
        locales: getLocales("login", req, res),
        errors
    });
})

app.get("/", (req, res) => {
    res.render(join(__dirname + "/pages/index"), {
        locales: getLocales("index", req, res)
    });
});

app.listen(8080);