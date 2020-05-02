const express = require('express');
const route = express.Router();
const {validationResult , check} = require('express-validator');
const auth = require('../../auth_middleware/auth')
const User = require('../../models/User');
const QNA = require('../../models/QNA');
const checks = [
    check('text' , 'Text is required').not().isEmpty(),
    check('type' , 'Select type').not().isEmpty()
];

//@desc post a ques or ans
//@method POST
//@access private
route.post('/' , [auth , checks] , async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }    
    try {
        const user = await User.findById(req.user.id).select('-password');
        const { type , text } = req.body;
        const qna = new QNA({
            type: type,
            text: text,
            postedBy: req.user.id,
            name: user.name
        });
        const qnaPosted = await qna.save();
        res.json(qnaPosted);
    } catch (error) {
        console.error(error);
        return res.json(500).json({ msg: "Server error QNA" });
    }
});

//@desc GET a ques or ans
//@method GET
//@access private
route.get('/' , [auth] , async (req , res) => {
    try {
        const allqna = await QNA.find();
        res.json(allqna);
    } catch (error) {
        console.error(error);
        return res.json(500).json({ msg: "Server error GET QNA" });
    }
});

module.exports = route;