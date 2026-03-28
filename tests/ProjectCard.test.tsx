import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'

const mockProject = {
  title: "Test Project AI",
  imageUrl: "/test.png",
  shortDescription: "A test description for AI analysis.",
  technologies: ["React", "Vitest"],
  specialFeatures: ["Feature 1", "Feature 2"]
};

describe('ProjectCard Component', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project AI')).toBeInTheDocument()
    expect(screen.getByText(/test description for AI analysis/i)).toBeInTheDocument()
  })

  it('displays technology chips', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
  })

  it('shows AI Verified badge', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('AI Verified')).toBeInTheDocument()
  })

  it('shows correct feature count', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('2 FEATURES')).toBeInTheDocument()
  })
})
