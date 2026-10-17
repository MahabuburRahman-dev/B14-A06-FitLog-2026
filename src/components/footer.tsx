import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#24262e] bg-[#0e0f13]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-12">
        {/* Brand */}
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex items-center gap-2 text-white"
        >
          <Dumbbell size={20} strokeWidth={2.5} className="text-[#ccff00]" />
          <span className="text-sm font-extrabold tracking-wide">FITLOG</span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-xs leading-5 text-[#858995] sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
