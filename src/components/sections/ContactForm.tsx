import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Button } from '@/components/ui'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+62 812-3456-7890',
    href: 'tel:+6281234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@primeproperty.com',
    href: 'mailto:info@primeproperty.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Jl. Sudirman No. 123, Jakarta Pusat',
    href: null,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon - Sat, 08:00 - 17:00',
    href: null,
  },
]

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-neutral-500"
          >
            Have a question or ready to find your dream property? We are here
            to help.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-6 lg:col-span-2"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-lg font-semibold text-neutral-900"
            >
              Contact Information
            </motion.h3>
            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-neutral-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              )

              if (item.href) {
                return (
                  <motion.a
                    key={item.label}
                    variants={fadeInUp}
                    href={item.href}
                    className="block rounded-lg transition-colors hover:bg-white/50"
                  >
                    {content}
                  </motion.a>
                )
              }

              return (
                <motion.div key={item.label} variants={fadeInUp}>
                  {content}
                </motion.div>
              )
            })}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-6 shadow-sm lg:col-span-3"
          >
            <motion.h3
              variants={fadeInUp}
              className="mb-6 text-lg font-semibold text-neutral-900"
            >
              Send us a Message
            </motion.h3>

            <div className="space-y-4">
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="Tell us about your property needs..."
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  className="w-full gap-2 bg-gold-500 text-neutral-900 hover:bg-gold-400"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitted ? 'Message Sent!' : 'Send Message'}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
