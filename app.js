/* packages declaration */
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config({ path: './.env'}); // tells the location of .env files

const app = express(); // to start the server

/* values in our database */
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public'); // loading public folder in our current directory
app.use(express.static(publicDirectory)); // using publicdirectory loaded above using express

app.use(express.urlencoded({ extended: false})); // to parse url-encoded bodies (as sent by html forms)
app.use(express.json()); // to parse json bodies (as sent by api clients)
app.use(cookieParser());

app.set('view engine', 'hbs'); // tells the server to use hbs view engine

/* connecting our database */
db.connect((error)=>{
    if(error)
    { console.error(error); }
    else
    { console.log("MySQL connected"); }

});

/* define routes */
app.use("/", require('./routes/pages'));
app.use("/auth", require("./routes/auth"));

app.listen(5000, ()=>{
    console.log("Server started at port 5000");
});