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
    // Send mail using the transport object
    const orderData = {
      customerName: data?.firstname,
      orderNumber: data?.orderNumber,
      totalAmount: data?.finalAmount,
      orderItems: data?.items,
      paymentMethod: data?.paymentMethod,
      shippingAddress: data?.address,
      customerEmail:data?.to,
  };
  
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #333333; }
            p { color: #555555; }
            .order-details { margin-top: 20px; }
            .order-details p { margin: 5px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; font-size: 12px; color: #999999; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirmation: Your Order is in Process!</h2>
            <p>Dear ${orderData.customerName},</p>
            <p>We've successfully received your order with the following details:</p>

            <div class="order-details">
                <p><strong>Order Number:</strong> #${orderData.orderNumber}</p>
                <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                <p><strong>Order Items:</strong> ${orderData.orderItems}</p>
                <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                <p><strong>Shipping Address:</strong> ${orderData.shippingAddress}</p>
                <p><strong>Anticipated Delivery Date:</strong> Within 3 to 5 working days.</p>
            </div>

            <p>Thank you for choosing <strong>voguemine.com</strong> for your shopping needs!</p>

            <div class="footer">
                <p>&copy; 2024 Voguemine. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;



    const info = await transporter.sendMail({
      from: '"VOGUEMINE" <info@voguemine.com>', // Sender address
      to: data.to, // Receiver (can be passed through data)
      subject:'Confirmation: Your Order is in Process!', // Email subject
      text:"Confirmation: Your Order is in Process!", // Plain text body
      html: htmlContent, // HTML body (if passed)
    });

    console.log("Message sent: %s", info.messageId);

    // Send a success response back to the client
  } catch (error) {
    console.error("Error sending email:", error);

  }
});

module.exports = sendEmail;
