import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing SMTP user:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'chemxpumps@gmail.com',
    pass: process.env.SMTP_PASS,
  },
});

try {
  console.log('Verifying connection with new App Password...');
  await transporter.verify();
  console.log('✔ SUCCESS: Gmail SMTP Credentials Verified!');

  console.log('Sending test email to:', process.env.CONTACT_RECEIVER_EMAIL);
  const info = await transporter.sendMail({
    from: `"Chem-X System" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: '🎉 Chem-X Email Setup Verification',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #0b1e36;">
        <h2 style="color: #ff6b00;">Chem-X Email Notifications Working!</h2>
        <p>This test confirms that inquiry emails will now be delivered instantly to <strong>chemxpumps@gmail.com</strong>.</p>
        <p style="font-size: 12px; color: #64748b;">Timestamp: ${new Date().toISOString()}</p>
      </div>
    `,
  });
  console.log('✔ SUCCESS: Email delivered! Message ID:', info.messageId);
} catch (err) {
  console.error('✖ SMTP Error:', err.message);
}
