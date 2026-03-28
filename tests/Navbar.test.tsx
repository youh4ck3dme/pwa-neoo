import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'

describe('Navbar Component', () => {
  it('renders logo with correct text', () => {
    render(<Navbar />)
    expect(screen.getByText(/MA.GI.CA/i)).toBeInTheDocument()
    expect(screen.getByText(/STUDIO/i)).toBeInTheDocument()
  })

  it('contains desktop navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Domov')).toBeInTheDocument()
    expect(screen.getByText('O nás')).toBeInTheDocument()
    expect(screen.getByText('Proces')).toBeInTheDocument()
    expect(screen.getByText('Portfólio')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar />)
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    // After click, mobile menu links should be visible
    const mobileLinks = screen.getAllByText('Domov')
    expect(mobileLinks.length).toBeGreaterThan(1) // One in desktop, one in mobile
  })
})
