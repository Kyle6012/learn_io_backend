const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Change to your SMTP provider
  port: 465, // 587 for TLS, 465 for SSL
  secure: true, // Use TLS
  auth: {
    user: 'kennedygreat36@gmail.com', //
    pass: '', // Replace with your actual password or API key
  },
});

const mailOptions = {
  from: 'kennedygreat36@gmail.com', // Your email
  to: 'douglasdollars900@gmail.com', // Replace with recipient email
  subject: 'Hello from Node.js SMTP!',
  text: 'Tragaph was here',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});

module.exports = { transporter };
