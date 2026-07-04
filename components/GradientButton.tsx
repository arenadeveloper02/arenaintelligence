"use client"

import type { ReactNode } from 'react'

interface GradientButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function GradientButton({ children, type = 'button', disabled = false, onClick, className = '' }: GradientButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`btn-gradient ${className}`}>
      {children}
    </button>
  )
}
