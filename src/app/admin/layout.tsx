import '../globals.css';

export const metadata = {
  title: 'Admin | BioLabData',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="min-h-screen bg-neutral-100">
        {children}
      </body>
    </html>
  );
}
