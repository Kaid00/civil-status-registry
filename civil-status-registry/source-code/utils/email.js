const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Civil Registry <admin@khan.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
