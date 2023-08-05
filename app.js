const express = require('express');

const path = require('path');

const database = require('./database');

const cookieParser = require('cookie-parser');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

const Pages = require('./routes/pages');

const Auth = require('./routes/auth');
const exp = require('constants');

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname,'./public');

// Use the static file like css and js in which we are define in the public directory
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());



app.use(Pages);

app.use(Auth);


app.listen(5000);