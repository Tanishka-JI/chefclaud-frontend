export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-2xl font-extrabold text-transparent">
          👨‍🍳 Chef Claude
        </h1>
        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400 ring-1 ring-amber-500/20">AI Assistant</span>
      </div>
    </header>
  )
}