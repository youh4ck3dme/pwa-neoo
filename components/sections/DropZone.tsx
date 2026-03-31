"use client";
import React, { useRef, useState } from "react";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB

export type ProjectSource = 
  | { type: "file"; value: File }
  | { type: "url"; value: string };

interface DropZoneProps {
  onSourceSelect: (source: ProjectSource) => void;
}

const DropZone = ({ onSourceSelect }: DropZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setError(null);
    if (file.size > MAX_FILE_SIZE) {
      setError(`Súbor je príliš veľký: ${(file.size / 1024 / 1024).toFixed(0)} MB (max 200 MB)`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (!file.name.toLowerCase().endsWith(".zip")) {
      setError("Povolený je len .zip formát.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    onSourceSelect({ type: "file", value: file });
  };

  const handleUrlSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    
    let url = urlInput.trim();
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    try {
      new URL(url);
      onSourceSelect({ type: "url", value: url });
      setUrlInput("");
    } catch {
      setError("Neplatná URL adresa.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    // Check for dropped URL/Link
    const droppedUrl = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (droppedUrl && droppedUrl.startsWith("http")) {
      onSourceSelect({ type: "url", value: droppedUrl });
      return;
    }

    // Check for dropped File
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all group ${
        isDragging ? "border-primary-500 bg-primary-50/30 scale-[1.02]" : "border-slate-200 bg-slate-50/50 hover:border-primary-400"
      }`}
    >
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
        <i className={`fas ${isDragging ? "fa-link text-primary-500" : "fa-file-archive text-primary-600"} text-2xl`}></i>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">Získaj AI Audit Kódu</h3>
      <p className="text-slate-500 text-sm mb-6">Nahraj zdrojový kód a nechaj náš systém odhaliť zraniteľnosti.</p>

      {error && (
        <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
          ❌ {error}
        </div>
      )}

      <div className="space-y-4">
        {/* URL Input */}
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input 
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Prilep URL (napr. GitHub)..."
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-[7px] text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
          />
          <button 
            type="submit"
            disabled={!urlInput.trim()}
            className="px-4 py-2.5 bg-primary-600 text-white rounded-[7px] font-bold text-xs hover:bg-primary-700 transition-all disabled:opacity-50"
          >
            Pridať
          </button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">alebo</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* ZIP Upload */}
        <label className="cursor-pointer block">
          <span className="w-full px-8 py-3 bg-slate-900 text-white rounded-[7px] font-bold text-sm hover:bg-slate-800 transition-all inline-block">
            Nahrať Projekt na Audit
          </span>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".zip"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <p className="text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
        Podporujeme .zip repozitáre do 200MB
      </p>
    </div>
  );
};

export default DropZone;
