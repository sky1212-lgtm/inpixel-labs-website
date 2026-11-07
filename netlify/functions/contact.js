import nodemailer from 'nodemailer'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { name, email, type, message } = JSON.parse(event.body || '{}')

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please provide name, email, and message.' }),
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'hello@inpixellabs.com',
        pass: process.env.SMTP_PASS,
      },
    })

    const subject = `[Inpixel Labs Inquiry] ${type || 'General'} - from ${name}`

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 12px;">
        <h2 style="color: #8E4BEB; margin-top: 0;">New Project Inquiry</h2>
        <p style="color: #64748b; font-size: 14px;">Received from Inpixel Labs Website</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 130px; font-weight: bold;">Client Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Client Email:</td>
            <td style="padding: 8px 0; color: #4755E9;"><a href="mailto:${email}" style="color: #4755E9;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Project Type:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${type || 'Not specified'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #8E4BEB; border-radius: 4px;">
          <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Inpixel Labs &bull; Jamnagar, Gujarat, India</p>
      </div>
    `

    await transporter.sendMail({
      from: `"Inpixel Labs Inquiries" <${process.env.SMTP_USER || 'hello@inpixellabs.com'}>`,
      to: process.env.CONTACT_EMAIL || 'hello@inpixellabs.com',
      replyTo: email,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nMessage:\n${message}`,
      html: htmlContent,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Message sent successfully via SMTP!' }),
    }
  } catch (err) {
    console.error('SMTP Send Error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Failed to send email via SMTP.' }),
    }
  }
}
