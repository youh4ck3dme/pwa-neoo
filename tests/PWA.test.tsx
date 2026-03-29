import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import PWA from '@/components/PWA'
import fs from 'node:fs'
import path from 'node:path'

describe('PWA & Asset Integrity', () => {
  it('verifies essential PWA files exist in public directory', () => {
    const publicDir = path.resolve(process.cwd(), 'public')
    
    expect(fs.existsSync(path.join(publicDir, 'manifest.json'))).toBe(true)
    expect(fs.existsSync(path.join(publicDir, 'sw.js'))).toBe(true)
    expect(fs.existsSync(path.join(publicDir, 'icons/icon-192x192.png'))).toBe(true)
    expect(fs.existsSync(path.join(publicDir, 'icons/icon-512x512.png'))).toBe(true)
  })

  it('verifies manifest.json is valid and has correct start_url', () => {
    const manifestPath = path.resolve(process.cwd(), 'public/manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    
    expect(manifest.start_url).toBe('/')
    expect(manifest.display).toBe('standalone')
  })

  it('PWA component attempts to register service worker', async () => {
    const registerMock = vi.fn().mockResolvedValue({
      scope: '/',
      addEventListener: vi.fn(),
      installing: null,
    })

    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: registerMock,
        getRegistrations: vi.fn().mockResolvedValue([]),
        ready: Promise.resolve({ pushManager: null }),
      },
    })

    render(<PWA />)

    await vi.waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('/sw.js', { scope: '/' })
    })
  })
})
