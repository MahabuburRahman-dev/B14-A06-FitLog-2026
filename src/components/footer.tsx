import { Dumbbell } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
      <Link href="/" className="brand footer-brand">
        <Dumbbell size={19} />
        <span>FITLOG</span>
      </Link>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}
