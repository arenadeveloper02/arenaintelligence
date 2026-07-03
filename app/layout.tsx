import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INTELLIGENCE by Position2',
  description: 'INTELLIGENCE by Position2 — an AI-powered platform for keyword research, content research, and article recommendations.',
  openGraph: {
    title: 'INTELLIGENCE by Position2',
    description: 'INTELLIGENCE by Position2 — an AI-powered platform for keyword research, content research, and article recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTELLIGENCE by Position2',
    description: 'INTELLIGENCE by Position2 — an AI-powered platform for keyword research, content research, and article recommendations.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
