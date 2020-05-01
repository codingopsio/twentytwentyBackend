const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req , res , next) => {
    //getting token
    const token = req.header('x-auth-token');
    //check if no token exist
    if(!token) return res.status(401).json({ msg: 'Not Authorized:: Auth Middleware' });

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid:: auth.js" })
    }
}