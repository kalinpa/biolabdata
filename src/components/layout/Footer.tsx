'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/services`, label: nav('services') },
    { href: `/${locale}/methods`, label: nav('methods') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/blog`, label: nav('blog') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Bio<span className="text-primary-400">Lab</span>Data
              </span>
            </Link>
            <p className="text-primary-400 font-medium mb-3">{t('tagline')}</p>
            <p className="text-sm text-neutral-400 mb-6">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-primary-600 text-neutral-400 hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-primary-600 text-neutral-400 hover:text-white transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('links')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {locale === 'bg' ? 'Контакти' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contact@biolabdata.com"
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  contact@biolabdata.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+359888888888"
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  +359 888 888 888
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400">
                  {locale === 'bg' ? 'България' : 'Bulgaria'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <p className="text-sm text-neutral-500 text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
