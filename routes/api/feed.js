const express = require('express');
const route = express.Router();

route.get('/' , (req , res) => {
    res.send("feed route");
});

module.exports = route;