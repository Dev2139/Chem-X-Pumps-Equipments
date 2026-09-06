import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const router = express.Router();

/**
 * Helper to get or create Nodemailer transporter.
 * Uses SMTP settings from .env if provided.
 * Fallbacks to Ethereal Email test account in development mode.
 */
async function getTransporter() {
  // Refresh environment variables in case .env was updated
  dotenv.config();

  const user = process.env.SMTP_USER || 'chemxpumps@gmail.com';
  const pass = process.env.SMTP_PASS || 'bueeowenobrtvayx';

  return {
    transporter: nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    }),
    isTest: false,
  };
}

// POST /api/contact - Handle form submissions (Homepage, Contact Page, Quote Modal)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, company, product, type } = req.body;

    if (!email || (!name && !company)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide at least a contact name/company and valid email address.' 
      });
    }

    const { transporter, isTest } = await getTransporter();

    const senderEmail = process.env.SMTP_USER || email;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'chemxpumps@gmail.com';

    const submissionType = type || (product ? 'Technical Quote Request' : 'Homepage Quick Inquiry');
    const formSubject = subject || `${submissionType}: Inquiry from ${name || company || 'Website Visitor'}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0b1e36; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; color: #ffffff;">Chem-X Industrial Inquiry</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #ff6b00; font-weight: bold; text-transform: uppercase;">${submissionType}</p>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px; color: #0b1e36;">Submitter Name:</td>
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
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0b1e36;">Equipment/Product:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #ff6b00;">${product}</td>
            </tr>` : ''}
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #0b1e36; padding: 16px; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #64748b;">Message / Technical Requirements:</p>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${message || 'No additional message text provided.'}</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Sent automatically from Chem-X Pumps & Equipment Website Inquiry System
        </div>
      </div>
    `;

    const senderUser = process.env.SMTP_USER || 'chemxpumps@gmail.com';
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'chemxpumps@gmail.com';

    // From header using authenticated sender address to comply with Gmail SMTP security policy
    const fromName = name ? `${name} via Chem-X Web` : 'Chem-X Web Inquiry';
    const fromHeader = `"${fromName}" <${senderUser}>`;

    const mailOptions = {
      from: fromHeader,
      to: recipientEmail,
      replyTo: email || senderUser,
      subject: `🔔 NEW INQUIRY: ${name || company || 'Customer'} - ${submissionType}`,
      html: htmlContent,
      text: `New Website Inquiry\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nMessage: ${message}`,
    };

    // Send single inquiry email to owner/admin email
    const info = await transporter.sendMail(mailOptions);
    let previewUrl = null;

    if (isTest) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('---------------------------------------------------------');
      console.log('✉ [Nodemailer Test Mode] Inquiry Email Generated!');
      console.log(`✉ Submitter: ${name} <${email}>`);
      console.log(`✉ Test Email Preview URL: ${previewUrl}`);
      console.log('---------------------------------------------------------');
    } else {
      console.log(`✔ [Nodemailer] Inquiry email delivered to ${recipientEmail} (MsgID: ${info.messageId})`);
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! Our team will contact you shortly.',
      previewUrl,
    });
  } catch (error) {
    console.error('✖ [Nodemailer Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email inquiry. Please try again later or call us directly.',
      error: error.message,
    });
  }
});

export default router;
