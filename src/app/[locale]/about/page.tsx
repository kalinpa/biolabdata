import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, Target, Heart, Zap, Shield } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | BioLabData`,
    description: t('subtitle'),
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: CheckCircle2,
      title: t('values.quality'),
      color: 'bg-primary-50 text-primary-600',
    },
    {
      icon: Shield,
      title: t('values.integrity'),
      color: 'bg-accent-50 text-accent-600',
    },
    {
      icon: Zap,
      title: t('values.speed'),
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Heart,
      title: t('values.support'),
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                {t('story.title')}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('story.content')}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl flex items-center justify-center">
                <div className="text-9xl font-bold text-gradient opacity-50">BLD</div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-500 rounded-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {t('mission.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-hover p-8 text-center">
                <div
                  className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
