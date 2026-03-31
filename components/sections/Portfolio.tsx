"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import DropZone, { ProjectSource } from "@/components/sections/DropZone";
import UploadModal from "@/components/sections/UploadModal";

interface Project {
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("magica-portfolio-projects-v2");
      if (saved) {
        const parsed = JSON.parse(saved) as Project[];
        return parsed;
      }
    } catch {
      console.warn("[Portfolio] Failed to parse localStorage projects.");
    }
    return [];
  });
  
  const [selectedSource, setSelectedSource] = useState<ProjectSource | null>(null);

  useEffect(() => {
    if (projects.length > 0) {
      try {
        localStorage.setItem("magica-portfolio-projects-v2", JSON.stringify(projects));
      } catch (e) {
        const isQuotaExceeded = e instanceof DOMException && 
          (e.code === 22 || e.code === 1014 || e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED");
        
        if (isQuotaExceeded) {
          console.warn("[Portfolio] Critical: localStorage quota exceeded. Attempting recovery...");
          try {
            localStorage.removeItem("magica-portfolio-projects-v2");
            localStorage.setItem("magica-portfolio-projects-v2", JSON.stringify(projects));
          } catch (retryError) {
            console.error("[Portfolio] Hard Failure: Data exceeds browser limits.", retryError);
          }
        }
      }
    }
  }, [projects]);

  // Fetch projects from API (Supabase if configured, else empty)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = (await response.json()) as Project[];
        
        if (data.length > 0) {
          console.log("[Portfolio] Syncing with API projects:", data.length);
          setProjects((prev) => {
            // Keep unique titles, prioritize incoming API data
            const existingTitles = new Set(data.map(p => p.title));
            const uniquePrev = prev.filter(p => !existingTitles.has(p.title));
            return [...uniquePrev, ...data];
          });
        }
      } catch (err) {
        console.log("[Portfolio] API fetch skipped, relying on local state.");
      }
    };
    fetchProjects();
  }, []);

  const handleSourceSelect = (source: ProjectSource) => {
    setSelectedSource(source);
  };

  const handleProjectAdd = (project: Project) => {
    console.log("[Portfolio] Adding new project:", project.title);
    setProjects((prev) => {
      // Avoid exact duplicates by title
      if (prev.some(p => p.title === project.title)) {
        return prev;
      }
      return [...prev, project];
    });
  };

  const handleModalClose = () => {
    setSelectedSource(null);
  };

  return (
    <>
      <section id="portfolio" data-testid="portfolio-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-[7px] mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">VYBRANÁ PRÁCA</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 text-left">Ukážka našich <span className="text-primary-600">riešení</span></h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-12">
            {/* Dropzone Column */}
            <div className="lg:col-span-1">
              <DropZone onSourceSelect={handleSourceSelect} />
            </div>

            {/* Portfolio Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={`${project.title}-${index}-${project.imageUrl.slice(-10)}`} 
                  project={project} 
                />
              ))}
              {projects.length === 0 && (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex items-center justify-center p-8 opacity-60">
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-400">Tvoj ďalší projekt tu...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {selectedSource && (
        <UploadModal
          source={selectedSource}
          onClose={handleModalClose}
          onProjectAdd={handleProjectAdd}
        />
      )}
    </>
  );
};

export default Portfolio;
