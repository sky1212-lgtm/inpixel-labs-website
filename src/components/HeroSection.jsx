import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Zap } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

function AnimatedOrb({ style, animate }) {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className="orb"
      style={{ filter: 'blur(72px)', ...style }}
    />
  )
}

export default function HeroSection() {
  return (
    <section
      id="solutions"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dot-grid pt-24"
    >
      {/* White vignette over dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80 pointer-events-none" />

      {/* Animated orbs */}
      <AnimatedOrb
        style={{
          width: 520, height: 520,
          top: '-120px', right: '-80px',
          background: 'radial-gradient(circle at 40% 40%, rgba(142,75,235,0.28), rgba(71,85,233,0.1), transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], x: [0, 24, 0], y: [0, -16, 0] }}
      />
      <AnimatedOrb
        style={{
          width: 400, height: 400,
          bottom: '-60px', left: '-60px',
          background: 'radial-gradient(circle at 60% 60%, rgba(71,85,233,0.24), rgba(142,75,235,0.08), transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -20, 0], y: [0, 20, 0] }}
      />
      <AnimatedOrb
        style={{
          width: 280, height: 280,
          top: '45%', left: '55%',
          background: 'radial-gradient(circle, rgba(142,75,235,0.12), transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold text-slate-600 tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#8E4BEB' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: '#8E4BEB' }}
                />
              </span>
              Jamnagar to the World
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.04] mb-7"
          >
            Engineering{' '}
            <span className="text-gradient">
              Scalable Digital<br className="hidden sm:block" /> Experiences
            </span>{' '}
            for Ambitious Brands.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10"
          >
            Premium software architecture, multi-tenant SaaS platforms, e-commerce storefronts, and robust POS ecosystems — built to scale.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold text-white btn-glow transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8E4BEB, #4755E9)' }}
            >
              <Zap size={16} fill="white" />
              Discuss Your Project
            </motion.button>

            {/* Secondary — glass outline */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#4755E9]/40 hover:text-[#4755E9] shadow-sm transition-all duration-200"
            >
              Explore Our Solutions
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            variants={fadeUp}
            className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-10"
          >
            {[
              { num: '50+', label: 'Projects Shipped' },
              { num: '8+', label: 'Years of Craft' },
              { num: '3', label: 'Continents Served' },
              { num: '99.9%', label: 'Uptime Guaranteed' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{s.num}</div>
                <div className="text-sm text-slate-400 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
