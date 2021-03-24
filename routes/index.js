require("dotenv").config();
const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Arrivee = mongoose.model('Arrivee');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.render('home', { title: 'Register or Login' });
});

router.get('/login', (req, res) => {
    res.render('form', { title: 'Login Form' });
});

router.post(
    '/login',
    [
        check('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an Email'),
        check('password')
            .isLength({ min: 1 })
            .withMessage('Please enter a password')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { email, password } = req.body;
            console.log(email, password);
            let loginfo = await Registration.findOne({ email });
            if (!loginfo) {
                console.log('User does not exist!');
                return res.status(400).json({
                    message: "User Does Not Exist"
                });
            }
            if (password != loginfo.password) {
                return res.status(400).json({
                    message: "Wrong Password"
                });
            }
            console.log("Logged in!");
            const token = jwt.sign(
                {
                    email: loginfo.email,
                    id: loginfo._id,

                }, process.env.TOKEN_SECRET,{ expiresIn: '20m' }
            );
            res.json({token});
            res.redirect('/arrivees');
        }
    });

router.get('/register', (req, res) => {
    console.log(req.body);
    res.render('form', { title: 'Registration Form' });
});


router.post(
    '/register',
    [
        check('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an Email'),
        check('password')
            .isLength({ min: 1 })
            .withMessage('Please enter a password'),
    ], (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send('Thanks for registering!'); })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
        } else {
            res.render('form', {
                title: 'Registration Form',
                errors: errors.array(),
                data: req.body,
            });
        }
        console.log(req.body);

    });

router.get("/arrivees", auth, async (req, res) => {
    try {
        console.log("hello");
        const Arrivee = await Arrivee.findOne(req.user.email);
        res.json(Arrivee);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }

});
module.exports = router;