# ChefClaud — Frontend

A React (Vite) app where users type in ingredients, get an AI-generated recipe, and — once logged in — can save, view, and delete their favorite recipes.

## Features

- Register / login forms with token-based session persistence (localStorage)
- Generate a recipe from a list of typed ingredients
- Save recipes to your account
- View and delete your saved recipes
- Talks to a separate Node/Express backend for all data and AI calls — no API keys live in the frontend

## Tech Stack

- React (Vite)
- Vanilla `fetch` for all API calls (no axios/query library)
- localStorage for storing the JWT token

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Header.jsx
│   ├── Main.jsx            # ingredient input + recipe generation
│   ├── IngredientsList.jsx # displays added ingredients, triggers generation
│   ├── ClaudeRecipe.jsx    # renders the recipe text
│   ├── AuthForm.jsx        # login / register form
│   └── SavedRecipes.jsx    # list of the user's saved recipes
├── services/
│   ├── auth.js             # register/login calls + token storage helpers
│   └── recipe.js          # save / get / delete recipe calls
├── ai.js                    # calls the backend's /recipes/generate route
├── App.jsx                  # top-level: auth gate + view switching
├── App.css
├── index.css
└── main.jsx
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure the [ChefClaud backend](#) is running locally on `http://localhost:5000` (or update `BASE_URL` in `src/ai.js`, `src/services/auth.js`, and `src/services/recipes.js` to match your backend's address).

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the printed URL (usually `http://localhost:5173`) in your browser.

## How it works

1. **Not logged in** → `App.jsx` shows only `AuthForm`. Register or log in; on success the returned JWT is saved to `localStorage` and the app unlocks.
2. **Generate a recipe** → `Main.jsx` collects ingredients, calls `ai.js`, which POSTs to the backend's public `/recipes/generate` route and displays the result via `ClaudeRecipe`.
3. **Save a recipe** → calls `services/recipes.js`'s `saveRecipe`, which attaches the saved token as an `Authorization: Bearer <token>` header so the backend can tie it to your account.
4. **View saved recipes** → `SavedRecipes.jsx` fetches your recipes on load (`useEffect`) and lets you delete any of them.
5. **Logout** → clears the token from `localStorage` and returns to the login screen.

## Environment notes

- No `.env` file is required on the frontend — the Hugging Face API key lives **only** in the backend's `.env`, never exposed to the browser.
- `BASE_URL` (`http://localhost:5000/api/v1`) is currently hardcoded in each service file. When deploying, update these to your deployed backend's URL.

## Known gaps / next steps

- No token-expiry check — an expired token will just cause failed requests, not an automatic logout prompt yet
