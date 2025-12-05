import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  university: z.string().optional(),
  subject: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(10),
  privacy: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const data = contactSchema.parse(body);

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        university: data.university || null,
        subject: data.subject || null,
        serviceType: data.serviceType || null,
        message: data.message,
        status: 'NEW',
      },
    });

    // Send email notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Email to admin
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL,
        subject: `Ново запитване от ${data.name}`,
        html: `
          <h2>Ново запитване от сайта</h2>
          <p><strong>Име:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Телефон:</strong> ${data.phone || 'Не е посочен'}</p>
          <p><strong>Университет:</strong> ${data.university || 'Не е посочен'}</p>
          <p><strong>Тема:</strong> ${data.subject || 'Не е посочена'}</p>
          <p><strong>Тип услуга:</strong> ${data.serviceType || 'Не е посочен'}</p>
          <hr />
          <p><strong>Съобщение:</strong></p>
          <p>${data.message}</p>
        `,
      });

      // Auto-reply to user
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: data.email,
        subject: 'Получихме вашето запитване - BioLabData',
        html: `
          <h2>Благодарим ви за запитването!</h2>
          <p>Здравейте ${data.name},</p>
          <p>Получихме вашето запитване и ще се свържем с вас до 24 часа.</p>
          <p>С уважение,<br />Екипът на BioLabData</p>
          <hr />
          <p style="color: #666; font-size: 12px;">
            Това е автоматичен отговор. Моля, не отговаряйте на този email.
          </p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
