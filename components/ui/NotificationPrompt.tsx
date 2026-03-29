"use client";
import React, { useState, useEffect } from "react";

const STORAGE_KEY = "magica-notif-dismissed";

export default function NotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");

  useEffect(() => {
    // Don't show if not supported, already granted, or already dismissed
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") return;
    if (Notification.permission === "denied") return;

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    } catch {}

    // Show after 30 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        // Send welcome notification
        new Notification("MA.GI.CA", {
          body: "Ďakujeme! Budeme vás informovať o nových projektoch. 🚀",
          icon: "/icons/icon-192x192.png",
        });

        // Subscribe to push if SW is available
        if ("serviceWorker" in navigator) {
          const reg = await navigator.serviceWorker.ready;
          const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

          if (vapidKey && reg.pushManager) {
            try {
              const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey),
              });

              // Send subscription to server
              await fetch("/api/push", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subscription.toJSON()),
              });
            } catch {
              // Push subscription failed — still OK, notification permission was granted
            }
          }
        }
      }
    } catch {}

    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
  };

  const handleDismiss = () => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📢</span>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Chcete dostávať notifikácie?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Budeme vás informovať o nových projektoch a aktualizáciách.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Áno, chcem
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors"
          >
            Nie, ďakujem
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// Convert VAPID key from base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}
