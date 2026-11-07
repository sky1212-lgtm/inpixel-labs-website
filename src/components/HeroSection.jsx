import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Zap, Terminal, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

function AnimatedOrb({ style, animate }) {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className="orb"
      style={{ filter: 'blur(80px)', ...style }}
    />
  )
}

function GlassmorphicMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Outer Glow Halo */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
        style={{ background: 'linear-gradient(135deg, #8E4BEB, #4755E9)' }}
      />

      {/* Main Window */}
      <div className="relative rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-purple-950/30 overflow-hidden text-left">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
            <span className="ml-2 text-xs font-mono text-slate-400">system.architecture.ts</span>
          </div>
          <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ● PRODUCTION LIVE
          </span>
        </div>

        {/* Code & Metrics Body */}
        <div className="p-5 font-mono text-xs leading-relaxed space-y-3">
          <div className="text-slate-500">
            <span className="text-[#8E4BEB] font-semibold">import</span> {'{'} ScalablePlatform {'}'} <span className="text-[#8E4BEB] font-semibold">from</span> <span className="text-emerald-400">'@inpixel/core'</span>;
          </div>

          <div className="text-slate-300">
            <span className="text-sky-400 font-semibold">const</span> platform = <span className="text-amber-300 font-semibold">new</span> <span className="text-purple-300">ScalablePlatform</span>({'{'}
          </div>

          <div className="pl-4 space-y-1 text-slate-400">
            <div>region: <span className="text-emerald-400">'Jamnagar → Global Edge'</span>,</div>
            <div>tenants: <span className="text-amber-400">12_500</span>,</div>
            <div>stack: [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Custom PHP'</span>, <span className="text-emerald-400">'Hostinger Cloud'</span>],</div>
            <div>status: <span className="text-sky-400 font-semibold">'Optimal'</span></div>
          </div>

          <div className="text-slate-300">{'}'});</div>

          {/* System Performance Card */}
          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3 border border-white/5">
              <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
                <Activity size={12} className="text-emerald-400" /> Latency
              </div>
              <div className="text-lg font-bold text-white tracking-tight">24ms <span className="text-[10px] font-normal text-emerald-400">Global avg</span></div>
            </div>

            <div className="rounded-xl bg-white/5 p-3 border border-white/5">
              <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-sky-400" /> Security
              </div>
              <div className="text-lg font-bold text-white tracking-tight">SSL / TLS <span className="text-[10px] font-normal text-emerald-400">Hardened</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Top-Right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-4 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-xl flex items-center gap-2.5"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="text-left">
          <div className="text-[11px] font-bold text-slate-900 leading-none">POS & SaaS Active</div>
          <div className="text-[9px] text-slate-400 font-medium mt-0.5">Cloud Synced</div>
        </div>
      </motion.div>

      {/* Floating Badge 2: Bottom-Left */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-5 -left-4 px-3.5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-xl flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8E4BEB] to-[#4755E9] flex items-center justify-center text-white font-bold text-xs">
          IL
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-slate-900 leading-none">Global Architecture</div>
          <div className="text-[9px] text-slate-400 font-medium mt-0.5">Europe & Worldwide</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="solutions"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dot-grid pt-28 pb-16"
    >
      {/* Soft Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70 pointer-events-none" />

      {/* Vibrant Background Mesh Gradients */}
      <AnimatedOrb
        style={{
          width: 650,
          height: 650,
          top: '-150px',
          right: '-100px',
          background: 'radial-gradient(circle at 50% 50%, rgba(142,75,235,0.38), rgba(71,85,233,0.22), transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      />
      <AnimatedOrb
        style={{
          width: 550,
          height: 550,
          bottom: '-100px',
          left: '-80px',
          background: 'radial-gradient(circle at 50% 50%, rgba(71,85,233,0.35), rgba(142,75,235,0.18), transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, 15, 0] }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* True 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Copy & CTAs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm text-xs font-semibold text-slate-700 tracking-widest uppercase">
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
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Engineering{' '}
              <span className="text-gradient">
                Scalable Digital Experiences
              </span>{' '}
              for Ambitious Brands.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mb-9"
            >
              We are a premium software development agency specializing in custom web architecture, multi-tenant SaaS platforms, e-commerce storefronts, and robust point-of-sale ecosystems.
            </motion.p>

            {/* Buttons Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white btn-glow transition-all duration-200 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8E4BEB, #4755E9)' }}
              >
                <Zap size={16} fill="white" />
                Discuss Your Project
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-white/80 backdrop-blur-md border border-gray-200 hover:border-[#4755E9]/50 hover:text-[#4755E9] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Explore Our Solutions
                <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Visual Glassmorphic Mockup */}
          <div className="flex items-center justify-center">
            <GlassmorphicMockup />
          </div>
        </div>

        {/* STATS SECTION: Sleek Full-Width Glassmorphic Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 w-full rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/80 shadow-xl shadow-purple-500/5 p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { num: '50+', label: 'Projects Shipped', desc: 'Delivered internationally' },
              { num: '8+', label: 'Years Experience', desc: 'Crafting custom software' },
              { num: '3', label: 'Continents Served', desc: 'Europe, USA & Asia' },
              { num: '99.9%', label: 'Uptime Guaranteed', desc: 'Enterprise reliability' },
            ].map((stat, idx) => (
              <div key={stat.label} className={`${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''} text-center`}>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  <span className="text-gradient">{stat.num}</span>
                </div>
                <div className="text-sm font-bold text-slate-700 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
