const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailteste81t@gmail.com',
    pass: 'bcdwegwxynsdhrxk'
  }
});
const send = () => {
  // Define email options
  const mailOptions = {
    from: '"Beauty Salon support" mailteste81t@gmail.com', // Sender email address
    to: 'tanmelo81@gmail.com', // Recipient email address
    subject: 'Validation of your meeting', // Email subject
    html: "<h2>Hello ---,</h2> </br><h3>Your meeting has been approved</h3></br><h3>See you soon</h3>" // Email body (plain text)
    // You can also use html: '<h1>Hello from Node.js!</h1>' for HTML content
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Send email
module.exports = {
  send
}