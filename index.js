const express = require("express");
const cookieParser = require("cookie-parser");
const { join } = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, 'public')));
app.use(cookieParser());

const getLocales = (component, request, response) => {
    if (!request.cookies.lang) {
        let lang = (request.acceptsLanguages("en-GB", "pl-PL") || "en-GB")
        response.cookie("lang", lang)
        return require(join(__dirname + `/locales/${lang}/${component}.json`));
    } else {
        return require(join(__dirname + `/locales/${request.cookies.lang}/${component}.json`))
    }
}

app.get("/login", (req, res) => {
    res.render(join(__dirname + "/pages/login"), {
        locales: getLocales("login", req, res)
    });
})

app.get("/", (req, res) => {
    res.render(join(__dirname + "/pages/index"), {});
});

app.listen(1337);