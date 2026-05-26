import { motion } from 'framer-motion'
import { Award, Users, Building2, Globe, CheckCircle } from 'lucide-react'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const milestones = [
  { year: '2015', title: 'Founded', description: 'Prime Property established in Jakarta' },
  { year: '2017', title: '100 Properties', description: 'Reached 100 successful transactions' },
  { year: '2020', title: 'National Expansion', description: 'Expanded to 5 major cities' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as top real estate agency' },
]

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest standards in every transaction.',
  },
  {
    icon: Users,
    title: 'Integrity',
    description: 'Honest, transparent dealings with every client.',
  },
  {
    icon: Building2,
    title: 'Innovation',
    description: 'Leveraging technology for better service delivery.',
  },
  {
    icon: Globe,
    title: 'Community',
    description: 'Building communities, not just selling properties.',
  },
]

const stats = [
  { value: '500+', label: 'Properties Sold' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Industry Awards' },
  { value: '8', label: 'Office Locations' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,97,0.08),transparent_50%)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl"
          >
            Indonesia&apos;s Premier{' '}
            <span className="text-gold-500">Real Estate</span> Partner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-neutral-400"
          >
            With over a decade of experience, Prime Property has been helping
            individuals and families find their perfect homes across Indonesia.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
                A Decade of Excellence in Real Estate
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Founded in 2015, Prime Property started with a vision to
                transform the real estate landscape in Indonesia. What began as
                a small agency has grown into one of the most trusted property
                firms in the nation.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Our commitment to quality, transparency, and client
                satisfaction has earned us the trust of thousands of clients
                and numerous industry accolades.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Hand-picked premium property portfolio',
                  'Expert team with deep local market knowledge',
                  'End-to-end property consultation services',
                  'Post-purchase support and property management',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-gold-500" />
                    <span className="text-sm text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative aspect-[4/3] rounded-2xl bg-neutral-100"
            >
              <div className="flex h-full items-center justify-center">
                <Building2 className="h-20 w-20 text-neutral-300" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-gold-500 px-6 py-4 shadow-lg">
                <p className="text-3xl font-bold text-neutral-900">10+</p>
                <p className="text-xs font-medium text-neutral-800">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase"
            >
              Milestones
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl"
            >
              Our Journey
            </motion.h2>
          </motion.div>

          <div className="relative mt-14">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-neutral-200 lg:block" />
            <div className="space-y-10 lg:space-y-0">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`relative lg:flex lg:w-1/2 ${
                    i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12'
                  }`}
                >
                  <div
                    className={`rounded-xl bg-white p-6 shadow-sm ${
                      i % 2 === 0 ? 'lg:text-right' : ''
                    }`}
                  >
                    <span className="text-sm font-bold text-gold-500">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="rounded-xl border border-neutral-200 bg-white p-6 text-center"
              >
                <p className="text-3xl font-bold text-gold-600">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Our Values
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-3xl font-bold text-white md:text-4xl"
            >
              What We Stand For
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
    </>
  )
}
