'use client';

import { useTranslations } from 'next-intl';
import { Upload, MessageSquare, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const t = useTranslations('process');

  const steps = [
    {
      icon: Upload,
      title: t('steps.step1.title'),
      desc: t('steps.step1.desc'),
      color: 'bg-primary-500',
    },
    {
      icon: MessageSquare,
      title: t('steps.step2.title'),
      desc: t('steps.step2.desc'),
      color: 'bg-accent-500',
    },
    {
      icon: BarChart2,
      title: t('steps.step3.title'),
      desc: t('steps.step3.desc'),
      color: 'bg-amber-500',
    },
    {
      icon: CheckCircle,
      title: t('steps.step4.title'),
      desc: t('steps.step4.desc'),
      color: 'bg-green-500',
    },
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
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

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-green-200" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg relative z-10`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex lg:hidden items-center ml-4">
                      <ArrowRight className="w-6 h-6 text-neutral-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="text-center lg:text-left">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto lg:mx-0 mb-4`}
                  >
                    <step.icon className={`w-7 h-7 ${step.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
