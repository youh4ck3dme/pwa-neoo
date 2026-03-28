// hooks/useZipProcessor.ts
import JSZip from "jszip";

export type ProcessedFile = {
  path: string;
  ext: string;
  size: number;
  contentSnippet: string;
};

const IGNORE_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  "__pycache__",
  "venv",
  "target",
  "out",
  ".next",
  ".nuxt",
  "vendor",
  ".cache",
];

const BINARY_EXT = [
  "png", "jpg", "jpeg", "gif", "bmp", "ico", "webp", "svg",
  "exe", "dll", "so", "dylib",
  "zip", "tar", "gz", "7z", "rar", "bz2",
  "pdf", "wasm", "class", "pyc",
  "mp3", "mp4", "wav", "ogg", "avi", "mov",
  "ttf", "woff", "woff2", "eot",
  "db", "sqlite", "lock",
];

const MAX_UNZIPPED_SIZE = 200 * 1024 * 1024; // 200 MB
const MAX_FILES = 8000;
const SNIPPET_SIZE = 5000;

export async function processZipFiles(
  file: File,
  progressCb?: (msg: string) => void
): Promise<ProcessedFile[]> {
  progressCb?.("Načítavam ZIP...");

  const zip = await JSZip.loadAsync(file).catch(() => null);
  if (!zip) throw new Error("ZIP je poškodený alebo nečitateľný.");

  const entries = Object.keys(zip.files);
  if (entries.length === 0) throw new Error("ZIP je prázdny.");
  if (entries.length > MAX_FILES)
    throw new Error(`ZIP obsahuje príliš veľa súborov (${entries.length}). Max: ${MAX_FILES}.`);

  let totalUnzipped = 0;
  const processed: ProcessedFile[] = [];
  let processed_count = 0;

  for (const path of entries) {
    const entry = zip.files[path];
    if (entry.dir) continue;

    // Skip ignored directories
    if (IGNORE_DIRS.some((d) => path.includes(`/${d}/`) || path.startsWith(`${d}/`))) continue;

    const ext = path.split(".").pop()?.toLowerCase() || "";
    if (BINARY_EXT.includes(ext)) continue;

    const raw = await entry.async("string").catch(() => null);
    if (!raw) continue;

    totalUnzipped += raw.length;
    if (totalUnzipped > MAX_UNZIPPED_SIZE)
      throw new Error("ZIP je príliš veľký po rozbalení (možná ZIP bomba). Max: 200 MB.");

    const snippet =
      raw.length > SNIPPET_SIZE
        ? raw.slice(0, SNIPPET_SIZE) + "\n\n...TRUNCATED..."
        : raw;

    processed.push({ path, ext, size: raw.length, contentSnippet: snippet });
    processed_count++;

    if (processed_count % 50 === 0) {
      progressCb?.(`Spracovaných ${processed_count} súborov...`);
    }
  }

  progressCb?.(`Hotovo — spracovaných ${processed.length} súborov.`);
  return processed;
}
