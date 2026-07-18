import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Confirm() {
  const { receiptId } = useParams()
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data, error: fetchError } = await supabase
        .from('skill_receipts')
        .select('*')
        .eq('id', receiptId)
        .single()

      if (fetchError || !data) {
        setError('This vouch link is invalid or no longer exists.')
      } else {
        setReceipt(data)
      }
      setLoading(false)
    }
    load()
  }, [receiptId])

  const handleConfirm = async () => {
    setConfirming(true)
    const { error: updateError } = await supabase
      .from('skill_receipts')
      .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
      .eq('id', receiptId)

    if (updateError) {
      setError('Something went wrong confirming this. Please try again.')
    } else {
      setDone(true)
    }
    setConfirming(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  if (done || receipt.status === 'confirmed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md text-center">
          <div className="text-emerald-400 text-4xl mb-4">✓</div>
          <h1 className="text-white text-xl font-bold mb-2">Confirmed</h1>
          <p className="text-slate-400">
            Thank you — you've verified this piece of real work. It now shows
            as confirmed on their Vouchcraft profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full">
        <p className="text-slate-400 text-sm mb-2">Someone has asked you to vouch for this:</p>
        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <p className="text-white">{receipt.raw_description}</p>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          By confirming, you're verifying that this work actually happened,
          as far as you witnessed it. This will be visible on their public profile.
        </p>
        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {confirming ? 'Confirming...' : 'Yes, I confirm this happened'}
        </button>
      </div>
    </div>
  )
}