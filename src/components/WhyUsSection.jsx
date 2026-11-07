import { motion } from 'framer-motion'
import { Globe2, Workflow, Target, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

const VALUE_PROPS = [
  {
    icon: Globe2,
    number: '01',
    title: 'Global Standards, Local Agility',
    description:
      'Based in Jamnagar, we deliver world-class digital solutions to international clients across Europe and beyond, offering premium quality with highly efficient development cycles.',
    points: [
      'Headquartered in Jamnagar, delivering worldwide',
      'Extensive European client portfolio',
      'High-velocity development and fast iterations',
      'Transparent communication & timezone agility',
    ],
  },
  {
    icon: Workflow,
    number: '02',
    title: 'End-to-End Orchestration',
    description:
      "We don't just write code; we design complete digital ecosystems. From brand identity and UI/UX design to backend server administration, we handle the entire lifecycle.",
    points: [
      'Brand identity & bespoke UI/UX wireframes',
      'Custom architecture & database engineering',
      'Server configuration, DNS, and deployment',
      'Long-term maintenance, backups, and security',
    ],
  },
  {
    icon: Target,
    number: '03',
    title: 'Tailored for Your Industry',
    description:
      'Whether you need a dynamic donation campaign page, an automated booking portal, or a fast-paced retail POS, we build specifically around your operational workflow.',
    points: [
      'Donation & non-profit campaign portals',
      'Automated service scheduling & bookings',
      'Retail & restaurant POS ecosystems',
      'Engineered around your exact daily operations',
    ],
  },
]

export default function WhyUsSection() {
  return (
    <section id="about-us" className="bg-slate-950 py-28 px-6 lg:px-8 overflow-hidden relative">
      {/* Subtle Background Glow Orbs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: '#8E4BEB' }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: '#4755E9' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Sticky Title Container (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start text-left">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-6"
                  style={{ color: '#8E4BEB', background: 'rgba(142,75,235,0.15)' }}
                >
                  Why Partner With Inpixel Labs
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.08] mb-6"
              >
                Built for Growth.{' '}
                <span className="text-gradient">Designed for Scale.</span>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="w-16 h-1 rounded-full mb-6"
                style={{ background: 'linear-gradient(to right, #8E4BEB, #4755E9)' }}
              />

              <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
                Three foundational principles that distinguish our engineering from standard outsourced agencies.
              </motion.p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Stacked Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            {VALUE_PROPS.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl p-8 sm:p-10 bg-white/5 border border-white/10 hover:border-[#4755E9]/40 backdrop-blur-md shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Watermark Number */}
                  <span
                    className="absolute -top-4 -right-2 text-8xl font-black select-none pointer-events-none opacity-5 transition-opacity group-hover:opacity-10"
                    style={{ color: '#8E4BEB' }}
                  >
                    {item.number}
                  </span>

                  {/* Header Row: Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: 'rgba(142,75,235,0.18)' }}
                      >
                        <Icon size={20} style={{ color: '#8E4BEB' }} strokeWidth={2} />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#8E4BEB]">
                        STEP {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-2xl sm:text-2xl font-bold text-white mb-3.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Checkmarks Checklist */}
                  <ul className="space-y-3 pt-5 border-t border-white/10">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#4755E9' }}
                          strokeWidth={2.4}
                        />
                        <span className="text-sm text-slate-300 font-medium leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
