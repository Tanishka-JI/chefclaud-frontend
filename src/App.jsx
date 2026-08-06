import React from 'react'
import Header from "./components/Header"
import Main from "./components/Main"
import AuthForm from './components/AuthForm'
import SavedRecipes from './components/SavedRecipes'
import { getToken, removeToken } from './services/auth'

export default function App() {
  const [user, setUser] = React.useState(null)
  const [view, setView] = React.useState('generate')
  
  React.useEffect(() => { if (getToken()) setUser({ loggedIn: true }) }, [])

  const navBtn = (active) => `px-3 py-1.5 rounded-lg text-xs font-medium transition ${active ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'}`

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-fixed bg-slate-950/80 bg-blend-darken backdrop-blur-sm text-slate-100 font-sans">
      {!user ? (
        <div className="flex min-h-screen items-center justify-center p-4"><AuthForm onLoginSuccess={setUser} /></div>
      ) : (
        <>
          <Header />
          <nav className="flex justify-center gap-2 p-3">
            <button onClick={() => setView('generate')} className={navBtn(view === 'generate')}>🍳 Generate</button>
            <button onClick={() => setView('saved')} className={navBtn(view === 'saved')}>📖 Saved</button>
            <button onClick={() => { removeToken(); setUser(null) }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">Logout</button>
          </nav>
          {view === 'generate' ? <Main /> : <SavedRecipes />}
        </>
      )}
    </div>
  )
}