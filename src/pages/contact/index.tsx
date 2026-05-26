import { motion } from 'framer-motion'
import { ContactForm } from '@/components/sections/ContactForm'

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,169,97,0.08),transparent_50%)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl"
          >
            Let&apos;s Start a{' '}
            <span className="text-gold-500">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-neutral-400"
          >
            Whether you are looking to buy, sell, or rent, our team is ready
            to assist you with expert guidance and personalized service.
          </motion.p>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
