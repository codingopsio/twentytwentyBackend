const mongoose = require('mongoose');

const QNASchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    }
});

module.exports = QNA = mongoose.model('qna' , QNASchema);