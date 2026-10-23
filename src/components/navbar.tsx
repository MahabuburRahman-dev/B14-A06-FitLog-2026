"use client";
import { Dumbbell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "./store";
export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);
  const links = [
    {
      href: "/",
      label: "Workouts",
      active: path === "/" || path.startsWith("/workout/"),
    },
    { href: "/my-plan", label: "My Plan", active: path === "/my-plan" },
  ];
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="FitLog home">
          <Dumbbell size={25} />
          <span>FITLOG</span>
        </Link>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={l.active ? "nav-link active" : "nav-link"}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-status">
          <Link href="/my-plan" className="status-link">
            Plan <span className="count count-lime">{plan.length}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="status-link">
            Saved <span className="count count-outline">{saved.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
