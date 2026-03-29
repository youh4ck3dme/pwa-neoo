import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver (missing in jsdom) as a proper class
vi.stubGlobal('IntersectionObserver', class IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds: ReadonlyArray<number> = [0]
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn().mockReturnValue([])
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
})

// Mock fetch to prevent real API calls in tests
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: vi.fn().mockResolvedValue([]),
  status: 200,
}))
