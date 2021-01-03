require("dotenv").config();
const e = process.env;
module.exports = {
    "captcha": {
        "sitekey": e.SITEKEY,
        "secret": e.SECRET
    },
    "server": e.SERVER
};