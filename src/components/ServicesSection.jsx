import { motion } from 'framer-motion'
import { Globe, Layers, ShoppingCart, Cloud, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn, viewportOnce } from '../lib/motion'

const SERVICES = [
  {
    id: 'web',
    colSpan: 'md:col-span-2',
    icon: Globe,
    tag: 'Web Dev',
    title: 'Custom Web & Platform Development',
    description:
      'We build fast, secure, and fully customized web applications using robust PHP frameworks and tailored WordPress/Elementor architectures to meet complex business requirements.',
    accent: '#8E4BEB',
    chips: ['PHP 8.3 Frameworks', 'Custom WordPress Core', 'Elementor Engine', 'REST APIs', 'MySQL'],
  },
  {
    id: 'saas',
    colSpan: 'md:col-span-1',
    icon: Layers,
    tag: 'SaaS Platform',
    title: 'SaaS & Multi-Tenant Solutions',
    description:
      'Scalable software-as-a-service development, including appointment scheduling systems, financial utilities, and multi-user platforms engineered for high traffic and seamless user onboarding.',
    accent: '#4755E9',
    chips: ['Multi-Tenant', 'Appointment Booking', 'Billing Engines'],
  },
  {
    id: 'pos',
    colSpan: 'md:col-span-1',
    icon: ShoppingCart,
    tag: 'Retail & POS',
    title: 'Point-of-Sale (POS) & Kiosk Systems',
    description:
      'Complete white-label POS software, self-service kiosk interfaces, and online ordering ecosystems designed to streamline operations for modern retail and restaurant merchants.',
    accent: '#8E4BEB',
    chips: ['White-Label POS', 'Thermal Printing', 'Kiosk UI'],
  },
  {
    id: 'cloud',
    colSpan: 'md:col-span-2',
    icon: Cloud,
    tag: 'Infrastructure',
    title: 'Cloud Infrastructure & Deployment',
    description:
      'Reliable server configuration and hosting administration. We ensure your applications run at peak performance with secure cloud deployments, Hostinger/Netlify pipelines, and optimized database architecture.',
    accent: '#4755E9',
    chips: ['Hostinger Cloud', 'Netlify Pipelines', 'Plesk / ISPConfig', 'SSL/TLS Hardening', 'Database Tuning'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#8E4BEB', background: 'rgba(142,75,235,0.08)' }}
            >
              Our Core Services
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            Built for Growth,{' '}
            <span className="text-gradient">Designed for Scale.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 text-base sm:text-lg mt-4 leading-relaxed">
            From modern web architecture to custom multi-tenant software and hardware integration, we engineer end-to-end digital excellence.
          </motion.p>
        </motion.div>

        {/* Strict CSS Bento Grid: 3 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {SERVICES.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                className={`${card.colSpan} h-full w-full bg-white rounded-3xl p-8 sm:p-9 border border-gray-100 card-hover flex flex-col justify-between group cursor-default shadow-sm`}
              >
                <div>
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{ background: `rgba(${card.accent === '#8E4BEB' ? '142,75,235' : '71,85,233'},0.09)` }}
                    >
                      <Icon size={26} style={{ color: card.accent }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color: card.accent,
                        background: `rgba(${card.accent === '#8E4BEB' ? '142,75,235' : '71,85,233'},0.07)`,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Chips & Action */}
                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {card.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-gray-200/60 text-slate-600 font-medium"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: card.accent }}
                  >
                    <span>Explore Solutions</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
