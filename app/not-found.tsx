export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-slate-400">The page you requested does not exist.</p>
      <a href="/" className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200">
        Back to home
      </a>
    </main>
  )
}
