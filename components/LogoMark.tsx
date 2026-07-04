import Image from 'next/image'

interface LogoMarkProps {
  size?: number
  className?: string
  priority?: boolean
}

export function LogoMark({ size = 36, className = '', priority = false }: LogoMarkProps) {
  return (
    <Image
      src="/logo-mark.svg"
      alt="Position2 Intelligence logo"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  )
}
