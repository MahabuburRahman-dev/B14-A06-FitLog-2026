import DetailActions from "@/components/DetailActions";
import type { Workout } from "@/lib/types";
import { fallbackWorkouts, getWorkouts } from "@/lib/workouts";
import { ChevronLeft, Clock3, Dumbbell, Flame, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let workouts: Workout[] = fallbackWorkouts;
  try {
    const data = await getWorkouts();
    if (data.length) workouts = data;
  } catch {}
  const workout = workouts.find((w) => w.id === id);
  if (!workout) return notFound();
  return (
    <div className="detail-page">
      <Link href="/" className="back-link">
        <ChevronLeft size={17} /> BACK TO LIBRARY
      </Link>
      <div className="detail-grid">
        <div className="detail-visual">
          <img src={workout.image} alt={workout.name} />
          <div className="visual-caption">
            <Dumbbell size={17} /> FITLOG / EXERCISE GUIDE
          </div>
        </div>
        <div className="detail-content">
          <p className="eyebrow">EXERCISE BREAKDOWN</p>
          <h1>{workout.name}</h1>
          <p className="detail-description">{workout.description}</p>
          <div className="tags detail-tags">
            {workout.categories.map((c) => (
              <span className="tag" key={c}>
                {c}
              </span>
            ))}
          </div>
          <div className="spec-panel">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", String(workout.sets)],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.calories} kcal`],
              ["RATING", workout.rating.toFixed(1)],
            ].map(([k, v]) => (
              <div className="spec-row" key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <div className="instructions">
            <h2>INSTRUCTIONS</h2>
            <ol>
              {workout.instructions.map((step, i) => (
                <li key={i}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <DetailActions workout={workout} />
          <div className="detail-mini-stats">
            <span>
              <Clock3 />
              {workout.duration} MIN
            </span>
            <span>
              <Flame />
              {workout.calories} KCAL
            </span>
            <span>
              <Star />
              {workout.rating.toFixed(1)} RATING
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
