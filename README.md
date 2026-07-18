<div align="center">

# 🛠️ Vouchcraft

### Turning real-world work into a verified profile — no formal credentials required.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css&logoColor=white)

</div>

---

## 💡 The Problem

Millions of skilled people — students, self-taught technicians, informal
freelancers — are shut out of opportunity not because they lack skill, but
because they lack paperwork. Traditional applications demand degrees,
institutional references, or formal "verification" that excludes people
who learned by doing.

> **Meet Danyal.** He rewired a coaching center's network, rebuilt a shop's
> inventory system, and taught himself everything through trial and error.
> His skills are real. His paperwork isn't. That gap is what Vouchcraft closes.

## ✨ The Solution

Vouchcraft lets anyone catalog real, undocumented work they've done and
have it vouched for by the people who saw it happen. The platform then
translates plain, everyday descriptions into structured, employer-readable
competencies — building a visual, trustable skill profile over time.

## 🚀 Key Features

| Feature | What it does |
|---|---|
| 📝 **Skill Receipts** | Log real-world tasks in plain language — no jargon required |
| 🔄 **Bureaucracy Translator** | Converts casual descriptions ("fixed the wifi") into enterprise-recognizable competencies ("Network Infrastructure & Hardware Troubleshooting") |
| 🤝 **Community Vouching** | Every skill receipt is tied to the person who witnessed it — accountability without formal references |
| 🗺️ **Skill Canvas** | A visual, color-coded profile grouping verified skills by category, so an employer can assess breadth at a glance |
| 🔗 **Public Verified Profiles** | Every user gets a shareable public link (`/u/:id`) — recruiters can view a fully verified skill profile without needing an account |
| 💼 **Employer View** | Employers describe a task in plain language and get matched to verified workers with relevant skill areas — no job posting or resume screening required |
| 🔐 **Google Sign-In** | One-click authentication alongside email/password, lowering the barrier to entry for users |

## 🧱 Tech Stack

- **Frontend:** React + Vite (JavaScript)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Backend:** Supabase (Auth + Postgres, Row Level Security, Google OAuth)
- **Routing:** React Router
- **Deployment:** Vercel

## ⚙️ How It Works

**For workers:**
1. Sign up and log a **Skill Receipt** describing real work you did, in plain language
2. The **Bureaucracy Translator** instantly converts it into a structured, employer-readable competency
3. Send the built-in confirmation link to the person who witnessed the work — they confirm it with one click, no account needed
4. Confirmed work shows a **✓ Verified** badge; your public **Skill Canvas** (`/u/your-id`) is shareable with anyone, no login required

**For employers:**
1. Visit **Employer View** and describe what you need done, in plain language
2. Vouchcraft matches your request against verified workers' skill areas
3. Browse ranked results and view each candidate's full verified profile

## 🔭 Roadmap (Beyond the Hackathon)

- [ ] Replace the rules-based translator with an LLM for open-ended matching
- [ ] Photo/screenshot upload as proof-of-work evidence per receipt
- [ ] Weighted credibility scoring — verified users' endorsements carry more weight
- [ ] Cryptographically signed vouches for tamper-evident verification

## 🌐 Live Demo

**vouchcraft.vercel.app**

## 💻 Local Setup

> Only needed if you want to run this yourself — judges can use the live demo above.

```bash
git clone https://github.com/wanias-cmd/vouchcraft
cd vouchcraft
npm install
```

Create a `.env.local` file in the project root with:
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Then run:
```bash
npm run dev
```

## 👥 Team 

[Wania Sheeba] (Solo)

## 🏆 Built For

Buildbyte — Challenge: *"Build a digital solution that empowers
students, young professionals, or communities through technology"*