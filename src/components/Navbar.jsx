import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating pill container */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-2 pl-5 pr-2 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl shadow-black/8'
              : 'bg-white/70 backdrop-blur-md border border-gray-200/70 shadow-lg shadow-black/5'
          }`}
        >
          {/* Logo */}
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mr-3 flex-shrink-0">
            <img src="/logo.png" alt="Inpixel Labs" className="h-7 w-auto" draggable={false} />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-[#4755E9] hover:bg-slate-50 transition-all duration-150"
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('#contact')}
            className="hidden md:flex items-center gap-1.5 ml-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white btn-glow transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #8E4BEB, #4755E9)' }}
          >
            Start a Project
            <ArrowUpRight size={14} />
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl shadow-black/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(href)}
                  className="text-left px-4 py-3.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#4755E9] transition-all"
                >
                  {label}
                </motion.button>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleNav('#contact')}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #8E4BEB, #4755E9)' }}
                >
                  Start a Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
