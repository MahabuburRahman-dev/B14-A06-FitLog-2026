import Link from "next/link";
import { fetchWorkouts } from "@/lib/workouts";

export default async function HomePage() {
  const workouts = await fetchWorkouts();

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-12">
      <p className="text-sm font-bold tracking-widest text-[#ccff00]">
        WORKOUT LIBRARY
      </p>

      <h1 className="mt-3 text-4xl font-extrabold uppercase">
        Train with intent.
      </h1>

      <p className="mt-3 text-[#a3a6b2]">
        We found {workouts.length} workouts from the API.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            href={`/workout/${workout.id}`}
            className="rounded-xl border border-[#282b33] bg-[#15171d] p-5 transition hover:border-[#ccff00]"
          >
            <h2 className="font-bold uppercase">{workout.name}</h2>

            <p className="mt-2 text-sm text-[#a3a6b2]">{workout.equipment}</p>

            <p className="mt-3 text-sm text-[#ccff00]">
              {workout.duration} min · {workout.caloriesBurned} kcal
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
