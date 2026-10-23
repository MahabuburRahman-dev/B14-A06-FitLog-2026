import type { Workout } from "./types";
export const API_URL = "https://api.abcz.workers.dev/api/fitlog";
const fallbackImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85";
const sample: Workout[] = [
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    description:
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    categories: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    duration: 25,
    calories: 180,
    rating: 4.8,
    image: fallbackImage,
    instructions: [
      "Lie on the bench with eyes under the bar and feet planted.",
      "Unrack with locked elbows and lower the bar to mid-chest.",
      "Press up in a slight arc until elbows lock without bouncing.",
      "Keep shoulder blades pinched and a natural arch in the back.",
    ],
  },
  {
    id: "pull-up",
    name: "Pull-Up",
    description:
      "A bodyweight pull that builds upper-back strength and strong arms.",
    categories: ["Back", "Arms"],
    equipment: "Pull-up Bar",
    difficulty: "Intermediate",
    sets: 3,
    reps: "8-10",
    duration: 15,
    calories: 120,
    rating: 4.7,
    image: fallbackImage,
    instructions: [
      "Grip the bar slightly wider than shoulder width.",
      "Start from a controlled hang with your core braced.",
      "Pull your chest toward the bar without swinging.",
      "Lower slowly to the starting position.",
    ],
  },
  {
    id: "back-squat",
    name: "Back Squat",
    description:
      "A foundational lower-body lift for building leg strength and stability.",
    categories: ["Legs", "Core"],
    equipment: "Barbell, Rack",
    difficulty: "Advanced",
    sets: 4,
    reps: "6-8",
    duration: 30,
    calories: 240,
    rating: 4.9,
    image: fallbackImage,
    instructions: [
      "Set the bar across your upper back and brace your core.",
      "Stand with feet about shoulder-width apart.",
      "Sit down between your hips while keeping your chest lifted.",
      "Drive through your feet to stand tall.",
    ],
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    description:
      "A standing press that develops shoulder strength and trunk stability.",
    categories: ["Shoulders", "Arms"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    sets: 3,
    reps: "8-10",
    duration: 20,
    calories: 150,
    rating: 4.6,
    image: fallbackImage,
    instructions: [
      "Hold the bar at upper-chest height.",
      "Brace your abs and glutes before pressing.",
      "Press the bar overhead while moving your head out of the way.",
      "Lower the bar under control to your shoulders.",
    ],
  },
  {
    id: "bicep-curl",
    name: "Dumbbell Bicep Curl",
    description:
      "An isolation exercise targeting the biceps through a controlled range of motion.",
    categories: ["Arms"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    duration: 12,
    calories: 80,
    rating: 4.3,
    image: fallbackImage,
    instructions: [
      "Stand tall with a dumbbell in each hand.",
      "Keep elbows close to your sides.",
      "Curl the weights without swinging your torso.",
      "Lower slowly until your arms are extended.",
    ],
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    description: "A neutral-grip curl that works the biceps and forearms.",
    categories: ["Arms"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    duration: 12,
    calories: 80,
    rating: 4.3,
    image: fallbackImage,
    instructions: [
      "Hold dumbbells at your sides with palms facing inward.",
      "Keep shoulders relaxed and elbows tucked in.",
      "Curl the weights toward your shoulders.",
      "Lower with control and repeat.",
    ],
  },
  {
    id: "plank",
    name: "Hollow-Body Plank",
    description:
      "A core stability drill that builds bracing strength and body control.",
    categories: ["Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    sets: 3,
    reps: "30-45 sec",
    duration: 10,
    calories: 60,
    rating: 4.4,
    image: fallbackImage,
    instructions: [
      "Place forearms on the floor and extend your legs.",
      "Brace your abs and squeeze your glutes.",
      "Keep your body in a straight line.",
      "Breathe steadily without letting your hips sag.",
    ],
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    description: "A full-body hinge that develops posterior-chain strength.",
    categories: ["Back", "Legs"],
    equipment: "Barbell",
    difficulty: "Advanced",
    sets: 4,
    reps: "5-6",
    duration: 28,
    calories: 260,
    rating: 4.9,
    image: fallbackImage,
    instructions: [
      "Stand with the bar over the middle of your feet.",
      "Hinge down and grip the bar just outside your legs.",
      "Brace and push the floor away as you stand.",
      "Lower the bar by hinging your hips back.",
    ],
  },
  {
    id: "push-up",
    name: "Push-Up",
    description:
      "A versatile bodyweight press for chest, shoulders, triceps, and core.",
    categories: ["Chest", "Arms", "Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    sets: 3,
    reps: "12-15",
    duration: 10,
    calories: 90,
    rating: 4.5,
    image: fallbackImage,
    instructions: [
      "Place hands just wider than shoulder width.",
      "Keep your body in a straight line.",
      "Lower your chest toward the floor.",
      "Push back up without letting your hips sag.",
    ],
  },
  {
    id: "walking-lunge",
    name: "Walking Lunge",
    description:
      "A single-leg movement that trains balance and lower-body strength.",
    categories: ["Legs"],
    equipment: "Dumbbells (optional)",
    difficulty: "Intermediate",
    sets: 3,
    reps: "10 each leg",
    duration: 18,
    calories: 170,
    rating: 4.4,
    image: fallbackImage,
    instructions: [
      "Stand tall with feet hip-width apart.",
      "Step forward and lower until both knees bend.",
      "Keep your front knee aligned with your foot.",
      "Push through the front foot and step into the next lunge.",
    ],
  },
  {
    id: "russian-twist",
    name: "Russian Twist",
    description: "A rotational core exercise for trunk control and endurance.",
    categories: ["Core"],
    equipment: "Medicine Ball",
    difficulty: "Beginner",
    sets: 3,
    reps: "20 total",
    duration: 8,
    calories: 70,
    rating: 4.1,
    image: fallbackImage,
    instructions: [
      "Sit with knees bent and lean back slightly.",
      "Brace your core and keep your chest lifted.",
      "Rotate your torso from side to side.",
      "Move smoothly without pulling on your neck.",
    ],
  },
  {
    id: "shoulder-fly",
    name: "Dumbbell Lateral Raise",
    description: "A focused shoulder exercise that targets the side deltoids.",
    categories: ["Shoulders"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    sets: 3,
    reps: "12-15",
    duration: 14,
    calories: 95,
    rating: 4.5,
    image: fallbackImage,
    instructions: [
      "Stand with dumbbells at your sides.",
      "Keep a soft bend in your elbows.",
      "Raise your arms out to shoulder height.",
      "Lower slowly without swinging.",
    ],
  },
];
const first = (o: any, keys: string[], fallback: any = undefined) => {
  for (const k of keys)
    if (o?.[k] !== undefined && o?.[k] !== null) return o[k];
  return fallback;
};
const list = (v: any): any[] => (Array.isArray(v) ? v : []);
function normalize(item: any, index: number): Workout {
  const categories = first(
    item,
    ["categories", "category", "muscleGroups", "muscle_groups", "tags"],
    ["Full Body"],
  );
  const instructions = first(
    item,
    ["instructions", "steps", "directions"],
    sample[index % sample.length].instructions,
  );
  const rawImage = first(
    item,
    ["image", "imageUrl", "image_url", "thumbnail", "photo", "img"],
    fallbackImage,
  );
  return {
    id: String(
      first(
        item,
        ["id", "_id", "slug"],
        sample[index % sample.length].id +
          (index >= sample.length ? `-${index}` : ""),
      ),
    ),
    name: String(
      first(
        item,
        ["name", "title", "workoutName", "workout_name"],
        sample[index % sample.length].name,
      ),
    ),
    description: String(
      first(
        item,
        ["description", "summary"],
        sample[index % sample.length].description,
      ),
    ),
    categories: (Array.isArray(categories)
      ? categories
      : String(categories).split(/[,|]/)
    ).map((x: any) =>
      String(typeof x === "object" ? (x.name ?? x.title ?? "Workout") : x),
    ),
    equipment: String(
      first(
        item,
        ["equipment", "equipmentName", "equipment_name"],
        sample[index % sample.length].equipment,
      ),
    ),
    difficulty: String(first(item, ["difficulty", "level"], "Intermediate")),
    sets: first(item, ["sets"], 4),
    reps: String(first(item, ["reps", "repRange", "rep_range"], "8-10")),
    duration:
      Number(
        first(
          item,
          ["duration", "durationMinutes", "duration_minutes", "minutes"],
          sample[index % sample.length].duration,
        ),
      ) || 0,
    calories:
      Number(
        first(
          item,
          ["calories", "kcal"],
          sample[index % sample.length].calories,
        ),
      ) || 0,
    rating:
      Number(
        first(item, ["rating", "score"], sample[index % sample.length].rating),
      ) || 0,
    image: typeof rawImage === "string" ? rawImage : fallbackImage,
    instructions: list(instructions)
      .map((x: any) =>
        String(
          typeof x === "object"
            ? (x.text ?? x.instruction ?? x.title ?? "")
            : x,
        ),
      )
      .filter(Boolean),
  };
}
export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Workout API returned ${response.status}`);
  const json = await response.json();
  const data = Array.isArray(json)
    ? json
    : first(json, ["data", "workouts", "results", "items"], []);
  if (!Array.isArray(data)) throw new Error("Unexpected workout API response");
  return data.map(normalize);
}
export { sample as fallbackWorkouts };
