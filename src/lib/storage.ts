import type { Workout } from "@/lib/types";

export const PLAN_KEY = "fitlog-plan";
export const SAVED_KEY = "fitlog-saved";
export const MAX_PLAN_ITEMS = 5;

export function readWorkoutList(key: string): Workout[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(key);

    if (!raw) return [];

    const data: unknown = JSON.parse(raw);

    if (!Array.isArray(data)) return [];

    return data.filter(
      (item): item is Workout =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "number" &&
        "name" in item &&
        typeof item.name === "string",
    );
  } catch {
    return [];
  }
}

export function writeWorkoutList(key: string, workouts: Workout[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(workouts));
  } catch {
    throw new Error(
      "Could not save your workouts. Check browser storage settings.",
    );
  }
}
