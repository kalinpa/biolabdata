import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'process' });

  return {
    title: `${t('title')} | BioLabData`,
    description: t('subtitle'),
  };
}

export default async function ProcessPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'process' });

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

      <ProcessSection />
      
      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              {locale === 'bg' ? 'Често задавани въпроси' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: locale === 'bg' ? 'Колко време отнема анализът?' : 'How long does the analysis take?',
                  a: locale === 'bg' 
                    ? 'Стандартен анализ отнема 5-10 работни дни в зависимост от сложността. За спешни проекти предлагаме експресна услуга.'
                    : 'Standard analysis takes 5-10 business days depending on complexity. We offer express service for urgent projects.',
                },
                {
                  q: locale === 'bg' ? 'Какви данни приемате?' : 'What data formats do you accept?',
                  a: locale === 'bg'
                    ? 'Работим с Excel, CSV, SPSS, Stata и други стандартни формати. Ако имате данни в друг формат, свържете се с нас.'
                    : 'We work with Excel, CSV, SPSS, Stata and other standard formats. Contact us if you have data in a different format.',
                },
                {
                  q: locale === 'bg' ? 'Какво получавам като краен резултат?' : 'What do I receive as a final result?',
                  a: locale === 'bg'
                    ? 'Получавате пълен доклад с таблици, графики, статистически резултати и писмена интерпретация, готови за включване в дисертация или публикация.'
                    : 'You receive a complete report with tables, charts, statistical results, and written interpretation, ready for inclusion in a dissertation or publication.',
                },
                {
                  q: locale === 'bg' ? 'Правите ли ревизии?' : 'Do you do revisions?',
                  a: locale === 'bg'
                    ? 'Да, включваме безплатни ревизии ако има забележки от научен ръководител или рецензенти.'
                    : 'Yes, we include free revisions if there are comments from a supervisor or reviewers.',
                },
              ].map((faq, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-neutral-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
