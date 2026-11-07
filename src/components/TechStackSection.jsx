import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const MARQUEE_ITEMS = [
  'Modern JavaScript', 'React 18', 'Custom PHP 8.3', 'WordPress Core', 'Elementor',
  'Tailwind CSS', 'Antigravity 2.0', 'Netlify', 'Flywheel', 'Hostinger Cloud',
  'Plesk', 'ISPConfig', 'MySQL & REST APIs', 'VS Code & Cursor',
  'POS Peripheral Sync', 'Thermal Bluetooth Printers', 'Zero-Code Integrations',
]

const CATEGORIES = [
  {
    label: 'Frontend & UI/UX',
    color: '#8E4BEB',
    bg: 'rgba(142,75,235,0.07)',
    tags: ['Modern JavaScript', 'Responsive HTML/CSS', 'Elementor', 'Tailwind CSS'],
  },
  {
    label: 'Backend & CMS',
    color: '#4755E9',
    bg: 'rgba(71,85,233,0.07)',
    tags: ['Custom PHP', 'WordPress Core', 'Antigravity 2.0', 'REST APIs'],
  },
  {
    label: 'Hosting & Infrastructure',
    color: '#8E4BEB',
    bg: 'rgba(142,75,235,0.07)',
    tags: ['Netlify', 'Flywheel', 'Hostinger', 'Plesk', 'ISPConfig'],
  },
  {
    label: 'Hardware & Deployment',
    color: '#4755E9',
    bg: 'rgba(71,85,233,0.07)',
    tags: ['POS Peripheral Sync', 'Thermal Bluetooth Printers', 'Cursor AI', 'FileZilla FTP'],
  },
]

function MarqueeItem({ text }) {
  return (
    <span className="flex items-center gap-6 mx-5">
      <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{text}</span>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#8E4BEB', opacity: 0.5 }} />
    </span>
  )
}

export default function TechStackSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section id="tech-stack" className="py-16 bg-[#F8F9FA] border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10 text-left"
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-3"
              style={{ color: '#8E4BEB', background: 'rgba(142,75,235,0.08)' }}
            >
              Technology Stack
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight"
          >
            The Engine Behind <span className="text-gradient">Our Engineering.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-3 w-14 h-1 rounded-full" style={{ background: '#8E4BEB' }} />
        </motion.div>
      </div>

      {/* Infinite Marquee with Fade Masks matching #F8F9FA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="mb-12 relative"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F8F9FA, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F8F9FA, transparent)' }}
        />

        <div className="marquee-wrap py-4 bg-white/80 backdrop-blur-sm border-y border-gray-200/70 shadow-sm">
          <div className="marquee-track flex items-center">
            {doubled.map((item, i) => (
              <MarqueeItem key={i} text={item} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Pills Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              className="rounded-2xl p-5 border border-gray-200/80 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3 pb-2.5 border-b"
                style={{ color: cat.color, borderColor: cat.bg }}
              >
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ color: cat.color, background: cat.bg }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
