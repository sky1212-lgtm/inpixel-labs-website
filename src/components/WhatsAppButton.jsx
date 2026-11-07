import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  const phoneNumber = '918128299187'
  const message = "Hello Inpixel Labs! I'm interested in discussing a project."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Inpixel Labs on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300"
        style={{
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.45), 0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Subtle pulsing ping ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:hidden" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15s-.778.978-.954 1.179c-.176.201-.351.226-.652.075s-1.27-.468-2.42-1.493c-.895-.798-1.5-1.784-1.676-2.085s-.019-.464.132-.614c.135-.135.301-.351.452-.527s.201-.301.301-.502c.1-.201.05-.377-.025-.527s-.678-1.635-.929-2.241c-.244-.59-.493-.51-.678-.52l-.578-.01c-.201 0-.527.075-.803.377s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.201 2.124 3.244 5.146 4.551.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.579-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 21.785h-.002a9.87 9.87 0 0 1-5.032-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c0-5.445 4.43-9.875 9.877-9.875a9.82 9.82 0 0 1 6.98 2.893 9.82 9.82 0 0 1 2.892 6.984c0 5.446-4.43 9.877-9.868 9.877zM12.04 0C5.399 0 0 5.399 0 12.04c0 2.122.553 4.195 1.603 6.014L0 24l6.126-1.607a12.007 12.007 0 0 0 5.914 1.547h.005c6.637 0 12.036-5.399 12.036-12.04C24.081 5.399 18.681 0 12.04 0z" />
        </svg>

        {/* Hover Tooltip Pill */}
        <span className="pointer-events-none absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg border border-slate-700/50">
          Chat with us on WhatsApp
        </span>
      </motion.a>
    </div>
  )
}
