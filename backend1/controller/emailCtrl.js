const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data) => {
  // Set up the nodemailer transporter with Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.MAIL_ID, // Gmail user from env
      pass: process.env.MAIL_PASSWORD, // Gmail password from env
    },
  });

  try {

    const info = await transporter.sendMail({
      from: '"VOGUEMINE" <info@voguemine.com>', // Sender address
      to: data?.to, // Receiver (can be passed through data)
      subject:data?.subject, // Email subject
      text:data?.text, // Plain text body
      html: data?.htmlContent, // HTML body (if passed)
    });

    console.log("Message sent: %s", info.messageId);

    // Send a success response back to the client
  } catch (error) {
    console.error("Error sending email:", error);

  }
});

module.exports = sendEmail;
