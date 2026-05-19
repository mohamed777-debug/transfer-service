// Node.js + Express Backend for Transfer Service
// Install dependencies: npm install express cors nodemailer body-parser dotenv

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

// Route: Submit transfer request
app.post('/api/submit-transfer', async (req, res) => {
    try {
        const { orangeCash, instapay, amount, timestamp, commission } = req.body;

        // Validate data
        if (!orangeCash || !instapay || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Prepare email content
        const emailContent = `
            <h2>طلب تحويل جديد</h2>
            <table style="border-collapse: collapse; width: 100%;">
                <tr style="background-color: #f0f0f0;">
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>رقم أورانج كاش</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${orangeCash}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>رقم إنستا باي</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${instapay}</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>المبلغ</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${amount} جنيه</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>النسبة</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${commission} جنيه</td>
                </tr>
                <tr style="background-color: #f0f0f0;">
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>الإجمالي</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${amount + commission} جنيه</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>الوقت</strong></td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${timestamp}</td>
                </tr>
            </table>
        `;

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'mkhatap53@gmail.com',
            subject: `طلب تحويل جديد - ${amount} جنيه`,
            html: emailContent
        };

        await transporter.sendMail(mailOptions);

        // Success response
        res.status(200).json({
            success: true,
            message: 'تم استلام طلبك بنجاح',
            totalAmount: amount + commission
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'فشل في معالجة الطلب' });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});