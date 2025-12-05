'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  university: z.string().optional(),
  subject: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine((val) => val === true, 'You must agree to the privacy policy'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: '', label: t('serviceOptions.notSure') },
    { value: 'academic', label: t('serviceOptions.academic') },
    { value: 'publication', label: t('serviceOptions.publication') },
    { value: 'clinical', label: t('serviceOptions.clinical') },
    { value: 'consulting', label: t('serviceOptions.consulting') },
    { value: 'other', label: t('serviceOptions.other') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label">
            {t('name')} *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('namePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label">
            {t('email')} *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder={t('emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & University */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="label">
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="input"
            placeholder={t('phonePlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="university" className="label">
            {t('university')}
          </label>
          <input
            type="text"
            id="university"
            {...register('university')}
            className="input"
            placeholder={t('universityPlaceholder')}
          />
        </div>
      </div>

      {/* Subject & Service Type */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="subject" className="label">
            {t('subject')}
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className="input"
            placeholder={t('subjectPlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="label">
            {t('service')}
          </label>
          <select id="serviceType" {...register('serviceType')} className="input">
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          {t('message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`input resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={t('messagePlaceholder')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          {...register('privacy')}
          className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="privacy" className="text-sm text-neutral-600">
          {t('privacy')} *
        </label>
      </div>
      {errors.privacy && (
        <p className="text-sm text-red-500">{errors.privacy.message}</p>
      )}

      {/* Submit Status */}
      {submitStatus === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p>{t('success')}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{t('error')}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="spinner" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('submit')}
          </>
        )}
      </button>
    </form>
  );
}
