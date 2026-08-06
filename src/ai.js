

const BASE_URL = 'https://chefclaud-backend.onrender.com/api/v1'

export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    })
    const data = await response.json()
    return data.recipe
  } catch (err) {
    console.error(err.message)
  }
}