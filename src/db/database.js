const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const db = new sqlite3.Database("notification.db");

const schema = fs.readFileSync(
    path.join(__dirname,"schema.sql"),
    "utf8"
);

db.exec(schema);

module.exports=db;