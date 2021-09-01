const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'smartrazservicios@gmail.com',
      pass: 'smarttrazutn1234'
  }
});

module.exports = transporter

