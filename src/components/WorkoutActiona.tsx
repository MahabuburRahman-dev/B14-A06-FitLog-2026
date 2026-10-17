"use client";

import { Bookmark, CalendarPlus, Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import {
  MAX_PLAN_ITEMS,
  PLAN_KEY,
  SAVED_KEY,
  readWorkoutList,
  writeWorkoutList,
} from "@/lib/storage";
import type { Workout } from "@/lib/types";

type WorkoutActionsProps = {
  workout: Workout;
};

type ToastMessage = {
  id: number;
  text: string;
  type: "success" | "error";
};

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState<"plan" | "saved" | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const plan = readWorkoutList(PLAN_KEY);
    const saved = readWorkoutList(SAVED_KEY);

    setPlanIds(plan.map((item) => item.id));
    setSavedIds(saved.map((item) => item.id));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function showToast(text: string, type: "success" | "error") {
    setToast({ id: Date.now(), text, type });
  }

  function addToPlan() {
    setBusy("plan");

    try {
      const current = readWorkoutList(PLAN_KEY);

      if (current.some((item) => item.id === workout.id)) {
        setPlanIds(current.map((item) => item.id));
        showToast("This workout is already in your plan.", "error");
        return;
      }

      if (current.length >= MAX_PLAN_ITEMS) {
        setPlanIds(current.map((item) => item.id));
        showToast("Your plan can contain up to 5 workouts.", "error");
        return;
      }

      const updated = [...current, workout];
      writeWorkoutList(PLAN_KEY, updated);

      setPlanIds(updated.map((item) => item.id));
      showToast("Added to today's plan!", "success");
    } catch {
      showToast("Could not save your plan. Please try again.", "error");
    } finally {
      setBusy(null);
    }
  }

  function toggleSaved() {
    setBusy("saved");

    try {
      const current = readWorkoutList(SAVED_KEY);
      const alreadySaved = current.some((item) => item.id === workout.id);

      const updated = alreadySaved
        ? current.filter((item) => item.id !== workout.id)
        : [...current, workout];

      writeWorkoutList(SAVED_KEY, updated);

      setSavedIds(updated.map((item) => item.id));

      showToast(
        alreadySaved ? "Removed from saved workouts." : "Saved for later!",
        "success",
      );
    } catch {
      showToast("Could not update saved workouts.", "error");
    } finally {
      setBusy(null);
    }
  }

  const isInPlan = planIds.includes(workout.id);
  const isSaved = savedIds.includes(workout.id);

  return (
    <div className="relative">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addToPlan}
          disabled={!ready || busy !== null || isInPlan}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-4 text-sm font-bold text-[#111] transition hover:bg-[#b9eb00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === "plan" ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : isInPlan ? (
            <Check size={18} />
          ) : (
            <CalendarPlus size={18} />
          )}

          {isInPlan ? "Added to Today's Plan" : "Add to Today's Plan"}
        </button>

        <button
          type="button"
          onClick={toggleSaved}
          disabled={!ready || busy !== null}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-4 text-sm font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === "saved" ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : isSaved ? (
            <Check size={18} />
          ) : (
            <Bookmark size={18} />
          )}

          {isSaved ? "Saved — Remove" : "Save for Later"}
        </button>
      </div>

      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 left-1/2 z-[100] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl border px-5 py-4 text-sm font-semibold shadow-2xl ${
            toast.type === "success"
              ? "border-[#ccff00]/30 bg-[#1a2110] text-[#ccff00]"
              : "border-rose-500/30 bg-[#281419] text-rose-300"
          }`}
        >
          {toast.type === "success" ? (
            <Check size={18} />
          ) : (
            <span aria-hidden="true">!</span>
          )}
          {toast.text}
        </div>
      )}
    </div>
  );
}
