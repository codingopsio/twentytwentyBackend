const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Calling the database method
connectDB();

// Load Route Files
const webinars = require('./routes/webinars');

const app = express();

// Body Parser
app.use(express.json());

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Initializing middleware for fileupload
app.use(fileUpload());

// Making the public folder static to access from anywhere
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/webinars', webinars);

app.use(errorHandler);

// Connection to server
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.yellow
  )
);

// Handling unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Exit the server
  server.close(() => process.exit(1));
});
