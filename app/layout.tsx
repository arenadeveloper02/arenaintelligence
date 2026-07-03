import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INTELLIGENCE by Position2',
  description: 'INTELLIGENCE by Position2 — premium AI agent platform for keyword research, content research, and article recommendations.',
  keywords: ['INTELLIGENCE by Position2', 'AI agents', 'keyword research', 'content research', 'SEO'],
  openGraph: {
    title: 'INTELLIGENCE by Position2',
    description: 'Premium AI agent platform by Position2.',
    type: 'website',
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
