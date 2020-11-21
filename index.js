const express = require("express");
const { join } = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render(join(__dirname + "/pages/index"), {});
});

app.listen(8080);