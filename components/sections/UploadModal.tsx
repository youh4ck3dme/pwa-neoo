"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processZipFiles, type ProcessedFile } from "@/hooks/useZipProcessor";
import ReadmePreviewModal from "@/components/ui/ReadmePreviewModal";
import { BookOpen, Link as LinkIcon, FileArchive } from "lucide-react";
import { ProjectSource } from "@/components/sections/DropZone";

const generateAiImageUrl = (title: string, technologies: string[], description: string, basePrompt?: string): string => {
  const seed = Math.floor(Math.random() * 999998) + 1;
  const prompt = basePrompt || `${title} ${technologies.slice(0, 3).join(" ")} modern web application UI screenshot, cinematic banner, ultra-clean flat style, dark background with neon accent`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true&enhance=false`;
};

const FALLBACK_IMAGE = "https://via.placeholder.com/800x600?text=Preview+Unavailable";

const checkImageAvailable = async (url: string, maxRetries = 3): Promise<string> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, { method: "HEAD", signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) return url;
    } catch {
      // Retry on network error or timeout
    }
    if (i < maxRetries - 1) {
      await new Promise(r => setTimeout(r, 1500));
    }
  }
  console.warn("[UploadModal] AI image not available after retries, using fallback.");
  return FALLBACK_IMAGE;
};

interface Project {
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
}

interface UploadModalProps {
  source: ProjectSource;
  onClose: () => void;
  onProjectAdd: (project: Project) => void;
}

type Stage = "processing" | "form" | "success" | "error";

const UploadModal = ({ source, onClose, onProjectAdd }: UploadModalProps) => {
  const [stage, setStage] = useState<Stage>("processing");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/800x600?text=Project");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [statusMsg, setStatusMsg] = useState("Pripravujem...");
  const [errorMsg, setErrorMsg] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [readmeContent, setReadmeContent] = useState("");
  const [showReadmePreview, setShowReadmePreview] = useState(false);
  const [isGeneratingReadme, setIsGeneratingReadme] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState<string | null>(null);

  // Auto-extract metadata from ZIP OR URL
  useEffect(() => {
    const extractMetadata = async () => {
      try {
        let report: any = null;

        if (source.type === "file") {
          setStatusMsg("Čítam ZIP súbor...");
          const files = await processZipFiles(source.value, (msg) => setStatusMsg(msg));
          setProcessedFiles(files.slice(0, 50));

          const readmeFile = files.find((f) => f.path.toLowerCase().includes("readme"));
          if (readmeFile) {
            setReadmeContent(readmeFile.contentSnippet);
          }

          setStatusMsg("Forenzná AI analýza kódu...");
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: files.slice(0, 50) })
          });
          
          if (!response.ok) {
             throw new Error("AI analýza zlyhala. Skontrolujte pripojenie.");
          }
          report = await response.json();
        } else {
          setStatusMsg(`Extrahuje dáta z ${source.value}...`);
          const response = await fetch("/api/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: source.value })
          });

          if (!response.ok) {
            throw new Error("Extraxiu z URL sa nepodarilo vykonať.");
          }
          report = await response.json();
        }

        // Set values from AI model
        setTitle(report.title || "Nový projekt");
        setShortDescription(report.shortDescription || "Projekt získaný z externého zdroja.");
        
        if (report.technologies && Array.isArray(report.technologies)) {
          setTechnologies(report.technologies.slice(0, 5).join(", "));
        }

        setIsGeneratingImage(true);
        setStatusMsg("Generujem AI obrázok...");
        
        const aiUrl = generateAiImageUrl(report.title || "", [], "", report.imagePrompt);
        const validUrl = await checkImageAvailable(aiUrl);
        setImageUrl(validUrl);
        setIsGeneratingImage(false);

        setStage("form");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Neznáma chyba";
        setErrorMsg(msg);
        setStatusMsg("Chyba: " + msg);
        setStage("error");
      }
    };

    extractMetadata();
  }, [source]);

  // Reset stale state
  useEffect(() => {
    setPasswordError(false);
    setPassword("");
    setSuccessState(false);
    setIsSubmitting(false);
    setErrorMsg("");
    setStage("processing");
  }, [source]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false);

    if (password !== "88888888") {
      setPasswordError(true);
      setPassword("");
      return;
    }

    if (!title.trim() || !shortDescription.trim() || !technologies.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newProjectData = {
        title: title.trim(),
        imageUrl: imageUrl.trim(),
        shortDescription: shortDescription.trim(),
        technologies: technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0),
        specialFeatures: [
          "AI Verified",
          source.type === "url" ? "Web Source" : "Code Source",
          "Neon Bloom Style",
        ],
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjectData),
      });

      await res.json();
      setSuccessState(true);

      setTimeout(() => {
        onProjectAdd(newProjectData as any);
        onClose();
      }, 1500);

    } catch (err) {
      console.error("Save project error:", err);
      setSuccessState(true);
      setTimeout(() => {
        onProjectAdd({
          title: title.trim(),
          imageUrl: imageUrl.trim(),
          shortDescription: shortDescription.trim(),
          technologies: technologies.split(",").map(t => t.trim()).filter(Boolean),
          specialFeatures: ["AI Verified", "Local Fallback"]
        } as any);
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-800/90 backdrop-blur-2xl rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 max-h-[85vh] overflow-y-auto custom-scrollbar"
        >
          {stage === "processing" ? (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                className="w-16 h-16 border-4 border-white/5 border-t-neon-cyan rounded-full mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-xl font-bold text-white mb-2 font-display uppercase tracking-tight">
                {source.type === "url" ? "Analyzujem URL..." : "Spracovávam ZIP..."}
              </h3>
              <p className="text-white/40 text-sm">{statusMsg}</p>
            </motion.div>
          ) : stage === "error" ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <i className="fas fa-exclamation text-2xl text-red-500"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chyba pri spracovaní</h3>
              <p className="text-red-400 text-sm">{errorMsg}</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-white text-dark-900 rounded-full font-bold hover:bg-neon-cyan transition-colors">
                Zatvoriť
              </button>
            </motion.div>
          ) : successState ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6, repeat: 1 }}>
                <i className="fas fa-check text-4xl text-green-600"></i>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display uppercase tracking-tight">Projekt pridaný! ✨</h3>
              <p className="text-neon-cyan/60 text-sm font-medium">Tvoj projekt sa objavil v portfóliu.</p>
            </motion.div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight">Detaily projektu</h2>
                <button onClick={onClose} className="text-white/20 hover:text-white text-2xl transition-colors">×</button>
              </div>

              <div className="flex items-center gap-2 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                {source.type === "file" ? <FileArchive size={20} className="text-neon-cyan" /> : <LinkIcon size={20} className="text-neon-cyan" />}
                <p className="text-sm text-white/60 truncate italic">
                  <strong>Zdroj:</strong> {source.type === "file" ? source.value.name : source.value}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-white/60 mb-2 uppercase tracking-[0.2em]">Názov projektu ✨</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all" required />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/60 mb-2 uppercase tracking-[0.2em]">Krátky popis ✨</label>
                  <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all resize-none" required />
                  {(readmeContent || source.type === "url") && (
                    <div className="mt-2">
                       <span className="text-[10px] bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">AI Extracted</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/60 mb-2 uppercase tracking-[0.2em]">Technológie ✨</label>
                  <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all" required />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">AI Obrázok projektu ✨</label>
                    <button type="button" onClick={() => setImageUrl(generateAiImageUrl(title, technologies.split(","), shortDescription))} className="text-[10px] px-3 py-1 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full hover:bg-neon-cyan/20 transition-all font-bold flex items-center gap-1.5 uppercase tracking-tighter">
                      <i className="fas fa-sync-alt text-[10px]"></i> Vygenerovať znova
                    </button>
                  </div>
                  {isGeneratingImage ? (
                    <div className="w-full h-40 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                      <i className="fas fa-spinner fa-spin text-neon-cyan text-xl"></i>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-40 mb-2">
                      <img src={imageUrl} alt="AI preview" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">🤖 AI Generated</div>
                    </div>
                  )}
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] text-white/30 font-mono truncate" required />
                </div>

                <motion.div animate={passwordError ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.4 }}>
                  <label className="block text-[10px] font-bold text-white/60 mb-2 uppercase tracking-[0.2em]">Heslo pre potvrdenie</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${passwordError ? "border-red-500/50 bg-red-500/10 text-white" : "border-white/10 focus:ring-neon-cyan bg-white/5 text-white"}`} required />
                </motion.div>

                <button type="submit" disabled={isSubmitting || !title || !shortDescription} className="w-full py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-neon-cyan transition-all disabled:opacity-30 flex items-center justify-center gap-2 mt-4 shadow-lg">
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Spracovávam...</> : <><i className="fas fa-check"></i> Vstúpiť do Systému</>}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;
