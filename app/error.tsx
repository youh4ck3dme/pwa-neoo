"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
          Niečo sa pokazilo
        </h2>
        <p className="text-slate-500 mb-2 text-sm">
          {error.message || "Nastala neočakávaná chyba."}
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 mb-6 font-mono">
            ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
          >
            Skúsiť znova
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Domov
          </a>
        </div>
      </div>
    </div>
  );
}
