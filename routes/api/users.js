const express = require('express');
const route = express.Router();
const { validationResult , check } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//Models
const User = require('../../models/User');

const checks = [
    check('name' , 'Name is required').not().isEmpty(),
    check('email' , 'Please include a valid email').isEmail(),
    check('password' , 'Please enter a valid password').isLength({ min: 6 })
];

//@desc Register New User
//@method POST
route.post('/' , checks , async (req , res) => {
    const errors = validationResult(req);
    //@errors
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    //getting values from req.body
    const { email , password , mobile , name } = req.body;
    try {
        //checking if user already exists
        let user = await User.findOne({ email: email });
        if(user) { 
            return res.status(400).json({ errors: [ { msg: 'User Already Exists' }] });
        }
        //getting gravatar
        let avatar = gravatar.url(email , {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        //creating new user object
        user = new User({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            avatar: avatar
        });
        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        const result = await user.save();
        
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