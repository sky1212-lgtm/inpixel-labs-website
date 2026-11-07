import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Copy, ExternalLink, Send } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const PROJECT_TYPES = [
  'Custom Web Development',
  'SaaS / Multi-Tenant Platform',
  'POS / Kiosk System',
  'Cloud Infrastructure',
  'E-Commerce Storefront',
  'UI/UX Design',
  'Other',
]

// Optional Formspree endpoint if user sets it up
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID 
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null

export default function FooterSection() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Custom Web Development', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [viaSmtp, setViaSmtp] = useState(false)
  const [copied, setCopied] = useState(false)

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const subject = `[Project Inquiry] ${form.type || 'New Project'} - from ${form.name || 'Client'}`
  const bodyText = `Hi Inpixel Labs Team,

Name: ${form.name}
Email: ${form.email}
Project Type: ${form.type}

Message:
${form.message}

---
Sent via Inpixel Labs Web Portal`

  const mailtoUrl = `mailto:hello@inpixellabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@inpixellabs.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(`To: hello@inpixellabs.com\nSubject: ${subject}\n\n${bodyText}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // 1. Attempt SMTP API endpoint (/api/contact or Netlify function)
    try {
      const endpoints = ['/api/contact', '/.netlify/functions/contact']
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })
          if (res.ok) {
            const data = await res.json()
            if (data.success) {
              setViaSmtp(true)
              setSubmitted(true)
              setSubmitting(false)
              return
            }
          }
        } catch {
          // try next
        }
      }
    } catch (err) {
      console.warn('API error:', err)
    }

    // 2. Fallback: launch mailto & show confirmation card
    window.location.href = mailtoUrl
    setViaSmtp(false)
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8E4BEB 0%, #6549EC 50%, #4755E9 100%)' }}
    >
      {/* Background noise/grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glowing orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.07)', filter: 'blur(80px)', transform: 'translate(-40%,-40%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.06)', filter: 'blur(60px)', transform: 'translate(40%,40%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* Top Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-white/60 text-xs font-bold tracking-widest uppercase mb-3">
            Let's Build Together
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to build something{' '}
            <span className="underline underline-offset-4 decoration-white/30">remarkable?</span>
          </motion.h2>
        </motion.div>

        {/* 2-Column Section */}
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-white/15">

          {/* LEFT: Contact Form & Dispatch Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-white font-bold text-lg mb-8">Send a message</h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-3xl p-7 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col gap-6 text-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black">
                        {viaSmtp ? 'Message Delivered!' : 'Inquiry Ready!'}
                      </h4>
                      <p className="text-white/70 text-xs mt-0.5">
                        {viaSmtp
                          ? 'Sent securely via our Hostinger mail server to hello@inpixellabs.com.'
                          : 'Your email client has been prepared with your message.'}
                      </p>
                    </div>
                  </div>

                  {viaSmtp ? (
                    <p className="text-white/85 text-sm leading-relaxed">
                      Thank you for contacting Inpixel Labs. We have received your inquiry and will review it and reply within 24 hours.
                    </p>
                  ) : (
                    <>
                      <p className="text-white/80 text-sm leading-relaxed">
                        If your email client didn't open automatically, choose an option below to deliver your inquiry directly to <strong className="text-white underline">hello@inpixellabs.com</strong>:
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={gmailWebUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#8E4BEB] font-bold text-xs hover:bg-white/90 transition-all shadow-lg"
                        >
                          <ExternalLink size={13} /> Open in Gmail Web
                        </a>

                        <a
                          href={mailtoUrl}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 transition-all"
                        >
                          <Mail size={13} /> Open Default Mail App
                        </a>

                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                        >
                          <Copy size={13} /> {copied ? 'Copied to Clipboard!' : 'Copy Message Text'}
                        </button>
                      </div>
                    </>
                  )}

                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: 'Custom Web Development', message: '' }) }}
                      className="text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      ← Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={onSubmit} className="flex flex-col gap-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                        placeholder="John Smith"
                        className="footer-input"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        placeholder="john@company.com"
                        className="footer-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                      Project Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={onChange}
                      required
                      className="footer-input cursor-pointer"
                    >
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt} value={pt} className="text-slate-900 bg-white">
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project goals, timeline, and requirements…"
                      className="footer-input resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="self-start flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all disabled:opacity-70 cursor-pointer"
                      style={{
                        background: 'white',
                        color: '#8E4BEB',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Preparing…
                        </>
                      ) : (
                        <>Send Message <ArrowUpRight size={14} /></>
                      )}
                    </motion.button>

                    <a
                      href={gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/70 hover:text-white underline underline-offset-4 transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} /> Direct email to hello@inpixellabs.com
                    </a>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:pl-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-10">
              {[
                { icon: Mail, label: 'Email', val: 'hello@inpixellabs.com', href: 'mailto:hello@inpixellabs.com' },
                { icon: Phone, label: 'Phone', val: '+91 8128299187', href: 'tel:+918128299187' },
                { icon: MapPin, label: 'Location', val: 'Jamnagar, Gujarat, India', href: null },
              ].map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.label}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={13} className="text-white/50" />
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">{info.label}</span>
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-2xl sm:text-3xl font-black text-white hover:text-white/80 transition-colors tracking-tight leading-tight block"
                      >
                        {info.val}
                      </a>
                    ) : (
                      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight block">
                        {info.val}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Agency card */}
            <div
              className="mt-12 p-6 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <img src="/logo.png" alt="Inpixel Labs" className="h-7 w-auto mb-3 brightness-0 invert" />
              <p className="text-white/65 text-xs leading-relaxed">
                A premium software development agency delivering world-class digital products from Jamnagar — serving clients across Europe and beyond.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-white/50 text-xs">© 2026 Inpixel Labs. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a key={l} href="#" className="text-white/50 text-xs hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
