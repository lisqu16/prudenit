const express = require("express");
const cookieParser = require("cookie-parser");
const { join } = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, 'public')));
app.use(cookieParser());

const getLocales = (request, response) => {
    if (!request.cookies.lang) {
        let lang = (request.acceptsLanguages("en-GB", "pl-PL") || "en-GB")
        response.cookie("lang", lang)
        return require("./locales/"+lang);
    } else {
        return require("./locales/"+request.cookies.lang)
    }
}

app.get("/login", (req, res) => {
    res.render(join(__dirname + "/pages/login"), {
        locales: getLocales(req, res)
    });
})

app.get("/", (req, res) => {
    res.render(join(__dirname + "/pages/index"), {
        locales: getLocales(req, res)
    });
});

app.listen(8080);