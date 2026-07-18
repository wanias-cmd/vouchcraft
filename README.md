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

## 🧱 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + Postgres, Row Level Security)
- **Routing:** React Router

## ⚙️ How It Works

1. A user signs up and logs a **Skill Receipt** describing real work they did
2. They name who can vouch for it and their relationship to them
3. The **Bureaucracy Translator** matches the description against a
   competency map and assigns a structured skill + category
4. Their public profile displays all receipts as a color-coded
   **Skill Canvas**, grouped by category

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
git clone [your repo link]
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

## 👥 Team (Solo)

[Wania Sheeba]

## 🏆 Built For

[Buildbyte] — Challenge: *"Build a digital solution that empowers
students, young professionals, or communities through technology"*