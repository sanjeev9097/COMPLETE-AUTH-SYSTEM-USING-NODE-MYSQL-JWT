const db = require('mysql2');

const dotenv = require('dotenv');

// Path of .env file 
dotenv.config({path : './.env'});

const connection = db.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database,
});



connection.connect( (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected');
    }
})

module.exports = connection;
