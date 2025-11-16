
import dotenv from 'dotenv'
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass : process.env.APP_PASSWORD
  },
});
console.log("EMAIL_USER:", `"${process.env.EMAIL_USER}"`);
console.log("APP_PASSWORD:", `"${process.env.APP_PASSWORD}"`);

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export default transporter ;