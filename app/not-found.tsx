import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-slate-200 mb-4">404</div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
          Stránka nenájdená
        </h2>
        <p className="text-slate-500 mb-8 text-sm">
          Táto stránka neexistuje alebo bola presunutá.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
        >
          Späť na hlavnú stránku
        </Link>
      </div>
    </div>
  );
}
