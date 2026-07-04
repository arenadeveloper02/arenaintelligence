import type { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return <section className={`mx-auto w-full max-w-6xl ${className}`}>{children}</section>
}
