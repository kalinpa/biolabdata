import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `${t('title')} | BioLabData`,
    description: t('subtitle'),
  };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const contactInfo = [
    {
      icon: Mail,
      label: t('info.email'),
      value: 'contact@biolabdata.com',
      href: 'mailto:contact@biolabdata.com',
    },
    {
      icon: Phone,
      label: t('info.phone'),
      value: '+359 888 888 888',
      href: 'tel:+359888888888',
    },
    {
      icon: Clock,
      label: t('info.response'),
      value: '24h',
      href: null,
    },
    {
      icon: MapPin,
      label: locale === 'bg' ? 'Локация' : 'Location',
      value: locale === 'bg' ? 'България' : 'Bulgaria',
      href: null,
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

      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {t('info.title')}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-neutral-900 font-medium hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-neutral-900 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-10 p-6 bg-neutral-50 rounded-2xl">
                <h3 className="font-semibold text-neutral-900 mb-4">
                  {locale === 'bg' ? 'Защо да ни изберете' : 'Why choose us'}
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                    {locale === 'bg' ? 'Безплатна първоначална консултация' : 'Free initial consultation'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                    {locale === 'bg' ? 'Бърз отговор до 24 часа' : 'Fast response within 24 hours'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                    {locale === 'bg' ? 'Индивидуален подход' : 'Individual approach'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                    {locale === 'bg' ? 'Гаранция за качество' : 'Quality guarantee'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8 md:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
