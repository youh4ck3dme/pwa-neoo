"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import DropZone from "@/components/sections/DropZone";
import UploadModal from "@/components/sections/UploadModal";

interface Project {
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
}

const Portfolio = () => {
  const sampleProject: Project = {
    title: "SecureVault Enterprise",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shortDescription: "Hardened PWA s end-to-end šifrovaním a biometrickou autentifikáciou pre bankový sektor.",
    technologies: ["Next.js 15", "WAF", "MFA"],
    specialFeatures: ["E2EE Encryption", "Biometrics", "Audit Logs", "PWA"]
  };

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return [sampleProject];
    try {
      const saved = localStorage.getItem("magica-portfolio-projects");
      if (saved) return JSON.parse(saved) as Project[];
    } catch {}
    return [sampleProject];
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("magica-portfolio-projects", JSON.stringify(projects));
    } catch {}
  }, [projects]);

  // Fetch projects from API (Supabase if configured, else empty)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = (await response.json()) as Project[];
        // If API returns projects, prepend sampleProject + add API projects
        if (data.length > 0) {
          setProjects((prev) => {
            const hasProjects = prev.some((p) => p.title.includes("SecureVault"));
            return hasProjects ? [...prev, ...data] : [prev[0], ...data];
          });
        }
      } catch (err) {
        // API error or offline — fallback to localStorage (already set in initial state)
        console.log("Portfolio: API fetch skipped, using localStorage");
      }
    };
    fetchProjects();
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleProjectAdd = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const handleModalClose = () => {
    setSelectedFile(null);
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
              <DropZone onFileSelect={handleFileSelect} />
            </div>

            {/* Portfolio Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} />
              ))}
              {projects.length === 1 && (
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
      {selectedFile && (
        <UploadModal
          file={selectedFile}
          onClose={handleModalClose}
          onProjectAdd={handleProjectAdd}
        />
      )}
    </>
  );
};

export default Portfolio;
