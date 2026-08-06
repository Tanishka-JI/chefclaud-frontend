import React from 'react'
import { getMyRecipes, deleteRecipe } from '../services/recipe'
import ClaudeRecipe from './ClaudeRecipe'

export default function SavedRecipes() {
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    getMyRecipes()
      .then((data) => setRecipes(data.recipes))
      .catch(() => setError('Failed to load recipes'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    try {
      await deleteRecipe(id)
      setRecipes((prev) => prev.filter((r) => r._id !== id))
    } catch { setError('Failed to delete') }
  }

  if (loading) return <p className="py-8 text-center text-slate-400">Loading...</p>
  if (error) return <p className="py-8 text-center text-red-400">{error}</p>
  if (!recipes.length) return <p className="py-8 text-center text-slate-400">No saved recipes yet.</p>

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-100">📖 Saved Recipes</h2>
      {recipes.map((r) => (
        <div key={r._id} className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg backdrop-blur-md">
          <p className="mb-2 text-xs text-amber-400"><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
          <ClaudeRecipe recipe={r.recipeText} />
          <button onClick={() => handleDelete(r._id)} className="mt-2 rounded bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
            Delete
          </button>
        </div>
      ))}
    </div>
  )}