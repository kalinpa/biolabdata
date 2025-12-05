'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, BarChart3, Microscope, TrendingUp, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-bg">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500" />
      
      {/* Decorative icons */}
      <motion.div
        className="absolute top-32 right-[15%] text-primary-300/30"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BarChart3 className="w-24 h-24" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-[10%] text-accent-300/30"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Microscope className="w-20 h-20" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-[8%] text-primary-300/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <TrendingUp className="w-16 h-16" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6"
          >
            <Database className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">{t('tagline')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            {locale === 'bg' ? (
              <>
                <span className="text-gradient">Биостатистика</span>
                <br />
                за наука и медицина
              </>
            ) : (
              <>
                <span className="text-gradient">Biostatistics</span>
                <br />
                for Science & Medicine
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={`/${locale}/contact`} className="btn-primary text-lg px-8 py-4">
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={`/${locale}/services`} className="btn-secondary text-lg px-8 py-4">
              {t('secondary')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-10 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '100+', label: locale === 'bg' ? 'Проекти' : 'Projects' },
              { value: '5-10', label: locale === 'bg' ? 'Дни доставка' : 'Days delivery' },
              { value: '98%', label: locale === 'bg' ? 'Доволни клиенти' : 'Happy clients' },
              { value: '24h', label: locale === 'bg' ? 'Отговор' : 'Response' },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
