"use client"

import type { ChangeEvent } from 'react'

interface PremiumInputProps {
  id?: string
  label?: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  minLength?: number
  disabled?: boolean
}

export function PremiumInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  disabled = false,
}: PremiumInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        disabled={disabled}
        className="input-field"
      />
    </div>
  )
}
