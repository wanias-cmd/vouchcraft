import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">
        Vouch<span className="text-emerald-400">craft</span>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm">
              Dashboard
            </Link>
            <Link to="/profile" className="text-slate-300 hover:text-white text-sm">
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-300 hover:text-white text-sm border border-slate-700 rounded-lg px-3 py-1.5"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-slate-300 hover:text-white text-sm">
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-1.5 rounded-lg"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}