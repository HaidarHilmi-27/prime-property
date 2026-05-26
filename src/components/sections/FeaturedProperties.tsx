import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bed, Bath, Maximize2 } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const featuredProperties = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    location: 'Kemang, Jakarta Selatan',
    price: 'Rp 2.5 M',
    beds: 4,
    baths: 3,
    area: 350,
    image: null,
    tag: 'Featured',
  },
  {
    id: '2',
    title: 'Executive Penthouse',
    location: 'SCBD, Jakarta Pusat',
    price: 'Rp 5.8 M',
    beds: 3,
    baths: 2,
    area: 280,
    image: null,
    tag: 'Premium',
  },
  {
    id: '3',
    title: 'Elegant Family Home',
    location: 'Kota Wisata, Bogor',
    price: 'Rp 1.8 M',
    beds: 5,
    baths: 4,
    area: 500,
    image: null,
    tag: 'Best Deal',
  },
]

export function FeaturedProperties() {
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
            Featured Listings
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            Premium Properties
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-neutral-500"
          >
            Discover our hand-picked selection of the finest properties
            available in the most sought-after locations.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProperties.map((property) => (
            <motion.article
              key={property.id}
              variants={fadeInUp}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-neutral-300" />
                    <p className="mt-2 text-xs text-neutral-400">
                      {property.title}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-md bg-gold-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-900">
                  {property.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {property.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{property.location}</p>

                <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" /> {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {property.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-3.5 w-3.5" /> {property.area} m&sup2;
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold text-gold-600">
                    {property.price}
                  </p>
                  <Link
                    to={`${ROUTES.PROPERTIES}/${property.id}`}
                    className="text-sm font-medium text-neutral-900 transition-colors hover:text-gold-500"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to={ROUTES.PROPERTIES}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-all hover:border-gold-500 hover:text-gold-600"
          >
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
