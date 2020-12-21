require("dotenv").config();
const e = process.env;
module.exports = {
    "rethinkdb": {
        "host": e.DBHOST,
        "port": e.DBPORT,
        "user": e.DBUSER,
        "password": e.DBPASSWORD,
        "name": e.DBNAME
    },
    "captcha": {
        "sitekey": e.SITEKEY,
        "secret": e.SECRET
    }
};