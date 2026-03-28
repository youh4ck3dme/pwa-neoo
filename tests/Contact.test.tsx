import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Contact from '@/components/sections/Contact'

describe('Contact Section', () => {
  it('renders contact information correctly', () => {
    render(<Contact />)
    expect(screen.getByText('0917 488 903')).toBeInTheDocument()
    expect(screen.getByText('magicasro@hotmail.com')).toBeInTheDocument()
  })

  it('form fields have required attribute', () => {
    render(<Contact />)
    const nameInput = screen.getByPlaceholderText('Vaše meno')
    const emailInput = screen.getByPlaceholderText('E-mail')
    const messageInput = screen.getByPlaceholderText('Vaša správa')
    
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(messageInput).toBeRequired()
  })

  it('shows success message after simulated submit', async () => {
    render(<Contact />)
    const submitBtn = screen.getByText('Odoslať dopyt')
    
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Vaše meno'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Vaša správa'), { target: { value: 'Hello AI' } })
    
    fireEvent.click(submitBtn)
    
    // Check loading state (briefly)
    expect(screen.getByRole('button')).toBeDisabled()
    
    // Wait for success message (timeout is 1500ms in component)
    const successMsg = await screen.findByText('Odoslané!', {}, { timeout: 2000 })
    expect(successMsg).toBeInTheDocument()
  })
})
