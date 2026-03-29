"use client";
import { useEffect } from "react";
import NotificationPrompt from "@/components/ui/NotificationPrompt";

export default function PWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("MA.GI.CA Service Worker registered", { scope: reg.scope });

          // Register background sync if supported
          if ("sync" in reg) {
            (reg as any).sync.register("sync-projects").catch(() => {
              // Background sync not available
            });
          }

          // Check for SW updates
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "activated") {
                  console.log("MA.GI.CA SW updated and activated");
                }
              });
            }
          });
        })
        .catch((err) => console.error("Service Worker registration failed", err));
    }
  }, []);

  return <NotificationPrompt />;
}
