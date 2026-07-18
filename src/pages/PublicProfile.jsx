import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORY_COLORS = {
  'IT & Networking': 'emerald',
  'Data & Operations': 'blue',
  'Software Engineering': 'purple',
  'Education & Training': 'amber',
  'Technical Support': 'cyan',
  'Business & Sales': 'pink',
  'Design': 'orange',
  'Marketing': 'rose',
  'General Technical Skill': 'slate',
}

const COLOR_CLASSES = {
  emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
  blue: 'bg-blue-500/10 border-blue-500/40 text-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/40 text-purple-400',
  amber: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
  pink: 'bg-pink-500/10 border-pink-500/40 text-pink-400',
  orange: 'bg-orange-500/10 border-orange-500/40 text-orange-400',
  rose: 'bg-rose-500/10 border-rose-500/40 text-rose-400',
  slate: 'bg-slate-500/10 border-slate-500/40 text-slate-400',
}

export default function PublicProfile() {
  const { userId } = useParams()
  const [fullName, setFullName] = useState('')
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single()

      if (profileError || !profile) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const { data: skillReceipts } = await supabase
        .from('skill_receipts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      setFullName(profile.full_name || 'Vouchcraft User')
      setReceipts(skillReceipts || [])
      setLoading(false)
    }

    load()
  }, [userId])

  const confirmedReceipts = receipts.filter((r) => r.status === 'confirmed')
  const grouped = receipts.reduce((acc, r) => {
    const cat = r.category || 'General Technical Skill'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(r)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md text-center">
          <p className="text-white font-semibold mb-2">Profile not found</p>
          <p className="text-slate-400 text-sm">
            This Vouchcraft profile doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="text-slate-500 text-sm hover:text-slate-300">
            ← Vouchcraft
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">{fullName}</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <span>
              {receipts.length} skill receipt{receipts.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              ✓ {confirmedReceipts.length} verified
            </span>
            <span>{Object.keys(grouped).length} skill areas</span>
          </div>
        </div>

        {receipts.length === 0 && (
          <div className="bg-slate-800 rounded-2xl p-10 text-center">
            <p className="text-slate-400">This profile doesn't have any skill receipts yet.</p>
          </div>
        )}

        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => {
            const color = CATEGORY_COLORS[category] || 'slate'
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${COLOR_CLASSES[color]
                      .split(' ')[0]
                      .replace('/10', '')}`}
                  />
                  <h2 className="text-lg font-semibold text-white">{category}</h2>
                  <span className="text-slate-500 text-sm">
                    {items.length} receipt{items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((r) => (
                    <div
                      key={r.id}
                      className={`rounded-xl border p-5 ${COLOR_CLASSES[color]}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{r.translated_skill}</p>
                        {r.status === 'confirmed' ? (
                          <span className="text-emerald-400 text-xs font-semibold whitespace-nowrap ml-2">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-amber-400 text-xs font-semibold whitespace-nowrap ml-2">
                            ⏳ Pending
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{r.raw_description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            r.status === 'confirmed' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        Vouched by {r.voucher_name || 'Not specified'}
                        {r.voucher_relationship && ` · ${r.voucher_relationship}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}