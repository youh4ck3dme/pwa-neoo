"use client";
import React, { useRef, useState } from "react";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

const DropZone = ({ onFileSelect }: DropZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    onFileSelect(file);
  };

  return (
    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-primary-400 transition-colors bg-slate-50/50 group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
        <i className="fas fa-file-archive text-2xl text-primary-600"></i>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Nahraj svoj projekt</h3>
      <p className="text-slate-500 text-sm mb-6">Nahrajte ZIP súbor so svojím kódom pre okamžitú AI analýzu.</p>

      {error && (
        <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
          ❌ {error}
        </div>
      )}

      <label className="cursor-pointer block">
        <span className="px-8 py-3 bg-slate-900 text-white rounded-[7px] font-bold text-sm hover:bg-primary-600 transition-all inline-block">
          Vybrať ZIP súbor
        </span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".zip"
          onChange={handleFileChange}
        />
      </label>
      <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Max 200MB • .zip formát</p>
    </div>
  );
};

export default DropZone;

