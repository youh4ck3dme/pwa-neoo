import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock for IntersectionObserver which is missing in jsdom
const IntersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
