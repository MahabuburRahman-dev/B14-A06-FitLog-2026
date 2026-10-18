import type { Workout } from "@/lib/types";

export const PLAN_KEY = "fitlog-plan";
export const SAVED_KEY = "fitlog-saved";
export const COMPLETED_KEY = "fitlog-completed";
export const MAX_PLAN_ITEMS = 5;

export const STORAGE_EVENT = "fitlog-storage";

export function notifyStorageChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

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

export function writeWorkoutList(key: string, workouts: Workout[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(workouts));
    notifyStorageChanged();
  } catch {
    throw new Error("Could not save workouts in browser storage.");
  }
}

export function readCompletedIds(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) return [];

    const data: unknown = JSON.parse(raw);

    if (!Array.isArray(data)) return [];

    return data.filter(
      (id): id is number => typeof id === "number" && Number.isSafeInteger(id),
    );
  } catch {
    return [];
  }
}

export function writeCompletedIds(ids: number[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([...new Set(ids)]));
    notifyStorageChanged();
  } catch {
    throw new Error("Could not save completed workouts.");
  }
}
