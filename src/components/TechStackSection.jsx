import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const MARQUEE_ITEMS = [
  'React', 'Next.js', 'PHP 8.2', 'WordPress Core', 'Elementor',
  'Tailwind CSS', 'Antigravity 2.0', 'Netlify', 'Flywheel', 'Plesk',
  'ISPConfig', 'Hostinger', 'MySQL', 'REST API', 'FileZilla',
  'VS Code', 'Cursor AI', 'POS Peripherals', 'Thermal Printers', 'Zero-Code',
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
    tags: ['Custom PHP', 'WordPress Core', 'Antigravity 2.0', 'REST API'],
  },
  {
    label: 'Infrastructure',
    color: '#8E4BEB',
    bg: 'rgba(142,75,235,0.07)',
    tags: ['Netlify', 'Flywheel', 'Hostinger', 'Plesk', 'ISPConfig'],
  },
  {
    label: 'Hardware',
    color: '#4755E9',
    bg: 'rgba(71,85,233,0.07)',
    tags: ['POS Peripheral Sync', 'Thermal Bluetooth Printers'],
  },
]

function MarqueeItem({ text }) {
  return (
    <span className="flex items-center gap-6 mx-6">
      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">{text}</span>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#8E4BEB', opacity: 0.4 }} />
    </span>
  )
}

export default function TechStackSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section id="tech-stack" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
              Technology Stack
            </span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-end gap-4 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              The Engine Behind{' '}
              <span className="text-gradient">Our Engineering.</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-2 w-14 h-1 rounded-full" style={{ background: '#8E4BEB' }} />
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
        className="mb-16 relative"
      >
        {/* Left/right fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }}
        />

        <div className="marquee-wrap py-5 border-y border-gray-100">
          <div className="marquee-track flex items-center">
            {doubled.map((item, i) => (
              <MarqueeItem key={i} text={item} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category pills */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              className="rounded-2xl p-5 border border-gray-100 bg-white"
              style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.05)' }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3 pb-3 border-b"
                style={{ color: cat.color, borderColor: `${cat.bg}` }}
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
