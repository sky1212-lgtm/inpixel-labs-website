import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Copy, ExternalLink, Send } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const PROJECT_TYPES = [
  'Custom Web & Platform Development',
  'SaaS & Multi-Tenant Solutions',
  'Point-of-Sale (POS) & Kiosk Systems',
  'Cloud Infrastructure & Deployment',
  'E-Commerce Storefront',
  'UI/UX & Brand Identity',
  'Other Custom Architecture',
]

export default function FooterSection() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Custom Web & Platform Development', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [viaSmtp, setViaSmtp] = useState(false)
  const [copied, setCopied] = useState(false)

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const subject = `[Inquiry] ${form.type || 'New Project'} from ${form.name || 'Client'}`
  const bodyText = `Hi Inpixel Labs Team,\n\nName: ${form.name}\nEmail: ${form.email}\nProject: ${form.type}\n\nMessage:\n${form.message}\n\n---\nSent from inpixellabs.com`

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

    // Attempt native Hostinger contact.php or local /api/contact
    try {
      const endpoints = ['/contact.php', '/api/contact.php', '/api/contact', '/.netlify/functions/contact']
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
          // try next endpoint
        }
      }
    } catch (err) {
      console.warn('API error:', err)
    }

    // Fallback: trigger mailto & show confirmation card
    window.location.href = mailtoUrl
    setViaSmtp(false)
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-left"
      style={{ background: 'linear-gradient(135deg, #8E4BEB 0%, #6549EC 50%, #4755E9 100%)' }}
    >
      {/* Background Subtle Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative Blur Spheres */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.08)', filter: 'blur(80px)', transform: 'translate(-40%,-40%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.08)', filter: 'blur(70px)', transform: 'translate(40%,40%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        
        {/* Section Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3">
            Get In Touch &bull; Start a Project
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to engineer something{' '}
            <span className="underline underline-offset-4 decoration-white/30">extraordinary?</span>
          </motion.h2>
        </motion.div>

        {/* 2-Column Split: Vertically Centered (items-center) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-16 border-b border-white/15">

          {/* LEFT COLUMN: Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span>Discuss Your Project</span>
            </h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col gap-6 text-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={26} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black">
                        {viaSmtp ? 'Inquiry Sent Successfully!' : 'Inquiry Ready!'}
                      </h4>
                      <p className="text-white/80 text-xs mt-0.5">
                        {viaSmtp
                          ? 'Delivered directly to hello@inpixellabs.com via our Hostinger mail server.'
                          : 'Your email client has been prepared with your inquiry.'}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/90 text-sm leading-relaxed">
                    Thank you for reaching out to Inpixel Labs. We review every project requirement carefully and will get back to you within 24 hours.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#8E4BEB] font-bold text-xs hover:bg-white/95 transition-all shadow-lg"
                    >
                      <ExternalLink size={13} /> Open in Gmail Web
                    </a>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/25 transition-all cursor-pointer"
                    >
                      <Copy size={13} /> {copied ? 'Copied Details!' : 'Copy Inquiry Text'}
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/15">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: 'Custom Web & Platform Development', message: '' }) }}
                      className="text-xs text-white/70 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      ← Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={onSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                        placeholder="John Smith"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:border-white focus:bg-white/15 text-white placeholder-white/50 text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        placeholder="john@company.com"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:border-white focus:bg-white/15 text-white placeholder-white/50 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                      Project Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={onChange}
                      required
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:border-white focus:bg-white/15 text-white text-sm outline-none transition-all cursor-pointer"
                    >
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt} value={pt} className="text-slate-900 bg-white">
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project goals, scope, and target timeline…"
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/30 focus:border-white focus:bg-white/15 text-white placeholder-white/50 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-9 py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-70 cursor-pointer shadow-xl flex items-center justify-center gap-2"
                      style={{
                        background: '#FFFFFF',
                        color: '#8E4BEB',
                      }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          <span>Sending via Mail Server…</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <ArrowUpRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN: Contact Info & Agency Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full lg:pl-6 flex flex-col justify-center space-y-8"
          >
            {/* Direct Contact Cards */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email Inquiries', val: 'hello@inpixellabs.com', href: 'mailto:hello@inpixellabs.com' },
                { icon: Phone, label: 'Direct Phone', val: '+91 8128299187', href: 'tel:+918128299187' },
                { icon: MapPin, label: 'Headquarters', val: 'Jamnagar, Gujarat, India', href: null },
              ].map((info) => {
                const Icon = info.icon
                return (
                  <div key={info.label} className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <Icon size={14} className="text-white" />
                      </div>
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{info.label}</span>
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-xl sm:text-2xl font-black text-white hover:text-white/80 transition-colors tracking-tight block"
                      >
                        {info.val}
                      </a>
                    ) : (
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tight block">
                        {info.val}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Inpixel Labs Agency Card */}
            <div
              className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-3">
                <img src="/logo.png" alt="Inpixel Labs" className="h-7 w-auto brightness-0 invert" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Engineering scalable digital experiences for ambitious brands across Europe, the US, and worldwide — based with local agility in Jamnagar, Gujarat.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/60 text-xs">
            &copy; 2026 Inpixel Labs. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
