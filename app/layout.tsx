import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ParticleCanvas from '@/components/ParticleCanvas'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arena Planner AI — Your AI Research Team for SEO & Content',
  description:
    'Keyword research, content research, and article recommendations powered entirely by your OpenAI API key.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-midnight text-slate-200 antialiased`}>
        <ParticleCanvas />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
