import { motion } from 'framer-motion'
import { Building2, Eye, Target, Shield, Users, Award } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

const values = [
  {
    icon: Shield,
    title: 'Integritas',
    description: 'Kami menjunjung tinggi kejujuran dan transparansi dalam setiap transaksi.',
  },
  {
    icon: Award,
    title: 'Kualitas',
    description: 'Setiap properti yang kami tawarkan melalui kurasi ketat dan terpercaya.',
  },
  {
    icon: Users,
    title: 'Komitmen',
    description: 'Kepuasan klien adalah prioritas utama kami dalam setiap layanan.',
  },
  {
    icon: Building2,
    title: 'Inovasi',
    description: 'Memanfaatkan teknologi modern untuk kemudahan dan kenyamanan klien.',
  },
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
            Tentang Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl"
          >
            Mitra Properti Terpercaya{' '}
            <span className="text-gold-500">di Indonesia</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-neutral-400"
          >
            Prime Property hadir sebagai solusi properti terpercaya dengan pengalaman bertahun-tahun
            melayani ribuan klien di seluruh Indonesia.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
                Profil Perusahaan
              </span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
                Prime Property
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Prime Property adalah perusahaan properti terkemuka di Indonesia yang berfokus pada
                penyediaan properti premium berkualitas tinggi. Berdiri sejak 2015, kami telah
                membantu ribuan keluarga dan investor menemukan properti impian mereka.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Dengan tim profesional yang berpengalaman dan jaringan luas di berbagai kota besar,
                kami berkomitmen untuk memberikan pelayanan terbaik dan solusi properti yang tepat
                bagi setiap klien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-neutral-900 p-8 text-white lg:p-10"
            >
              <Building2 className="h-10 w-10 text-gold-500" />
              <blockquote className="mt-4 text-lg leading-relaxed italic text-neutral-300">
                &ldquo;Kami percaya bahwa setiap orang berhak mendapatkan hunian terbaik. 
                Prime Property hadir untuk mewujudkannya dengan pelayanan profesional dan 
                properti-properti pilihan.&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-neutral-800 pt-4">
                <p className="font-semibold text-white">Tim Prime Property</p>
                <p className="text-sm text-neutral-400">Sejak 2015</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
                <div className="flex items-start gap-4">
                  <Target className="h-8 w-8 shrink-0 text-gold-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Visi</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      Menjadi perusahaan properti terdepan di Indonesia yang dikenal akan
                      kualitas, integritas, dan inovasi dalam setiap layanan yang diberikan.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-start gap-4">
                  <Eye className="h-8 w-8 shrink-0 text-gold-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Misi</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      Menyediakan properti premium berkualitas tinggi dengan harga kompetitif,
                      memberikan pelayanan profesional dan transparan kepada setiap klien,
                      serta terus berinovasi untuk memberikan kemudahan dalam bertransaksi properti.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
                Visi &amp; Misi
              </span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
                Arah dan Tujuan Kami
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Visi dan misi kami menjadi pedoman dalam setiap langkah untuk memberikan
                layanan terbaik bagi seluruh klien dan mitra bisnis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center"
          >
            <motion.span variants={fadeInUp} className="inline-block text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
              Nilai Perusahaan
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
              Yang Kami Percayai
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-4 max-w-2xl text-neutral-500">
              Nilai-nilai yang menjadi fondasi setiap pelayanan yang kami berikan.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
