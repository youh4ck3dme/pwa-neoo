import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

describe('Hero Section', () => {
  it('renders main headline with MA.GI.CA branding', () => {
    render(<Hero />)
    expect(screen.getByText(/Tvoríme PWA aplikácie/i)).toBeInTheDocument()
    expect(screen.getByText(/čo jednoducho fungujú/i)).toBeInTheDocument()
  })

  it('shows trusted platform badge', () => {
    render(<Hero />)
    expect(screen.getByText(/Dôveryhodná platforma pre profesionálny biznis/i)).toBeInTheDocument()
  })

  it('renders primary CTA button "Vstúpiť do Centrály"', () => {
    render(<Hero />)
    const cta = screen.getByText('Vstúpiť do Centrály')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#portfolio')
  })

  it('renders hero image with correct alt text', () => {
    render(<Hero />)
    const img = screen.getByAltText(/MA\.GI\.CA Enterprise Interface Showcase/i)
    expect(img).toBeInTheDocument()
    // next/image rewrites src to /_next/image?url=... — check original url in src attribute
    expect(img.getAttribute('src')).toContain('hero.png')
  })
})
