const express = require('express');
const route = express.Router();
const User = require('../../models/User');
const auth = require('../../auth_middleware/auth');
const { validationResult , check } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const checks = [
    check('email' , 'Please include a valid email').isEmail(),
    check('password' , 'Please enter a valid password').exists()
];

//@method GET
//@desc Validate User
route.get('/' , auth , async (req , res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        return res.status(404).json({ msg: 'Server Error Login Route' })
    }
});

//@method POST
//@desc   Authenticate / LOGIN USER AND GET TOKEN
route.post('/' , checks , async (req , res) => {
    const errors = validationResult(req);
    //@errors
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    //getting values from req.body
    const { email , password } = req.body;
    try {
        //checking if user already exists
        let user = await User.findOne({ email: email });
        if(!user) { 
            return res.status(400).json({ errors: [ { msg: 'Enter Valid Credentials' }] });
        }
       
        //Matching Password
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [ { msg: 'Enter Valid Credentials' }] });
        }
        //jwt stuff
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 45000 }, 
            (error ,token) => {
                if(error) throw error;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ errors: [{ msg: "Server Error" }] });
    }
});


module.exports = route;