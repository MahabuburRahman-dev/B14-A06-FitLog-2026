import type { Difficulty, Workout } from "./types";

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// Check whether a value is a plain object.
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Check the workout difficulty.
function isDifficulty(value: unknown): value is Difficulty {
  return (
    value === "Beginner" || value === "Intermediate" || value === "Advanced"
  );
}

// Validate data received from the API.
function isWorkout(value: unknown): value is Workout {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.image === "string" &&
    Array.isArray(value.muscleGroups) &&
    value.muscleGroups.every((item: unknown) => typeof item === "string") &&
    typeof value.equipment === "string" &&
    isDifficulty(value.difficulty) &&
    typeof value.duration === "number" &&
    typeof value.caloriesBurned === "number" &&
    typeof value.sets === "number" &&
    typeof value.reps === "string" &&
    typeof value.rating === "number" &&
    typeof value.description === "string" &&
    Array.isArray(value.instructions) &&
    value.instructions.every((item: unknown) => typeof item === "string")
  );
}

// Unwrap either a direct response or a { data: ... } response.
function unwrapResponse(payload: unknown): unknown {
  if (isRecord(payload) && "data" in payload) {
    return payload.data;
  }

  return payload;
}

// Fetch all workouts.
export async function fetchWorkouts(): Promise<Workout[]> {
  let response: Response;

  try {
    response = await fetch(API_BASE_URL, {
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Unable to connect to the workout API. Check your internet connection.",
    );
  }

  if (!response.ok) {
    throw new Error(`Failed to load workouts. HTTP status: ${response.status}`);
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error("The workout API returned invalid JSON.");
  }

  const data = unwrapResponse(payload);

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response: expected a list of workouts.");
  }

  if (!data.every(isWorkout)) {
    throw new Error(
      "Invalid workout data: one or more fields are missing or incorrect.",
    );
  }

  return data;
}

// Fetch one workout by ID.
// Returns null when the workout does not exist.
export async function fetchWorkoutById(id: number): Promise<Workout | null> {
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/${id}`, {
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Unable to connect to the workout API. Check your internet connection.",
    );
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to load workout ${id}. HTTP status: ${response.status}`,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error("The workout API returned invalid JSON.");
  }

  const data = unwrapResponse(payload);

  // Some APIs return a single object; others return a one-item array.
  const workout = Array.isArray(data) ? data[0] : data;

  if (!isWorkout(workout)) {
    throw new Error("Invalid workout details returned by the API.");
  }

  return workout;
}
