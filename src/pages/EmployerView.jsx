import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getMatchingCategories } from '../utils/translator'

export default function EmployerView() {
  const [jobDescription, setJobDescription] = useState('')
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [matchedCategories, setMatchedCategories] = useState([])
  const [workers, setWorkers] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    setSearching(true)
    setSearched(true)

    const categories = getMatchingCategories(jobDescription)
    setMatchedCategories(categories)

    if (categories.length === 0) {
      setWorkers([])
      setSearching(false)
      return
    }

    const { data: receiptsData } = await supabase
      .from('skill_receipts')
      .select('*')
      .in('category', categories)

    const userIds = [...new Set((receiptsData || []).map((r) => r.user_id))]

    let profilesMap = {}
    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds)
      profilesMap = Object.fromEntries(
        (profilesData || []).map((p) => [p.id, p.full_name])
      )
    }

    const grouped = {}
    for (const r of receiptsData || []) {
      if (!grouped[r.user_id]) {
        grouped[r.user_id] = {
          userId: r.user_id,
          name: profilesMap[r.user_id] || 'Vouchcraft User',
          receipts: [],
          confirmedCount: 0,
        }
      }
      grouped[r.user_id].receipts.push(r)
      if (r.status === 'confirmed') grouped[r.user_id].confirmedCount++
    }

    const list = Object.values(grouped).sort(
      (a, b) =>
        b.confirmedCount - a.confirmedCount || b.receipts.length - a.receipts.length
    )

    setWorkers(list)
    setSearching(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          EMPLOYER VIEW
        </span>
        <h1 className="text-2xl font-bold text-white mb-1">Find verified talent</h1>
        <p className="text-slate-400">
          Describe what you need done. We'll match you with people who have
          real, community-verified experience — no degree required.
        </p>
      </div>

      <form onSubmit={handleSearch} className="bg-slate-800 rounded-2xl p-6 mb-10">
        <label className="block text-sm text-slate-300 mb-2">
          What do you need help with?
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          rows={3}
          placeholder="e.g. Need someone to set up our office wifi and fix a few laptops"
          className="w-full rounded-lg bg-slate-700 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {searching ? 'Searching...' : 'Find matching workers'}
        </button>
      </form>

      {searched && (
        <div>
          {matchedCategories.length > 0 && (
            <p className="text-slate-400 text-sm mb-4">
              Matched skill areas:{' '}
              {matchedCategories.map((c) => (
                <span
                  key={c}
                  className="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full mr-2"
                >
                  {c}
                </span>
              ))}
            </p>
          )}

          {workers.length === 0 && (
            <div className="bg-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400">
                No matching workers found yet. Try describing the task differently.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {workers.map((w) => (
              <div key={w.userId} className="bg-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{w.name}</h3>
                  <span className="text-emerald-400 text-sm font-semibold">
                    ✓ {w.confirmedCount} verified match{w.confirmedCount !== 1 ? 'es' : ''}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {w.receipts.slice(0, 3).map((r) => (
                    <div key={r.id} className="text-sm text-slate-400">
                      • {r.translated_skill}{' '}
                      {r.status === 'confirmed' ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-amber-400">⏳</span>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  to={`/u/${w.userId}`}
                  className="text-blue-400 hover:underline text-sm font-medium"
                >
                  View full profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}