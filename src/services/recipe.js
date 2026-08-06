// src/services/recipes.js
import { getToken } from './auth'

const BASE_URL = 'http://localhost:5000/api/v1'

export async function saveRecipe(ingredients, recipeText) {
  const response = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ingredients, recipeText }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.msg || 'Failed to save recipe')
  return data
}

export async function getMyRecipes() {
  const response = await fetch(`${BASE_URL}/recipes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.msg || 'Failed to fetch recipes')
  return data
}

export async function deleteRecipe(id) {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.msg || 'Failed to delete recipe')
  return data
}