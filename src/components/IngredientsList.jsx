export default function IngredientsList({ ingredients, getRecipe }) {
  return (
    <section className="my-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
      <h2 className="mb-3 font-bold text-slate-100">🥗 Ingredients on hand:</h2>
      <ul className="mb-4 flex flex-wrap gap-2">
        {ingredients.map((ing) => (
          <li key={ing} className="rounded-lg bg-slate-800/80 px-3 py-1 text-xs text-slate-200 border border-slate-700">{ing}</li>
        ))}
      </ul>
      {ingredients.length > 3 && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <div>
            <h3 className="text-sm font-semibold text-amber-300">Ready for a recipe?</h3>
            <p className="text-xs text-slate-400">Generate a recipe from your list.</p>
          </div>
          <button onClick={getRecipe} className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-md">
            Get Recipe ✨
          </button>
        </div>
      )}
    </section>
  )
}