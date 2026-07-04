"use client"

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FloatingPanelProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FloatingPanel({ children, className = '', delay = 0 }: FloatingPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 15px 40px rgba(99, 102, 241, 0.20)' }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  )
}
