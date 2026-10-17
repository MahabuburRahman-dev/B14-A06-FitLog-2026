"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-extrabold uppercase">
        Something went wrong
      </h1>

      <p className="mt-4 text-sm leading-6 text-[#a3a6b2]">
        We could not load the workouts. Please try again.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-[#101108] hover:bg-[#b9eb00]"
      >
        Try again
      </button>
    </main>
  );
}
