import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function WorkoutNotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#0d0e12] px-4 text-center text-white">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ccff00]/10 text-[#ccff00]">
        <Search size={30} />
      </div>

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
        404 — Workout Not Found
      </p>

      <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
        No workout here.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
        This workout may not exist or may have been removed. Return to the
        library and choose another workout.
      </p>

      <Link
        href="/#library"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-[#111] transition hover:bg-[#b9eb00]"
      >
        <ArrowLeft size={18} />
        Back to Workouts
      </Link>
    </div>
  );
}
