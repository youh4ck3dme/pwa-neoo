import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

describe('Hero Section', () => {
  it('renders main headline with enterprise focus', () => {
    render(<Hero />)
    expect(screen.getByText(/Enterprise PWA/i)).toBeInTheDocument()
    expect(screen.getByText(/Cybersecurity/i)).toBeInTheDocument()
  })

  it('shows AI-POWERED WORKFLOW badge', () => {
    render(<Hero />)
    expect(screen.getByText('AI-POWERED WORKFLOW')).toBeInTheDocument()
  })

  it('renders primary CTA button "Pridať projekt"', () => {
    render(<Hero />)
    const cta = screen.getByText('Pridať projekt')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#portfolio')
  })

  it('renders hero image with correct alt text', () => {
    render(<Hero />)
    const img = screen.getByAltText(/MA.GI.CA Enterprise PWA Interface/i)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/hero.png')
  })
})
