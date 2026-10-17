"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Search,
  Dumbbell,
  Flame,
  Clock3,
  Trophy,
  X,
} from "lucide-react";

import type { Workout, Difficulty } from "@/lib/types";
import WorkoutCard from "@/components/workoutCard";

type HomeClientProps = {
  workouts: Workout[];
};

type Category = "All" | Difficulty;

const categories: Category[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function HomeClient({ workouts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = workouts.filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(query) ||
        workout.equipment.toLowerCase().includes(query) ||
        workout.muscleGroups.some((muscle) =>
          muscle.toLowerCase().includes(query),
        );

      const matchesCategory =
        category === "All" || workout.difficulty === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "duration") {
      result.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "calories") {
      result.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [workouts, search, category, sortBy]);

  const averageRating = workouts.length
    ? (
        workouts.reduce((total, workout) => total + workout.rating, 0) /
        workouts.length
      ).toFixed(1)
    : "0.0";

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#171a20]">
          <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#ccff00]/10 blur-[100px]" />

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-4">
            <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ccff00]">
                <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
                Your fitness journey starts here
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Train hard.
                <br />
                <span className="text-[#ccff00]">Stay consistent.</span>
                <br />
                Get stronger.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Discover workouts, build your daily plan, and track your
                progress. Make every training session count.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#library"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-bold text-[#111] transition hover:bg-[#b9eb00]"
                >
                  Browse Workouts
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/my-plan"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                >
                  My Plan
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-black text-[#ccff00]">
                    {workouts.length}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Workouts
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#ccff00]">
                    {averageRating}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Avg. Rating
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#ccff00]">
                    {totalCalories.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Total kcal*
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                *Sum of the listed workouts' calorie estimates, not a personal
                daily burn target.
              </p>
            </div>

            {/* Hero visual */}
            <div className="relative min-h-64 sm:min-h-80 lg:min-h-[520px]">
              <img
                src={workouts[0]?.image}
                alt={workouts[0]?.name ?? "Workout training"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#171a20] via-black/10 to-transparent lg:bg-gradient-to-r lg:from-[#171a20] lg:via-black/10 lg:to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/50 p-4 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
                  Featured workout
                </p>
                <h2 className="mt-2 text-xl font-extrabold uppercase">
                  {workouts[0]?.name ?? "Explore Workouts"}
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  {workouts[0]
                    ? `${workouts[0].duration} minutes · ${workouts[0].caloriesBurned} kcal`
                    : "Find your next workout"}
                </p>
                {workouts[0] && (
                  <Link
                    href={`/workout/${workouts[0].id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ccff00] hover:underline"
                  >
                    Explore workout <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="flex gap-4 rounded-2xl border border-white/10 bg-[#15171d] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
            <Dumbbell size={23} />
          </div>
          <div>
            <h2 className="font-bold">Curated Workouts</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Find exercises by difficulty and muscle group.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-white/10 bg-[#15171d] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
            <Clock3 size={23} />
          </div>
          <div>
            <h2 className="font-bold">Plan Your Time</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Choose sessions that fit your schedule.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-white/10 bg-[#15171d] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
            <Trophy size={23} />
          </div>
          <div>
            <h2 className="font-bold">Keep Improving</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Build a consistent training routine.
            </p>
          </div>
        </div>
      </section>

      {/* WORKOUT LIBRARY */}
      <section
        id="library"
        className="scroll-mt-24 border-t border-white/10 bg-[#101116] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                Find your next challenge
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
                Workout Library<span className="text-[#ccff00]">.</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Explore exercises and find the right fit for your goals.
              </p>
            </div>

            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">
                {filteredWorkouts.length}
              </span>{" "}
              workout{filteredWorkouts.length === 1 ? "" : "s"} found
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search workouts, equipment, muscle groups..."
                aria-label="Search workouts"
                className="w-full rounded-xl border border-white/10 bg-[#181a21] py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00]/60"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <label className="flex items-center gap-3 text-sm text-gray-400">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="min-w-44 rounded-xl border border-white/10 bg-[#181a21] px-4 py-3.5 text-white outline-none focus:border-[#ccff00]/60"
              >
                <option value="featured">Featured</option>
                <option value="duration">Shortest duration</option>
                <option value="calories">Most calories</option>
                <option value="rating">Highest rating</option>
              </select>
            </label>
          </div>

          {/* Difficulty filter */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "border-[#ccff00] bg-[#ccff00] text-[#111]"
                    : "border-white/10 bg-[#181a21] text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Responsive cards */}
          {filteredWorkouts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-white/15 px-5 py-16 text-center">
              <Search size={32} className="text-gray-500" />
              <h3 className="mt-4 text-lg font-bold">No workouts found</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                Try another keyword or choose a different difficulty.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSortBy("featured");
                }}
                className="mt-5 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-[#111] hover:bg-[#b9eb00]"
              >
                Reset filters
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <a
              href="#library"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#ccff00]"
            >
              Back to library <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
