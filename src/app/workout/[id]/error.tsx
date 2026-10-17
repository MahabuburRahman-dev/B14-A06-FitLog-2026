"use client";

export default function WorkoutDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#0d0e12] px-4 text-center text-white">
      <h1 className="text-3xl font-black uppercase">Unable to Load Workout</h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
        Something went wrong while loading this workout. Check your internet
        connection and try again.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-[#111] hover:bg-[#b9eb00]"
      >
        Try Again
      </button>
    </div>
  );
}
