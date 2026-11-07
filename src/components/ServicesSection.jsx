import { motion } from 'framer-motion'
import { Globe, Layers, ShoppingCart, Cloud, ArrowUpRight, Code2, Server } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn, viewportOnce } from '../lib/motion'

const CARDS = [
  {
    id: 1,
    icon: Globe,
    tag: 'Web Dev',
    title: 'Custom Web & Platform Development',
    description:
      'We architect fast, secure, and fully customized web applications using robust PHP frameworks and tailored WordPress/Elementor pipelines — engineered for performance and longevity.',
    span: 'lg:col-span-2',
    accent: '#8E4BEB',
    decoration: (
      <div className="mt-6 flex gap-2 flex-wrap">
        {['PHP 8.2', 'WordPress', 'Elementor', 'REST API', 'MySQL'].map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-50 border border-gray-100 text-slate-500 font-medium">{t}</span>
        ))}
      </div>
    ),
  },
  {
    id: 2,
    icon: Layers,
    tag: 'SaaS',
    title: 'SaaS & Multi-Tenant Solutions',
    description:
      'Scalable software-as-a-service platforms including appointment scheduling, financial utilities, and multi-user environments engineered for high traffic.',
    span: 'lg:col-span-1',
    accent: '#4755E9',
    decoration: null,
  },
  {
    id: 3,
    icon: ShoppingCart,
    tag: 'POS & Retail',
    title: 'POS & Kiosk Systems',
    description:
      'Complete white-label POS software, self-service kiosk interfaces, and online ordering ecosystems for modern retail and restaurants.',
    span: 'lg:col-span-1',
    accent: '#8E4BEB',
    decoration: null,
  },
  {
    id: 4,
    icon: Server,
    tag: 'Cloud & DevOps',
    title: 'Cloud Infrastructure & Server Deployment',
    description:
      'Reliable hosting administration across Netlify, Flywheel, and Plesk. We ensure peak performance with optimized cloud deployments, security hardening, and database architecture.',
    span: 'lg:col-span-2',
    accent: '#4755E9',
    decoration: (
      <div className="mt-6 grid grid-cols-3 gap-2">
        {['Netlify', 'Plesk', 'ISPConfig', 'Flywheel', 'Hostinger', 'SSL/TLS'].map((t) => (
          <span key={t} className="text-xs px-2 py-1.5 rounded-lg bg-slate-50 border border-gray-100 text-slate-500 font-medium text-center">{t}</span>
        ))}
      </div>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6 lg:px-8" style={{ background: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ color: '#8E4BEB', background: 'rgba(142,75,235,0.08)' }}
            >
              Core Services
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            Built for Growth,{' '}
            <span className="text-gradient">Designed for Scale.</span>
          </motion.h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid lg:grid-cols-3 gap-4"
        >
          {CARDS.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                className={`${card.span} bg-white rounded-3xl p-7 border border-gray-100 card-hover group cursor-default`}
                style={{ boxShadow: '0 2px 20px -6px rgba(0,0,0,0.06), 0 1px 4px -1px rgba(0,0,0,0.04)' }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{ background: `rgba(${card.accent === '#8E4BEB' ? '142,75,235' : '71,85,233'},0.09)` }}
                  >
                    <Icon size={22} style={{ color: card.accent }} strokeWidth={1.8} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ color: card.accent, background: `rgba(${card.accent === '#8E4BEB' ? '142,75,235' : '71,85,233'},0.07)` }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug tracking-tight">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>

                {/* Decoration */}
                {card.decoration}

                {/* Learn more */}
                <div
                  className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: card.accent }}
                >
                  Learn more <ArrowUpRight size={13} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
