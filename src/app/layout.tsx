import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BioLabData',
  description: 'Biostatistics for Science and Medicine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
