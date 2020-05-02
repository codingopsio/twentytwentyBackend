const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    savedWebinars: [
        {
            title: {
                type: String
            },
            date: {
                type: String
            },
            description: {
                type: String
            },
            Url: {
                type: String
            },
            image: {
                type: String
            }
        }
    ],
    avatar: {
        type: String
    }
});

module.exports = User = mongoose.model('users' , UserSchema);