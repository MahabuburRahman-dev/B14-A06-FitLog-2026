"use client";
import type { Workout } from "@/lib/types";
import { BookmarkCheck, CalendarPlus } from "lucide-react";
import { useFitLog } from "./store";
export default function DetailActions({ workout }: { workout: Workout }) {
  const { plan, saved, addPlan, addSaved } = useFitLog();
  const inPlan = plan.some((w) => w.id === workout.id);
  const isSaved = saved.some((w) => w.id === workout.id);
  return (
    <div className="detail-actions">
      <button
        className="button button-primary"
        onClick={() => addPlan(workout)}
        disabled={inPlan || (plan.length >= 5 && !inPlan)}
      >
        <CalendarPlus size={17} />
        {inPlan ? "Already in plan" : "Add to today’s plan"}
      </button>
      <button
        className="button button-secondary"
        onClick={() => addSaved(workout)}
      >
        <BookmarkCheck size={17} />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
