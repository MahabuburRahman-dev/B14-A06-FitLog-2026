import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, Star, Dumbbell } from "lucide-react";
import type { Workout } from "@/lib/types";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const difficultyStyles: Record<string, string> = {
    Beginner: "bg-emerald-400/10 text-emerald-400",
    Intermediate: "bg-yellow-400/10 text-yellow-400",
    Advanced: "bg-rose-400/10 text-rose-400",
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15171d] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/60">
      {/* Workout image */}
      <Link
        href={`/workout/${workout.id}`}
        aria-label={`View ${workout.name} details`}
        className="relative block h-52 overflow-hidden bg-[#20232b]"
      >
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            difficultyStyles[workout.difficulty] ?? "bg-white/10 text-white"
          }`}
        >
          {workout.difficulty}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
          <Star size={14} className="fill-[#ccff00] text-[#ccff00]" />
          {workout.rating}
        </span>
      </Link>

      {/* Workout information */}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-gray-400"
            >
              {muscle}
            </span>
          ))}
        </div>

        <Link href={`/workout/${workout.id}`}>
          <h3 className="line-clamp-1 text-lg font-bold text-white transition group-hover:text-[#ccff00]">
            {workout.name}
          </h3>
        </Link>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
          <Dumbbell size={15} />
          <span className="line-clamp-1">{workout.equipment}</span>
        </p>

        <div className="my-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4">
          <div className="flex items-center gap-2">
            <Clock3 size={17} className="text-[#ccff00]" />
            <div>
              <p className="text-sm font-semibold text-white">
                {workout.duration} min
              </p>
              <p className="text-xs text-gray-500">Duration</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Flame size={17} className="text-[#ccff00]" />
            <div>
              <p className="text-sm font-semibold text-white">
                {workout.caloriesBurned} kcal
              </p>
              <p className="text-xs text-gray-500">Calories</p>
            </div>
          </div>
        </div>

        <Link
          href={`/workout/${workout.id}`}
          className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#ccff00] hover:text-[#111]"
        >
          View Workout
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
