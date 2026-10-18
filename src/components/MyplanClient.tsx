"use client";

import {
  ArrowRight,
  Bookmark,
  CalendarCheck,
  Check,
  Circle,
  CircleCheck,
  Clock3,
  Flame,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  MAX_PLAN_ITEMS,
  PLAN_KEY,
  SAVED_KEY,
  STORAGE_EVENT,
  readCompletedIds,
  readWorkoutList,
  writeCompletedIds,
  writeWorkoutList,
} from "@/lib/storage";
import type { Workout } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlanClient() {
  const [tab, setTab] = useState<Tab>("plan");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const refreshData = useCallback(() => {
    setPlan(readWorkoutList(PLAN_KEY));
    setSaved(readWorkoutList(SAVED_KEY));
    setCompleted(readCompletedIds());
  }, []);

  useEffect(() => {
    refreshData();
    setReady(true);

    function handleStorageChange() {
      refreshData();
    }

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshData]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast(message);
    setToastType(type);
  }

  function markDone(workout: Workout) {
    setBusyId(workout.id);

    try {
      const next = completed.includes(workout.id)
        ? completed.filter((id) => id !== workout.id)
        : [...completed, workout.id];

      writeCompletedIds(next);
      setCompleted(next);

      showToast(
        next.includes(workout.id)
          ? `${workout.name} marked as done!`
          : `${workout.name} marked as not done.`,
      );
    } catch {
      showToast("Could not update completion status.", "error");
    } finally {
      setBusyId(null);
    }
  }

  function removeFromPlan(workout: Workout) {
    try {
      const updated = plan.filter((item) => item.id !== workout.id);
      writeWorkoutList(PLAN_KEY, updated);
      setPlan(updated);

      // Remove its completion status too.
      const nextCompleted = completed.filter((id) => id !== workout.id);
      writeCompletedIds(nextCompleted);
      setCompleted(nextCompleted);

      showToast("Workout removed from today's plan.");
    } catch {
      showToast("Could not remove workout.", "error");
    }
  }

  function removeSaved(workout: Workout) {
    try {
      const updated = saved.filter((item) => item.id !== workout.id);
      writeWorkoutList(SAVED_KEY, updated);
      setSaved(updated);
      showToast("Workout removed from saved list.");
    } catch {
      showToast("Could not remove saved workout.", "error");
    }
  }

  function addSavedToPlan(workout: Workout) {
    try {
      const current = readWorkoutList(PLAN_KEY);

      if (current.some((item) => item.id === workout.id)) {
        setPlan(current);
        showToast("This workout is already in your plan.", "error");
        return;
      }

      if (current.length >= MAX_PLAN_ITEMS) {
        showToast("Your plan can contain up to 5 workouts.", "error");
        return;
      }

      const updated = [...current, workout];
      writeWorkoutList(PLAN_KEY, updated);
      setPlan(updated);
      showToast("Added to today's plan!");
    } catch {
      showToast("Could not update your plan.", "error");
    }
  }

  const totalDuration = plan.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (sum, workout) => sum + workout.caloriesBurned,
    0,
  );

  const completedCount = plan.filter((workout) =>
    completed.includes(workout.id),
  ).length;

  const visibleWorkouts = tab === "plan" ? plan : saved;

  if (!ready) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#0d0e12] text-white">
        <LoaderCircle className="animate-spin text-[#ccff00]" size={34} />
        <p className="mt-4 text-sm text-gray-400">Loading your plan...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          Your fitness dashboard
        </p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase sm:text-4xl">
              My Plan<span className="text-[#ccff00]">.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Organize your training, track completed workouts, and keep your
              next sessions ready.
            </p>
          </div>

          <Link
            href="/#library"
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-[#111] transition hover:bg-[#b9eb00] sm:self-auto"
          >
            Browse Workouts <ArrowRight size={17} />
          </Link>
        </div>

        {/* Metrics */}
        <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Planned Workouts"
            value={`${plan.length}/${MAX_PLAN_ITEMS}`}
            icon={<CalendarCheck size={20} />}
          />
          <Metric
            label="Completed"
            value={`${completedCount}/${plan.length}`}
            icon={<Check size={20} />}
          />
          <Metric
            label="Total Duration"
            value={`${totalDuration} min`}
            icon={<Clock3 size={20} />}
          />
          <Metric
            label="Estimated Calories"
            value={`${totalCalories} kcal`}
            icon={<Flame size={20} />}
          />
        </section>

        {/* Tabs */}
        <div className="mt-10 flex gap-2 border-b border-white/10">
          <button
            type="button"
            onClick={() => setTab("plan")}
            aria-pressed={tab === "plan"}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-bold transition ${
              tab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <CalendarCheck size={17} />
            Today's Plan
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {plan.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab("saved")}
            aria-pressed={tab === "saved"}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-bold transition ${
              tab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Bookmark size={17} />
            Saved
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {saved.length}
            </span>
          </button>
        </div>

        {/* Workout list */}
        {visibleWorkouts.length > 0 ? (
          <section className="mt-6 grid gap-4">
            {visibleWorkouts.map((workout) => {
              const isDone = completed.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className="grid gap-4 rounded-2xl border border-white/10 bg-[#15171d] p-4 transition hover:border-white/20 sm:grid-cols-[140px_1fr] sm:p-5"
                >
                  <Link
                    href={`/workout/${workout.id}`}
                    className="block overflow-hidden rounded-xl bg-[#20232b]"
                  >
                    <img
                      src={workout.image}
                      alt={workout.name}
                      loading="lazy"
                      className="h-44 w-full object-cover transition hover:scale-[1.02] sm:h-full sm:min-h-36"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-gray-400">
                          {workout.difficulty}
                        </span>

                        {tab === "plan" && isDone && (
                          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>

                      <Link href={`/workout/${workout.id}`}>
                        <h2
                          className={`mt-3 text-xl font-bold hover:text-[#ccff00] ${
                            isDone && tab === "plan" ? "text-gray-400" : ""
                          }`}
                        >
                          {workout.name}
                        </h2>
                      </Link>

                      <p className="mt-2 text-sm text-gray-400">
                        {workout.equipment}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={15} className="text-[#ccff00]" />
                          {workout.duration} min
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Flame size={15} className="text-[#ccff00]" />
                          {workout.caloriesBurned} kcal
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Bookmark size={15} className="text-[#ccff00]" />
                          {workout.sets} sets · {workout.reps}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2.5 text-xs font-bold hover:border-[#ccff00] hover:text-[#ccff00]"
                      >
                        View Details <ArrowRight size={15} />
                      </Link>

                      {tab === "plan" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => markDone(workout)}
                            disabled={busyId === workout.id}
                            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-bold transition ${
                              isDone
                                ? "border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
                                : "bg-[#ccff00] text-[#111] hover:bg-[#b9eb00]"
                            }`}
                          >
                            {isDone ? (
                              <CircleCheck size={15} />
                            ) : (
                              <Circle size={15} />
                            )}
                            {isDone ? "Mark as Not Done" : "Mark as Done"}
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromPlan(workout)}
                            aria-label={`Remove ${workout.name} from today's plan`}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/20 px-3.5 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-400/10"
                          >
                            <Trash2 size={15} /> Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => addSavedToPlan(workout)}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-3.5 py-2.5 text-xs font-bold text-[#111] hover:bg-[#b9eb00]"
                          >
                            <CalendarCheck size={15} />
                            Add to Plan
                          </button>

                          <button
                            type="button"
                            onClick={() => removeSaved(workout)}
                            aria-label={`Remove ${workout.name} from saved workouts`}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-400/20 px-3.5 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-400/10"
                          >
                            <Trash2 size={15} /> Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-white/15 px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ccff00]/10 text-[#ccff00]">
              {tab === "plan" ? (
                <CalendarCheck size={27} />
              ) : (
                <Bookmark size={27} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">
              {tab === "plan" ? "Your plan is empty" : "No saved workouts yet"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              {tab === "plan"
                ? "Explore the workout library and add up to five workouts to your plan."
                : "Save a workout from its detail page to find it here later."}
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-[#111] hover:bg-[#b9eb00]"
            >
              Browse Workouts <ArrowRight size={17} />
            </Link>
          </section>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 left-1/2 z-[100] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl border px-5 py-4 text-sm font-semibold shadow-2xl ${
            toastType === "success"
              ? "border-[#ccff00]/30 bg-[#1a2110] text-[#ccff00]"
              : "border-rose-500/30 bg-[#281419] text-rose-300"
          }`}
        >
          {toastType === "success" ? <Check size={18} /> : "!"}
          {toast}
        </div>
      )}
    </main>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15171d] p-4 sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
        {icon}
      </div>
      <p className="mt-4 break-words text-xl font-black sm:text-2xl">{value}</p>
      <p className="mt-1 text-xs leading-5 text-gray-400 sm:text-sm">{label}</p>
    </div>
  );
}
