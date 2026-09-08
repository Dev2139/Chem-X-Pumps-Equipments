import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Create Nodemailer transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'dev.patel.codinggita@gmail.com',
    pass: process.env.SMTP_PASS || 'hbrydhsryigwfuzo',
  },
});

// POST /api/contact - Submit customer website inquiry form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, company, product, type } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    const recipient = 'dev.patel.codinggita@gmail.com';
    const formType = type || (product ? 'Technical Quote Request' : 'Website Inquiry');
    const mailSubject = subject || `🔔 New Inquiry from ${name || company || email}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0b1e36; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; color: #ffffff;">Chemx Inquiry Submission</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #ff6b00; font-weight: bold; text-transform: uppercase;">${formType}</p>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px; color: #0b1e36;">Customer Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${name || 'N/A'}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0b1e36;">Company Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0b1e36;">Email Address:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0b1e36;">Phone Number:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone || 'N/A'}</a></td>
            </tr>
            ${product ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0b1e36;">Requested Product:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #ff6b00;">${product}</td>
            </tr>` : ''}
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #0b1e36; padding: 16px; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #64748b;">Message / Requirements:</p>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${message || 'No additional message text provided.'}</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Sent from Chemx Pumps & Equipment Website Form
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Chemx Website Lead" <${process.env.SMTP_USER || 'dev.patel.codinggita@gmail.com'}>`,
      to: recipient,
      replyTo: email,
      subject: `📥 NEW CHEMX LEAD: ${name || company || email} (${phone || 'No Phone'})`,
      html: htmlBody,
      text: `New Website Inquiry\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✔ [Nodemailer] Form submission sent to ${recipient} (MsgID: ${info.messageId})`);

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
    });
  } catch (error) {
    console.error('✖ [Nodemailer Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send inquiry email. Please try again later.',
      error: error.message,
    });
  }
});

export default router;
