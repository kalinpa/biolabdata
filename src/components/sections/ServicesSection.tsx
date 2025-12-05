'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { GraduationCap, FileText, Activity, MessageCircle, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    {
      icon: GraduationCap,
      title: t('academic.title'),
      desc: t('academic.desc'),
      features: t.raw('academic.features') as string[],
      color: 'from-primary-500 to-primary-600',
      iconBg: 'bg-primary-50 text-primary-600',
    },
    {
      icon: FileText,
      title: t('publications.title'),
      desc: t('publications.desc'),
      features: t.raw('publications.features') as string[],
      color: 'from-accent-500 to-accent-600',
      iconBg: 'bg-accent-50 text-accent-600',
    },
    {
      icon: Activity,
      title: t('clinical.title'),
      desc: t('clinical.desc'),
      features: t.raw('clinical.features') as string[],
      color: 'from-rose-500 to-rose-600',
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      icon: MessageCircle,
      title: t('consulting.title'),
      desc: t('consulting.desc'),
      features: t.raw('consulting.features') as string[],
      color: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Building2,
      title: t('corporate.title'),
      desc: t('corporate.desc'),
      features: t.raw('corporate.features') as string[],
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover group"
            >
              {/* Gradient top bar */}
              <div className={`h-1 bg-gradient-to-r ${service.color}`} />
              
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6">{service.desc}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all duration-200"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
