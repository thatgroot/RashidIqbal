"use client";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-white/40">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

