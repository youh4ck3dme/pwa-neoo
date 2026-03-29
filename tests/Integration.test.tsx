import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Mock sub-components if needed or render full page integration
describe('Home Page Integration', () => {
  it('renders all main sections together', async () => {
    render(<Home />)

    // Hero is statically imported — always renders synchronously
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toBeInTheDocument();

    // Other sections are lazy-loaded with next/dynamic — wait for them
    await waitFor(() => {
      expect(screen.getByTestId('about-section')).toBeInTheDocument();
    }, { timeout: 5000 });

    await waitFor(() => {
      expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    }, { timeout: 5000 });
  })
})
