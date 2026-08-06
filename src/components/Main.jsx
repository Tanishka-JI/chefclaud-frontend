import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { saveRecipe } from '../services/recipe'
import { getRecipeFromMistral } from "../ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState("")

  async function getRecipe() { setRecipe(await getRecipeFromMistral(ingredients)) }

  function addIngredient(formData) {
    const ing = formData.get("ingredient")
    if (ing) setIngredients((prev) => [...prev, ing])
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <form action={addIngredient} className="flex gap-2">
        <input name="ingredient" required placeholder="e.g. oregano" className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
        <button className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 font-semibold text-white shadow-md">+ Add</button>
      </form>

      {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
      {recipe && (
        <>
          <ClaudeRecipe recipe={recipe} />
          <button onClick={() => saveRecipe(ingredients, recipe).then(() => alert('Recipe saved!'))} className="w-full rounded-xl bg-emerald-600 py-2.5 font-semibold text-white shadow-md hover:bg-emerald-700">
            💾 Save Recipe
          </button>
        </>
      )}
    </main>
  )
}