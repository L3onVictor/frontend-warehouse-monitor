import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <main className="p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
