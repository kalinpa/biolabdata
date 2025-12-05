import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesSection from '@/components/sections/ServicesSection';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: `${t('title')} | BioLabData`,
    description: t('subtitle'),
  };
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-12 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
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

      <ServicesSection />
      <CTASection />
    </>
  );
}
