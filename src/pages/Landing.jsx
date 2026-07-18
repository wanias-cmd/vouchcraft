import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="bg-slate-900">
      {/* Hero section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-1.5 rounded-full mb-6">
          No degree required. No formal paperwork required. Just proof.
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Your work speaks.
          <br />
          <span className="text-emerald-400">We help the world hear it.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Millions of skilled people are shut out of opportunity because they lack
          formal credentials — not because they lack skill. Vouchcraft turns
          real, community-verified work into a profile employers can trust.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Build your profile
          </Link>
          <Link
            to="/login"
            className="border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 font-semibold px-8 py-3 rounded-lg transition"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Problem section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Meet Danyal.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Danyal fixed the internet at a coaching center, rebuilt a shop's
              inventory system, and taught himself networking by trial and
              error. He's genuinely skilled — but every job application asks
              for a degree or a formal reference letter he doesn't have.
            </p>
            <p className="text-slate-400 leading-relaxed">
              His skills are real. His paperwork isn't. Vouchcraft exists to
              close that gap.
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8">
            <p className="text-slate-500 text-sm mb-2">Traditional application asks:</p>
            <p className="text-white font-medium mb-6">
              "Please attach your degree or Section 2 verification."
            </p>
            <p className="text-slate-500 text-sm mb-2">Vouchcraft asks:</p>
            <p className="text-emerald-400 font-medium">
              "What did you actually do — and who saw you do it?"
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="text-white font-semibold mb-2">Describe your work</h3>
            <p className="text-slate-400 text-sm">
              In your own words. No jargon, no forms. Just what you actually did.
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="text-white font-semibold mb-2">Get vouched for</h3>
            <p className="text-slate-400 text-sm">
              The client, neighbor, or shop owner who saw your work backs it up.
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="text-white font-semibold mb-2">Build a trusted profile</h3>
            <p className="text-slate-400 text-sm">
              We translate it into language employers understand — automatically.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-4">
          Your paper trail was never the problem.
        </h2>
        <p className="text-slate-400 mb-8">
          Start building a profile that proves what you can actually do.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Get started — it's free
        </Link>
      </section>
    </div>
  )
}