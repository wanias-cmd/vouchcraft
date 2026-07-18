import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { translateSkill } from '../utils/translator'

export default function Dashboard() {
  const { user } = useAuth()
  const [receipts, setReceipts] = useState([])
  const [description, setDescription] = useState('')
  const [voucherName, setVoucherName] = useState('')
  const [voucherRelationship, setVoucherRelationship] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loadingList, setLoadingList] = useState(true)

  const fetchReceipts = async () => {
    setLoadingList(true)
    const { data } = await supabase
      .from('skill_receipts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setReceipts(data || [])
    setLoadingList(false)
  }

  useEffect(() => {
    if (user) fetchReceipts()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const { skill, category } = translateSkill(description)

    await supabase.from('skill_receipts').insert({
      user_id: user.id,
      raw_description: description,
      voucher_name: voucherName,
      voucher_relationship: voucherRelationship,
      translated_skill: skill,
      category: category,
      confidence_score: 1,
    })

    setDescription('')
    setVoucherName('')
    setVoucherRelationship('')
    setSubmitting(false)
    fetchReceipts()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-1">Your Skill Receipts</h1>
      <p className="text-slate-400 mb-8">
        Describe real work you've done, in your own words. We'll help translate it later.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-2xl p-6 mb-10 space-y-4"
      >
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            What did you do? (plain language is fine)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            placeholder="e.g. I rewired the internet cables and fixed the lagging router at a local coaching center"
            className="w-full rounded-lg bg-slate-700 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Who can vouch for this?</label>
            <input
              type="text"
              value={voucherName}
              onChange={(e) => setVoucherName(e.target.value)}
              placeholder="e.g. Asif (shop owner)"
              className="w-full rounded-lg bg-slate-700 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Their relationship to you</label>
            <input
              type="text"
              value={voucherRelationship}
              onChange={(e) => setVoucherRelationship(e.target.value)}
              placeholder="e.g. Client"
              className="w-full rounded-lg bg-slate-700 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Add Skill Receipt'}
        </button>
      </form>

      <div className="space-y-4">
        {loadingList && <p className="text-slate-400">Loading your receipts...</p>}
        {!loadingList && receipts.length === 0 && (
          <p className="text-slate-400">No skill receipts yet — add your first one above.</p>
        )}
      {receipts.map((r) => (
          <div key={r.id} className="bg-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">You said:</p>
            <p className="text-white mb-3">{r.raw_description}</p>

            {r.translated_skill && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 mb-3">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  {r.category}
                </p>
                <p className="text-emerald-300 font-medium">{r.translated_skill}</p>
              </div>
            )}

            <p className="text-slate-500 text-sm">
              Vouched by {r.voucher_name || 'Not specified'} ({r.voucher_relationship || 'unspecified'})
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}