const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')

const mongoConnect = async () => {
    try {
        await mongoose.connect(db , {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected");
    } catch (error) {
        console.log("Error while connecting to db");
    }
}

module.exports = mongoConnect;