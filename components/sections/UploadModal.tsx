"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processZipFiles, type ProcessedFile } from "@/hooks/useZipProcessor";

const generateAiImageUrl = (title: string, technologies: string[], description: string): string => {
  const techStr = technologies.slice(0, 3).join(" ");
  const descStr = description.slice(0, 60);
  const prompt = `${title} ${techStr} ${descStr} modern web application UI screenshot professional dark gradient clean interface`;
  const seed = Math.floor(Math.random() * 999998) + 1;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true&enhance=true`;
};

interface Project {
  title: string;
  imageUrl: string;
  shortDescription: string;
  technologies: string[];
  specialFeatures: string[];
}

interface UploadModalProps {
  file: File;
  onClose: () => void;
  onProjectAdd: (project: Project) => void;
}

type Stage = "processing" | "form" | "success" | "error";

const UploadModal = ({ file, onClose, onProjectAdd }: UploadModalProps) => {
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
  const [statusMsg, setStatusMsg] = useState("Čítam ZIP...");
  const [errorMsg, setErrorMsg] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Auto-extract metadata from ZIP
  useEffect(() => {
    const extractMetadata = async () => {
      try {
        setStatusMsg("Čítam ZIP...");
        const files = await processZipFiles(file, (msg) => setStatusMsg(msg));
        setProcessedFiles(files.slice(0, 50));

        // Extract title from package.json
        let extractedTitle = "Custom Project";
        let extractedTechs: string[] = [];
        let extractedDesc = "Project uploaded";

        const pkgFile = files.find((f) => f.path.endsWith("package.json"));
        if (pkgFile) {
          try {
            const pkg = JSON.parse(pkgFile.contentSnippet);
            extractedTitle = pkg.name || extractedTitle;
            extractedTechs = Object.keys(pkg.dependencies || {})
              .slice(0, 5)
              .map((d) => d.split("/").pop() || d);
          } catch {}
        }

        // Extract description from README
        const readmeFile = files.find((f) =>
          f.path.toLowerCase().includes("readme")
        );
        if (readmeFile) {
          const lines = readmeFile.contentSnippet.split("\n");
          const firstPara = lines.find(
            (l) => l.trim() && !l.startsWith("#")
          );
          extractedDesc =
            (firstPara || "").slice(0, 200).trim() || extractedDesc;
        }

        // Set auto-extracted values
        setTitle(extractedTitle);
        setShortDescription(extractedDesc);
        setTechnologies(extractedTechs.join(", "));

        // Generate AI image
        setIsGeneratingImage(true);
        setStatusMsg("Generujem AI obrázok...");
        const aiUrl = generateAiImageUrl(extractedTitle, extractedTechs, extractedDesc);
        setImageUrl(aiUrl);
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
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false);

    if (password !== "23513900") {
      setPasswordError(true);
      setPassword("");
      return;
    }

    if (
      !title.trim() ||
      !shortDescription.trim() ||
      !technologies.trim()
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      const newProject: Project = {
        title: title.trim(),
        imageUrl: imageUrl.trim(),
        shortDescription: shortDescription.trim(),
        technologies: technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0),
        specialFeatures: [
          "AI Verified",
          "PWA",
          "Full-Stack",
          "Enterprise-Grade",
        ],
      };

      setSuccessState(true);

      setTimeout(() => {
        onProjectAdd(newProject);
        onClose();
      }, 1500);
    }, 800);
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
          className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
        >
          {stage === "processing" ? (
            // Processing State
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Spracovávam ZIP...
              </h3>
              <p className="text-slate-500 text-sm">{statusMsg}</p>
            </motion.div>
          ) : stage === "error" ? (
            // Error State
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Chyba pri spracovaní
              </h3>
              <p className="text-red-600 text-sm">{errorMsg}</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Zatvoriť
              </button>
            </motion.div>
          ) : successState ? (
            // Success State
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: 1 }}
              >
                <i className="fas fa-check text-4xl text-green-600"></i>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Projekt pridaný! ✨
              </h3>
              <p className="text-slate-500">
                Tvoj projekt sa objavil v portfóliu.
              </p>
            </motion.div>
          ) : (
            // Form State
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Detaily projektu
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-sm text-slate-500 mb-6">
                <strong>Súbor:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>

              {/* File Preview */}
              {processedFiles.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase">
                    Spracované súbory ({processedFiles.length})
                  </p>
                  <div className="text-xs text-slate-600 space-y-1 max-h-24 overflow-y-auto">
                    {processedFiles.slice(0, 15).map((f) => (
                      <div key={f.path} className="font-mono">
                        📄 {f.path}
                      </div>
                    ))}
                    {processedFiles.length > 15 && (
                      <div className="text-slate-400">
                        + {processedFiles.length - 15} ďalších...
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Názov projektu */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Názov projektu ✨ (auto-filled)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="napr. SecureVault Enterprise"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Krátky popis */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Krátky popis ✨ (auto-filled)
                  </label>
                  <textarea
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Popíš svoj projekt..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Technológie */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Technológie ✨ (auto-filled)
                  </label>
                  <input
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="napr. Next.js, React, TypeScript, Tailwind"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* AI Image Preview + Regenerate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-700">
                      AI Obrázok projektu ✨
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const techs = technologies.split(",").map(t => t.trim()).filter(Boolean);
                        setImageUrl(generateAiImageUrl(title, techs, shortDescription));
                      }}
                      className="text-xs px-3 py-1 bg-primary-50 text-primary-600 border border-primary-200 rounded-full hover:bg-primary-100 transition-colors font-medium flex items-center gap-1"
                    >
                      <i className="fas fa-sync-alt text-[10px]"></i>
                      Vygenerovať znova
                    </button>
                  </div>
                  {isGeneratingImage ? (
                    <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin text-primary-400 text-xl"></i>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 h-40 mb-2">
                      <img
                        src={imageUrl}
                        alt="AI preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Generating..."; }}
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        🤖 AI Generated
                      </div>
                    </div>
                  )}
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-xs text-slate-500"
                    required
                  />
                </div>

                {/* Heslo */}
                <motion.div
                  animate={
                    passwordError ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Heslo pre potvrdenie
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                      passwordError
                        ? "border-red-500 focus:ring-red-500 bg-red-50"
                        : "border-slate-200 focus:ring-primary-500"
                    }`}
                    required
                  />
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-medium"
                    >
                      ❌ Nesprávne heslo. Skúste znova.
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !title ||
                    !shortDescription ||
                    !technologies
                  }
                  className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Spracovávam...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      Pridať projekt
                    </>
                  )}
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
