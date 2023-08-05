const express = require('express');

const router = express.Router();

const requireAuth = require('../requireAuth');

router.get('/', requireAuth, (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
})
module.exports = router;