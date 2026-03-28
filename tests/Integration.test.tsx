import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock sub-components if needed or render full page integration
describe('Home Page Integration', () => {
  it('renders all main sections together', () => {
    render(<Home />)
    
    // Using data-testid for "clockwork" reliability
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  })
})
