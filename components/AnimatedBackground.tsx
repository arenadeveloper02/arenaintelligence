"use client"

import ParticleCanvas from '@/components/ParticleCanvas'

export function AnimatedBackground() {
  return (
    <>
      <div className="mesh-bg pointer-events-none fixed inset-0 z-0" />
      <ParticleCanvas />
    </>
  )
}
