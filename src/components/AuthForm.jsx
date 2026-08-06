import React from 'react'
import { registerUser, loginUser, saveToken } from '../services/auth'

export default function AuthForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(formData) {
    setError('')
    try {
      const data = isRegister
        ? await registerUser(formData.get('name'), formData.get('email'), formData.get('password'))
        : await loginUser(formData.get('email'), formData.get('password'))
      saveToken(data.token)
      onLoginSuccess(data.user)
    } catch (err) { setError(err.message) }
  }

  const inputStyle = "w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"

  return (
    <div className="mx-auto my-12 max-w-sm rounded-2xl border border-slate-700/60 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md text-slate-100">
      <h2 className="mb-4 text-center text-xl font-bold">{isRegister ? 'Register' : 'Login'}</h2>
      <form action={handleSubmit} className="space-y-3">
        {isRegister && <input type="text" name="name" placeholder="Name" required className={inputStyle} />}
        <input type="email" name="email" placeholder="Email" required className={inputStyle} />
        <input type="password" name="password" placeholder="Password" required className={inputStyle} />
        <button className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 font-semibold text-white shadow-md hover:opacity-90">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      {error && <p className="mt-3 text-center text-xs text-red-400">{error}</p>}
      <button onClick={() => setIsRegister(!isRegister)} className="mt-4 w-full text-center text-xs text-amber-400 hover:underline">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  )
}