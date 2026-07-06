"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center bg-[#04050F] px-4 text-white">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-400">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        className="mt-4 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  )
}
