"use client";

import {
  PLAN_KEY,
  SAVED_KEY,
  STORAGE_EVENT,
  readWorkoutList,
} from "@/lib/storage";
import { Bookmark, CalendarDays, Dumbbell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function refreshCounts() {
      setPlanCount(readWorkoutList(PLAN_KEY).length);
      setSavedCount(readWorkoutList(SAVED_KEY).length);
    }

    refreshCounts();

    window.addEventListener(STORAGE_EVENT, refreshCounts);
    window.addEventListener("storage", refreshCounts);

    return () => {
      window.removeEventListener(STORAGE_EVENT, refreshCounts);
      window.removeEventListener("storage", refreshCounts);
    };
  }, []);

  const links = [
    { label: "Workouts", href: "/#library", active: pathname === "/" },
    { label: "My Plan", href: "/my-plan", active: pathname === "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#24262e] bg-[#0e0f13]/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12"
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex shrink-0 items-center gap-2 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <Dumbbell size={25} strokeWidth={2.5} className="text-[#ccff00]" />
          <span className="text-xl font-extrabold tracking-tight">FITLOG</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                link.active
                  ? "bg-[#20251a] font-semibold text-[#ccff00]"
                  : "text-[#b1b4bf] hover:bg-[#1a1c23] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Plan and Saved counters */}
        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-[#c2c4cc] hover:text-white"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold text-[#101108]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-[#a3a6b2] hover:text-white"
          >
            <span className="hidden sm:inline">Saved</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#383b45] px-1.5 text-xs text-white">
              {savedCount}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-white hover:bg-[#22242c] md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#24262e] bg-[#111218] px-4 py-3 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`mb-1 flex items-center rounded-lg px-4 py-3 text-sm ${
                link.active
                  ? "bg-[#20251a] font-semibold text-[#ccff00]"
                  : "text-[#c2c4cc] hover:bg-[#1b1d24]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 flex gap-4 border-t border-[#292b33] pt-3 text-xs text-[#a3a6b2]">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              Today's plan: {planCount}
            </span>
            <span className="flex items-center gap-1.5">
              <Bookmark size={14} />
              Saved: {savedCount}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
