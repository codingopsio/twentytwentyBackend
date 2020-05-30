const ErrorResponse = require('../utils/errorResponse');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (options) => {
  // Initialize email transporter
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  //   Basic configuration object
  const configureObj = {
    to: options.email,
    from: 'twentytwentydevops@gmail.com',
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(configureObj);
};

module.exports = sendEmail;
