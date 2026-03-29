import React from "react";
import Image from "next/image";

interface Project {
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden hover:translate-y-[-4px] transition-transform duration-300">
      <div className="relative">
        <Image src={project.imageUrl} alt={project.title} width={800} height={450} loading="lazy" className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary-600 shadow-sm border border-primary-100">
          AI Verified
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">PWA</span>
          <span className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded">Full-Stack</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <a href="#" className="text-sm text-primary-600 font-bold hover:underline">
            Zobraziť detaily
          </a>
          <span className="text-[10px] text-slate-400 font-bold">{project.specialFeatures.length} FEATURES</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
