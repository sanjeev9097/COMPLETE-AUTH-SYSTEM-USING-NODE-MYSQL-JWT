const connection = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const dotenv = require('dotenv');

// Path of .env file 
dotenv.config({path : './.env'});

const register = (req, res) => {
    const { name, email, password } = req.body;

    connection.query('SELECT email FROM users WHERE email = ?', [email], async(err, results) => {
        if (err) {
            console.log(err);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: "That email is already in use"
            });
        }
        console.log(password);

        let hashedPassword = await bcrypt.hash(password, 8);
            
        console.log(hashedPassword);

        connection.query('INSERT INTO users SET ?', {name : name, email: email, password: hashedPassword}, (err, results) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                return res.render('register', {
                message: "User registered"
            });
            }
        })
            
       
    });
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: "You need Email and Password.",
            });
        }

        connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).render('error', {
                    message: "An error occurred while logging in.",
                });
            }

            if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
                return res.status(401).render('login', {
                    message: "The email or password is incorrect.",
                });
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN,
                });

                // Convert JWT_EXPIRE_IN to milliseconds
                const jwtExpirationTimeInMs = parseInt(process.env.JWT_EXPIRE_IN) * 1000;

                const cookieOptions = {
                    expires: new Date(Date.now() + jwtExpirationTimeInMs),
                    httpOnly: true,
                };
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).render('error', {
            message: "An error occurred while logging in.",
        });
    }
};


module.exports = { register, login };
