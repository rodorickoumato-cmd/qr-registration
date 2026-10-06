import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Journée Porte Ouverte - CCB',
  description:
    "Système d'enregistrement par QR code pour la Communauté Chrétienne de Bolu",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {children}
      </body>
    </html>
  )
}
