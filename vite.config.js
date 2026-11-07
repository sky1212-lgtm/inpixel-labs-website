import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

function smtpApiPlugin(env) {
  return {
    name: 'smtp-contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              const { name, email, type, message } = JSON.parse(body || '{}')

              if (!name || !email || !message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'Please provide name, email, and message.' }))
              }

              const transporter = nodemailer.createTransport({
                host: env.SMTP_HOST || 'smtp.hostinger.com',
                port: Number(env.SMTP_PORT) || 465,
                secure: true,
                auth: {
                  user: env.SMTP_USER || 'hello@inpixellabs.com',
                  pass: env.SMTP_PASS,
                },
              })

              const subject = `New Inquiry: ${name} (${type || 'General'})`
              const plainText = `You have received a new project inquiry from the Inpixel Labs website:

Client Name: ${name}
Client Email: ${email}
Project Type: ${type || 'General'}

Client Message:
${message}

---
Inpixel Labs
Jamnagar, Gujarat, India
https://inpixellabs.com`

              const htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                  <h2 style="color: #8E4BEB; margin-top: 0; font-size: 20px;">New Project Inquiry</h2>
                  <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Submitted from Inpixel Labs Website</p>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; width: 130px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Client Name:</td>
                      <td style="padding: 10px 0; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Client Email:</td>
                      <td style="padding: 10px 0; color: #4755E9; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #4755E9; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Project Type:</td>
                      <td style="padding: 10px 0; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${type || 'Not specified'}</td>
                    </tr>
                  </table>
                  <div style="padding: 18px; background-color: #f8fafc; border-left: 4px solid #8E4BEB; border-radius: 6px; margin-bottom: 24px;">
                    <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                  <p style="color: #94a3b8; font-size: 12px; margin: 0;">Inpixel Labs &bull; Jamnagar, Gujarat, India</p>
                </div>
              `

              await transporter.sendMail({
                from: `"Inpixel Labs" <${env.SMTP_USER || 'hello@inpixellabs.com'}>`,
                to: env.CONTACT_EMAIL || 'hello@inpixellabs.com',
                replyTo: `"${name}" <${email}>`,
                subject: subject,
                text: plainText,
                html: htmlContent,
                headers: {
                  'Auto-Submitted': 'auto-generated',
                  'X-Auto-Response-Suppress': 'All',
                },
              })

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Sent via Hostinger SMTP!' }))
            } catch (err) {
              console.error('SMTP Middleware Error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message || 'SMTP send failure' }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), smtpApiPlugin(env)],
    build: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
  }
})
