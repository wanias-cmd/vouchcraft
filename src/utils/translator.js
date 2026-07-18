// Simple keyword-based "Bureaucracy Translator"
// Maps everyday language to enterprise-sounding competencies

const RULES = [
  {
    keywords: ['wifi', 'router', 'network', 'internet', 'cable', 'wiring', 'wired'],
    skill: 'Network Infrastructure & Hardware Troubleshooting',
    category: 'IT & Networking',
  },
  {
    keywords: ['database', 'excel', 'spreadsheet', 'inventory', 'records', 'data entry'],
    skill: 'Data Management & Systems Organization',
    category: 'Data & Operations',
  },
  {
    keywords: ['code', 'coding', 'website', 'app', 'software', 'programmed', 'bug', 'fixed a script'],
    skill: 'Software Development & Debugging',
    category: 'Software Engineering',
  },
  {
    keywords: ['taught', 'tutor', 'explained', 'helped him understand', 'lesson', 'mentor'],
    skill: 'Instructional Design & Peer Mentorship',
    category: 'Education & Training',
  },
  {
    keywords: ['fixed', 'repaired', 'phone', 'laptop', 'computer', 'hardware', 'broken'],
    skill: 'Hardware Repair & Technical Diagnostics',
    category: 'Technical Support',
  },
  {
    keywords: ['sold', 'customer', 'shop', 'store', 'sales', 'negotiat'],
    skill: 'Client Relations & Sales Operations',
    category: 'Business & Sales',
  },
  {
    keywords: ['design', 'poster', 'logo', 'graphic', 'photoshop', 'canva'],
    skill: 'Visual Design & Brand Communication',
    category: 'Design',
  },
  {
    keywords: ['social media', 'instagram', 'posts', 'facebook page', 'content'],
    skill: 'Digital Marketing & Content Management',
    category: 'Marketing',
  },
]

export function translateSkill(rawText) {
  const text = rawText.toLowerCase()

  for (const rule of RULES) {
    const matched = rule.keywords.some((kw) => text.includes(kw))
    if (matched) {
      return { skill: rule.skill, category: rule.category }
    }
  }

  // fallback if nothing matches
  return {
    skill: 'Applied Technical Problem-Solving',
    category: 'General Technical Skill',
  }
}