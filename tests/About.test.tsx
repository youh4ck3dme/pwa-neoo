import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '@/components/sections/About'

describe('About Section', () => {
  it('renders MA.GI.CA ENTERPRISE title', () => {
    render(<About />)
    expect(screen.getByText('MA.GI.CA ENTERPRISE')).toBeInTheDocument()
  })

  it('displays correct statistics with primary color', () => {
    render(<About />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('AI Integration')).toBeInTheDocument()
    expect(screen.getByText('PWA Deployment')).toBeInTheDocument()
  })

  it('contains future-ready experts badge', () => {
    render(<About />)
    expect(screen.getByText('Future-Ready')).toBeInTheDocument()
  })
})
