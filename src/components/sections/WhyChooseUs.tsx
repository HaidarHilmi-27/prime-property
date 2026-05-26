import { motion } from 'framer-motion'
import { Shield, Award, Users, TrendingUp, Clock, Headphones } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const reasons = [
  {
    icon: Award,
    title: 'Premium Selection',
    description:
      'Curated portfolio of the finest properties in prime locations across Indonesia.',
  },
  {
    icon: Shield,
    title: 'Trusted & Verified',
    description:
      'Every property is thoroughly verified to ensure legitimacy and quality standards.',
  },
  {
    icon: Users,
    title: 'Expert Agents',
    description:
      'Our experienced agents provide personalized guidance throughout your journey.',
  },
  {
    icon: TrendingUp,
    title: 'Best Value',
    description:
      'Competitive pricing and transparent deals with no hidden costs or surprises.',
  },
  {
    icon: Clock,
    title: 'Fast Process',
    description:
      'Streamlined documentation and efficient processing for quick property transactions.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Round-the-clock customer support to assist you at every step of the way.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-neutral-900 py-20 md:py-28">
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
            Why Prime Property
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-3xl font-bold text-white md:text-4xl"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-neutral-400"
          >
            We are committed to delivering exceptional real estate services
            that exceed expectations and build lasting relationships.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={fadeInUp}
                className="group rounded-xl border border-neutral-800 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-gold-500/30 hover:bg-neutral-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-neutral-900">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
