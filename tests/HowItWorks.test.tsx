import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowItWorks from '@/components/sections/HowItWorks'

describe('HowItWorks Section', () => {
  it('renders all 4 process steps', () => {
    render(<HowItWorks />)
    expect(screen.getByText('Auditing & Analysis')).toBeInTheDocument()
    expect(screen.getByText('Hardened Content')).toBeInTheDocument()
    expect(screen.getByText('Cyber Identity')).toBeInTheDocument()
    expect(screen.getByText('Secure Deployment')).toBeInTheDocument()
  })

  it('displays step numbers (1-4)', () => {
    render(<HowItWorks />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
