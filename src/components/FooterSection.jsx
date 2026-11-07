import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { fadeUp, fadeRight, staggerContainer, viewportOnce } from '../lib/motion'

const PROJECT_TYPES = [
  'Custom Web Development',
  'SaaS / Multi-Tenant Platform',
  'POS / Kiosk System',
  'Cloud Infrastructure',
  'E-Commerce Storefront',
  'UI/UX Design',
  'Other',
]

export default function FooterSection() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitted(true); setSubmitting(false) }, 1100)
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8E4BEB 0%, #6549EC 50%, #4755E9 100%)' }}
    >
      {/* Subtle noise/grain overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Orb blobs inside footer */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.07)', filter: 'blur(80px)', transform: 'translate(-40%,-40%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.06)', filter: 'blur(60px)', transform: 'translate(40%,40%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* Top label */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">
            Let's Build Together
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to build something{' '}
            <span className="underline underline-offset-4 decoration-white/30">remarkable?</span>
          </motion.h2>
        </motion.div>

        {/* 2-column split */}
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-white/15">

          {/* LEFT — Minimalist form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-white font-bold text-lg mb-8">Send a message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                  <CheckCircle2 size={26} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl mb-2">Message received.</h4>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                    We'll review your project and get back to you within 24 hours. Looking forward to building with you.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: '', message: '' }) }}
                  className="text-white/60 text-sm underline underline-offset-2 hover:text-white transition-colors text-left"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      name="name" value={form.name} onChange={onChange}
                      required placeholder="John Smith"
                      className="footer-input"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Email</label>
                    <input
                      name="email" type="email" value={form.email} onChange={onChange}
                      required placeholder="john@company.com"
                      className="footer-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Project Type</label>
                  <select
                    name="type" value={form.type} onChange={onChange}
                    required className="footer-input"
                  >
                    <option value="" disabled>Select a category…</option>
                    {PROJECT_TYPES.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={onChange}
                    required rows={4} placeholder="Tell us about your project…"
                    className="footer-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="self-start flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all disabled:opacity-70"
                  style={{
                    background: 'white',
                    color: '#8E4BEB',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>Send Message <ArrowUpRight size={14} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* RIGHT — Large, elegant contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:pl-8 flex flex-col justify-between"
          >
            {/* Contact details — editorial style */}
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
                      <Icon size={13} className="text-white/40" />
                      <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">{info.label}</span>
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

            {/* Agency tagline card */}
            <div
              className="mt-12 p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <img src="/logo.png" alt="Inpixel Labs" className="h-7 w-auto mb-3 brightness-0 invert" />
              <p className="text-white/55 text-xs leading-relaxed">
                A premium software development agency delivering world-class digital products from Jamnagar — serving clients across Europe and beyond.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-white/40 text-xs">© 2026 Inpixel Labs. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a key={l} href="#" className="text-white/40 text-xs hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
