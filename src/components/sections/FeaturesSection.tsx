'use client';

import { useTranslations } from 'next-intl';
import { Zap, Award, HeadphonesIcon, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Zap,
      title: t('speed.title'),
      desc: t('speed.desc'),
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Award,
      title: t('quality.title'),
      desc: t('quality.desc'),
      color: 'bg-primary-50 text-primary-600',
    },
    {
      icon: HeadphonesIcon,
      title: t('support.title'),
      desc: t('support.desc'),
      color: 'bg-accent-50 text-accent-600',
    },
    {
      icon: GraduationCap,
      title: t('expertise.title'),
      desc: t('expertise.desc'),
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover p-8 text-center"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
