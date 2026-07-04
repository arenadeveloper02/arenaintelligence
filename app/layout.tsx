import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INTELLIGENCE by Position2',
  description: 'INTELLIGENCE by Position2 — a premium 3D AI platform for keyword, content, and article research.',
  keywords: ['INTELLIGENCE by Position2', 'AI agents', 'keyword research', 'content research', 'SEO'],
  icons: {
    icon: '/logo-mark.svg',
    shortcut: '/logo-mark.svg',
    apple: '/logo-mark.svg',
  },
  openGraph: {
    title: 'INTELLIGENCE by Position2',
    description: 'INTELLIGENCE by Position2 — a premium 3D AI platform for keyword, content, and article research.',
    type: 'website',
    images: ['/logo-mark.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
