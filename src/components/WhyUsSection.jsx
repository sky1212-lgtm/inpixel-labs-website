import { motion } from 'framer-motion'
import { Globe2, Workflow, Target, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { fadeUp, fadeRight, staggerContainer, viewportOnce } from '../lib/motion'

const VALUE_PROPS = [
  {
    icon: Globe2,
    number: '01',
    title: 'Global Standards, Local Agility',
    body: 'Based in Jamnagar, Gujarat, we deliver world-class digital solutions to international clients across Europe and beyond — premium quality meets efficient development cycles.',
    points: [
      'Clients across Europe & internationally',
      'Timezone-flexible communication',
      'World-class output, competitive pricing',
      'Jamnagar-based, globally distributed',
    ],
  },
  {
    icon: Workflow,
    number: '02',
    title: 'End-to-End Orchestration',
    body: "We don't just write code — we design complete digital ecosystems. From brand identity and UI/UX design to backend server administration, we own the entire lifecycle.",
    points: [
      'Brand identity & UI/UX design',
      'Custom development & architecture',
      'Server config & deployment',
      'Post-launch support & optimization',
    ],
  },
  {
    icon: Target,
    number: '03',
    title: 'Tailored for Your Industry',
    body: 'Whether you need a dynamic donation campaign page, an automated booking portal, or a fast-paced retail POS — we build specifically around your operational workflow.',
    points: [
      'Donation & campaign platforms',
      'Automated booking portals',
      'Retail & restaurant POS ecosystems',
      'Workflow-first development approach',
    ],
  },
]

export default function WhyUsSection() {
  return (
    <section id="solutions" className="bg-slate-950 py-28 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-20 items-start">

          {/* LEFT — sticky */}
          <div className="mb-16 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
                  style={{ color: '#8E4BEB', background: 'rgba(142,75,235,0.15)' }}
                >
                  Why Partner With Us
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6"
              >
                Built for Growth.{' '}
                <span className="text-gradient">Designed for Scale.</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-slate-400 text-base leading-relaxed mb-8">
                Three principles that drive every project we take on — from the first wireframe to the last server config.
              </motion.p>

              {/* Accent line */}
              <motion.div
                variants={fadeUp}
                className="w-12 h-0.5 rounded-full mb-8"
                style={{ background: 'linear-gradient(to right, #8E4BEB, #4755E9)' }}
              />

              {/* Numbers */}
              <motion.div variants={fadeUp} className="flex gap-6">
                {['01', '02', '03'].map((n) => (
                  <div
                    key={n}
                    className="text-xs font-black tracking-widest"
                    style={{ color: 'rgba(142,75,235,0.4)' }}
                  >
                    {n}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — scrolling items */}
          <div className="flex flex-col divide-y divide-white/8">
            {VALUE_PROPS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  className="py-10 group"
                >
                  {/* Number + Icon row */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-black tracking-widest" style={{ color: 'rgba(142,75,235,0.5)' }}>
                      {item.number}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{ background: 'rgba(142,75,235,0.15)' }}
                    >
                      <Icon size={18} style={{ color: '#8E4BEB' }} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.body}</p>

                  {/* Checklist */}
                  <ul className="space-y-2.5">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: '#4755E9' }}
                          strokeWidth={2.2}
                        />
                        <span className="text-sm text-slate-300">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover reveal */}
                  <div
                    className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#8E4BEB' }}
                  >
                    Learn more <ArrowUpRight size={12} />
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
