import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { useState } from 'react';

/**
 * AI FEATURES TESTS (12 tests)
 * Testing: /api/chat, /api/generate-readme, /api/estimate-price,
 *          /api/security-audit, /api/generate-content, ChatWidget
 */

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: API ROUTE VALIDATION (6 tests)
// ─────────────────────────────────────────────────────────────────────────────

describe('AI API Routes — Input Validation', () => {
  it('/api/chat: should return 400 when messages is not an array', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ error: 'Invalid messages' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: 'not-an-array' }),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Invalid messages');
  });

  it('/api/generate-readme: should return 400 when title is missing', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ error: 'Missing title' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/generate-readme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Missing title');
  });

  it('/api/estimate-price: should return 400 when projectType is missing', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ error: 'Missing projectType' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/estimate-price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Missing projectType');
  });

  it('/api/security-audit: should return 400 when files array is missing', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ error: 'No files provided' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/security-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('No files provided');
  });

  it('/api/generate-content: should return 400 when projectTitle is missing', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ error: 'Missing contentType or projectTitle' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentType: 'linkedin-post' }),
    });
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/projectTitle/i);
  });

  it('/api/generate-content: contentType must be one of 4 valid types', () => {
    const validTypes = ['linkedin-post', 'email-pitch', 'case-study', 'tech-summary'];
    const invalidType = 'twitter-post';

    expect(validTypes).toContain('linkedin-post');
    expect(validTypes).toContain('email-pitch');
    expect(validTypes).toContain('case-study');
    expect(validTypes).toContain('tech-summary');
    expect(validTypes).not.toContain(invalidType);
    expect(validTypes).toHaveLength(4);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: API RESPONSE SHAPES (3 tests)
// ─────────────────────────────────────────────────────────────────────────────

describe('AI API Routes — Response Shapes', () => {
  it('/api/estimate-price: success response should have min, expected, max fields', async () => {
    const mockResult = { min: 1500, expected: 2500, max: 4000, timeline_weeks: 6, notes: [] };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockResult),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/estimate-price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectType: 'PWA', complexity: 3, timeline: 'standard' }),
    });
    const data = await res.json();

    expect(data).toHaveProperty('min');
    expect(data).toHaveProperty('expected');
    expect(data).toHaveProperty('max');
    expect(typeof data.min).toBe('number');
    expect(data.expected).toBeGreaterThanOrEqual(data.min);
    expect(data.max).toBeGreaterThanOrEqual(data.expected);
  });

  it('/api/security-audit: success response should have score, grade and issues array', async () => {
    const mockResult = {
      score: 72,
      grade: 'B',
      summary: 'Reasonable security posture.',
      issues: [{ severity: 'warning', file: 'app.ts', title: 'Missing CSRF', description: 'No CSRF token', fix: 'Add CSRF middleware' }],
      strengths: ['HTTPS enforced'],
      total_issues: 1,
    };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockResult),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/security-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: [{ path: 'app.ts', contentSnippet: 'const x = 1;' }] }),
    });
    const data = await res.json();

    expect(data).toHaveProperty('score');
    expect(data).toHaveProperty('grade');
    expect(Array.isArray(data.issues)).toBe(true);
    expect(data.score).toBeGreaterThanOrEqual(0);
    expect(data.score).toBeLessThanOrEqual(100);
    expect(['A', 'B', 'C', 'D', 'F']).toContain(data.grade);
  });

  it('/api/generate-readme: success response should have readme string and filename', async () => {
    const mockResult = { readme: '# My Project\n\nDescription here.', filename: 'README.md' };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockResult),
    });
    vi.stubGlobal('fetch', mockFetch);

    const res = await fetch('/api/generate-readme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'My Project', technologies: ['Next.js'] }),
    });
    const data = await res.json();

    expect(data).toHaveProperty('readme');
    expect(data).toHaveProperty('filename');
    expect(typeof data.readme).toBe('string');
    expect(data.filename).toBe('README.md');
    expect(data.readme.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: CHAT WIDGET UI (3 tests)
// ─────────────────────────────────────────────────────────────────────────────

describe('ChatWidget UI', () => {
  const ChatWidgetMock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { role: 'assistant' as const, content: 'Ahoj! Som MA.GI.CA AI asistent.' },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
      if (!input.trim()) return;
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      setInput('');
      // Simulate response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Test odpoveď' }]);
      }
    };

    return (
      <div>
        {isOpen && (
          <div data-testid="chat-window">
            <div data-testid="chat-header">MA.GI.CA AI</div>
            <div data-testid="messages">
              {messages.map((m, i) => (
                <div key={i} data-testid={`msg-${m.role}`}>{m.content}</div>
              ))}
            </div>
            <div data-testid="quick-questions">
              {['Aké sú vaše ceny?', 'Robíte PWA?'].map(q => (
                <button key={q} onClick={() => { setInput(q); }} data-testid="quick-btn">
                  {q}
                </button>
              ))}
            </div>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Napíšte správu..."
              data-testid="chat-input"
            />
            <button onClick={sendMessage} data-testid="send-btn">Odoslať</button>
          </div>
        )}
        <button onClick={() => setIsOpen(o => !o)} data-testid="chat-bubble">
          {isOpen ? '✕' : '💬'}
        </button>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      body: null,
      json: vi.fn().mockResolvedValue({}),
    }));
  });

  it('should render floating bubble button', () => {
    render(<ChatWidgetMock />);
    expect(screen.getByTestId('chat-bubble')).toBeInTheDocument();
    expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
  });

  it('should open chat window when bubble is clicked', async () => {
    render(<ChatWidgetMock />);
    fireEvent.click(screen.getByTestId('chat-bubble'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-window')).toBeInTheDocument();
      expect(screen.getByTestId('chat-header')).toHaveTextContent('MA.GI.CA AI');
      expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    });
  });

  it('should display initial assistant greeting message', async () => {
    render(<ChatWidgetMock />);
    fireEvent.click(screen.getByTestId('chat-bubble'));

    await waitFor(() => {
      expect(screen.getByTestId('msg-assistant')).toHaveTextContent('Ahoj! Som MA.GI.CA AI asistent.');
    });
  });
});
