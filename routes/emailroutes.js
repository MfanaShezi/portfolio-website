const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:process.env.EMAIL_USER,   
            pass:process.env.EMAIL_PASS,   
        },
    });


    let mailOptions = {
        from: `"Website Port-folio Contact Form" <${process.env.EMAIL_USER}>`, // Use authenticated email as sender
        replyTo: email, // Set reply-to as the form submitter's email
        to: process.env.EMAIL_USER,    // Email address to receive form submissions
        subject: 'website Portfolio Contact Form Message',
        text: `Message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error); 
            return res.status(500).send('Error while sending the email.');
        }
        console.log('Email sent:', info);
        res.status(200).send('Message sent successfully!');
    });
});

module.exports = router;
