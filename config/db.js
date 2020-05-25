const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log(
    `MongoDB connected to ${connect.connections[0].name}`.bold.underline.cyan
  );
};

module.exports = connectDB;
