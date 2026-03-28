"use client";
import { useEffect } from "react";

export default function PWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // First, unregister any existing service workers to clear stale state
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
          }
          
          // Then register the new one
          navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => console.log("MA.GI.CA Service Worker registered", reg))
            .catch((err) => console.error("Service Worker registration failed", err));
        });
      });
    }
  }, []);

  return null;
}
