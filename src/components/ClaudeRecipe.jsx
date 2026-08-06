import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe({ recipe }) {
  return (
    <section className="my-4 rounded-2xl border border-amber-500/20 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      <h2 className="mb-3 border-b border-slate-800 pb-2 text-lg font-bold text-amber-400">✨ Chef Claude Recommends:</h2>
      <div className="prose prose-invert max-w-none prose-headings:text-amber-300 prose-li:marker:text-amber-500">
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </div>
    </section>
  )
}