import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Flame,
  Layers3,
  Repeat2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import WorkoutActions from "@/components/WorkoutActiona";
import { fetchWorkoutById } from "@/lib/workouts";

type WorkoutDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;

  // Only accept positive whole-number IDs.
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const workoutId = Number(id);

  if (!Number.isSafeInteger(workoutId)) {
    notFound();
  }

  const workout = await fetchWorkoutById(workoutId);

  if (!workout) {
    notFound();
  }

  const difficultyStyles: Record<string, string> = {
    Beginner: "bg-emerald-400/10 text-emerald-400",
    Intermediate: "bg-yellow-400/10 text-yellow-400",
    Advanced: "bg-rose-400/10 text-rose-400",
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb / back link */}
        <Link
          href="/#library"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={17} />
          Back to workouts
        </Link>

        {/* Page heading */}
        <div className="mb-8 mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Details
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
            {workout.name}
            <span className="text-[#ccff00]">.</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                difficultyStyles[workout.difficulty] ?? "bg-white/10 text-white"
              }`}
            >
              {workout.difficulty}
            </span>

            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left column */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171a20]">
              <img
                src={workout.image}
                alt={workout.name}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Star size={17} className="fill-[#ccff00] text-[#ccff00]" />
                {workout.rating} / 5.0
              </div>
            </div>

            {/* Workout description */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-[#15171d] p-5 sm:p-6">
              <h2 className="text-xl font-bold">About This Workout</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                {workout.description}
              </p>
            </section>

            {/* Instructions */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-[#15171d] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
                  <CheckCircle2 size={21} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">How to Perform</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Follow each step with proper form.
                  </p>
                </div>
              </div>

              {workout.instructions.length > 0 ? (
                <ol className="mt-6 space-y-4">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={`${workout.id}-step-${index}`}
                      className="flex gap-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-[#111]">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-6 text-gray-300">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 text-sm text-gray-400">
                  Instructions are not available for this workout.
                </p>
              )}
            </section>
          </div>

          {/* Right column */}
          <aside className="lg:sticky lg:top-24">
            {/* Workout stats */}
            <section className="rounded-2xl border border-white/10 bg-[#15171d] p-5 sm:p-6">
              <h2 className="text-xl font-bold">Workout Overview</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Review the key details before adding this session to your plan.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-[#101116] p-4">
                  <Clock3 size={21} className="text-[#ccff00]" />
                  <p className="mt-4 text-2xl font-black">
                    {workout.duration}
                    <span className="ml-1 text-sm font-medium text-gray-400">
                      min
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Duration</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#101116] p-4">
                  <Flame size={21} className="text-[#ccff00]" />
                  <p className="mt-4 text-2xl font-black">
                    {workout.caloriesBurned}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Estimated kcal</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#101116] p-4">
                  <Layers3 size={21} className="text-[#ccff00]" />
                  <p className="mt-4 text-2xl font-black">{workout.sets}</p>
                  <p className="mt-1 text-xs text-gray-500">Sets</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#101116] p-4">
                  <Repeat2 size={21} className="text-[#ccff00]" />
                  <p className="mt-4 text-2xl font-black">{workout.reps}</p>
                  <p className="mt-1 text-xs text-gray-500">Reps / target</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 p-4">
                <div className="flex items-start gap-3">
                  <Dumbbell
                    size={20}
                    className="mt-0.5 shrink-0 text-[#ccff00]"
                  />
                  <div>
                    <p className="text-sm font-semibold">Required Equipment</p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      {workout.equipment}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Client-side actions */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-[#15171d] p-5 sm:p-6">
              <h2 className="text-lg font-bold">Your Workout Plan</h2>
              <p className="mb-5 mt-2 text-sm leading-6 text-gray-400">
                Add this workout to today's plan or save it for later.
              </p>

              <WorkoutActions workout={workout} />

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Your plan is saved in this browser using localStorage.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
