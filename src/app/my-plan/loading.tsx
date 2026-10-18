export default function MyPlanLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center bg-[#0d0e12] text-white"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
      <p className="mt-4 text-sm text-gray-400">Loading your plan...</p>
    </main>
  );
}
