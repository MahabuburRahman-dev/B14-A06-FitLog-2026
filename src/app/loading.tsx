export default function Loading() {
  return (
    <main
      aria-live="polite"
      className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4"
    >
      <div
        role="status"
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#292b33] border-t-[#ccff00]"
      />

      <p className="mt-5 text-sm text-[#a3a6b2]">Loading workouts…</p>
    </main>
  );
}
