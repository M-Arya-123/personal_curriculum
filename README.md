# Personal Curriculum: Self-Hosted SRE Academy

> **A private, interactive Site Reliability Engineering (SRE) learning platform built for mastery from zero to production.**

[![Curriculum: Santhosh Kumar Jampala](https://img.shields.io/badge/Curriculum-SRE%20Roadmap-ff69b4)](https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504)
[![Base: Open Course Builder](https://img.shields.io/badge/Platform-Open%20Course%20Builder-4A90E2)](https://github.com/rayan2162/open-course-builder)
[![Backend: Node + Express](https://img.shields.io/badge/Backend-Node%20%2B%20Express-339933)](#-architecture--how-it-works)
[![Storage: Plain JSON](https://img.shields.io/badge/Storage-Local%20JSON-FFB000)](#-architecture--how-it-works)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#-credits--license)

---

## 🎯 About This Project

This repository is a self-hosted, private learning environment customized specifically for studying **Site Reliability Engineering (SRE)**. 

Instead of jumping between disconnected bookmarks, videos, and terminal windows, this project integrates an authoritative, 12-to-18-month SRE curriculum with structured concept lessons, curated book & documentation links, hands-on production labs, an automated **Senior SRE Mentor** evaluation engine, and a Markdown study journal.

Everything runs locally on your machine with zero database infrastructure, stores progress in plain versioned JSON files, and automatically syncs to your private GitHub repository.

---

## 🤝 Open Source Credits & Acknowledgements

Open source software thrives when creators build upon each other's work and give credit where it is due:

1. **Underlying Platform:**
   - This project is built upon the open-source platform [**Open Course Builder**](https://github.com/rayan2162/open-course-builder) created by [**Rayan Kontar (@rayan2162)**](https://github.com/rayan2162), released under the permissive [MIT License](https://opensource.org/licenses/MIT).
   - Open Course Builder provides the foundation: the lightweight Express backend, zero-dependency JSON database persistence, Markdown notebook drawer, streak heatmap calendar, and AI task runner.

2. **SRE Curriculum & Roadmap:**
   - The entire coursework, 5 learning phases, 15 core technical domains, curated reading lists, study schedules, and reliability principles are modeled 1:1 after the authoritative guide:  
     👉 [**SRE Roadmap for Beginners: Complete Learning Path from Zero to SRE**](https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504) by **Santhosh Kumar Jampala**.

---

## 🗺️ Curriculum Structure (1:1 with Santhosh Kumar Jampala Roadmap)

The curriculum spans **5 Phases**, **15 Core Topics**, **46 Lessons**, and **15 Graded SRE Assignments** designed for 15–20 hours of study per week.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                SRE ACADEMY ROADMAP                              │
├─────────────────────┬───────────────────────────────────────────────────────────┤
│ Phase 1: Foundation │ 1. Linux Fundamentals                                     │
│ (Months 1–3)        │ 2. Networking Basics                                      │
│                     │ 3. Basic Scripting (Bash)                                 │
├─────────────────────┼───────────────────────────────────────────────────────────┤
│ Phase 2: Core       │ 4. Version Control (Git)                                  │
│ Skills (Months 4–6) │ 5. Programming Fundamentals (Python)                      │
│                     │ 6. Databases Basics                                       │
│                     │ 7. Containerization (Docker)                              │
├─────────────────────┼───────────────────────────────────────────────────────────┤
│ Phase 3: Infra &    │ 8. Cloud Platforms (AWS)                                  │
│ Cloud (Months 7–9)  │ 9. Configuration Management (Ansible)                     │
├─────────────────────┼───────────────────────────────────────────────────────────┤
│ Phase 4: Advanced   │ 10. Monitoring & Observability                            │
│ SRE (Months 10–12)  │ 11. CI/CD Pipelines                                       │
│                     │ 12. Kubernetes                                            │
│                     │ 13. Incident Management & On-Call                         │
├─────────────────────┼───────────────────────────────────────────────────────────┤
│ Phase 5: Focus &    │ 14. Choose Your Focus Areas (Security/Chaos/Mesh/FinOps)  │
│ Growth (Month 13+)  │ 15. Soft Skills Development (Docs, RFCs, Post-Mortems)    │
└─────────────────────┴───────────────────────────────────────────────────────────┘
```

### What Each Topic Includes:
- **Concept Deep-Dives:** Explaining *Why it matters in SRE* and *What to learn* (system internals, kernel subsystems, RFCs).
- **Curated Resources:** Direct links to official docs, free online books (Google SRE books, Kurose networking, Linux Journey), and industry classics.
- **Hands-on Practice Labs:** Practical terminal labs to build real-world skills.
- **Graded SRE Assignments:** Production incident scenarios evaluated against rigorous criteria (system internals, idempotency, edge cases, error handling).

---

## ✨ Key Features

- 🧭 **Today's Mission:** Dynamic guidance highlighting your next pending lesson or lab with estimated completion times.
- 🎓 **Principles & Study Guide Tab:**
  - **Understanding SRE:** Definition, core responsibilities, and how SREs balance velocity with reliability.
  - **7 Essential SRE Principles:** Embrace Risk, SLOs & SLIs, Eliminate Toil, Monitoring & Alerting (4 Golden Signals), Capacity Planning, Blameless Post-Mortems, and Gradual Rollouts.
  - **Curated Reading List:** Google SRE books (free online) and essential industry books (*The Phoenix Project*, *Seeking SRE*, *Database Reliability Engineering*).
  - **Weekly Study Schedule & Certifications:** Weekday (2h/day) and Weekend (4–6h) schedules, plus certification roadmap (LFCS, AWS SAA, CKA, CKAD, Terraform).
  - **Common Pitfalls & Staying Current:** Guidance on avoiding tutorial hell, skipping fundamentals, and recommended SRE engineering blogs (Google, Netflix, Uber, CNCF, SREcon).
- 🧠 **Senior SRE Mentor Evaluator:** Real-time AI code and runbook evaluation that gives actionable, constructive feedback on system calls, signals, error handling, and reliability logic.
- 📝 **Markdown Study Notebook:** Built-in drawer to take persistent notes as you work through lessons and experiments.
- 🔥 **GitHub Streak Heatmap:** Track daily study habits with visual activity squares.
- 🔒 **Zero-Config, Self-Hosted & Private:** All data is stored in human-readable JSON files in `db/`. No external databases, no telemetry, no lock-in.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Python 3](https://www.python.org/) (optional, only if rebuilding the curriculum database)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/M-Arya-123/personal_curriculum.git
cd personal_curriculum
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
The platform runs completely out of the box with built-in heuristic SRE evaluation. If you want the AI mentor to use Groq's LLM API:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Add your free [Groq API Key](https://console.groq.com/keys) in `.env`:
```env
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 4. Start the Application
```bash
npm start
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser!

---

## 🛠️ Repository & Data Management

### Database Architecture
All coursework and progress are stored in `db/c1a00000-0000-4000-a000-000000000001.json`:
- Contains all 46 lessons and 15 SRE tasks.
- Tracks completion status, submission history, and notes.

To re-seed or rebuild the curriculum from scratch:
```bash
python scripts/build_sre_course.py
```

### Progress Syncing
Clicking **Sync progress** in the navbar (or using git directly) pushes your completed lessons, notes, and mentor feedback directly to your GitHub repository:
```bash
git add db/
git commit -m "docs(progress): record completed lessons and labs"
git push origin main
```

---

## 🧱 Project Layout

```
personal_curriculum/
├── server.js                      # Express API + SRE Mentor evaluation engine
├── package.json                   # Project scripts and dependencies
├── .env.example                   # Environment configuration template
├── README.md                      # Project documentation
├── scripts/
│   ├── build_sre_course.py        # Authoritative SRE curriculum generator (Python)
│   └── seed_sre_course.js         # Alternative JS seed script
├── db/
│   └── c1a00000-…-000000000001.json # SRE Course database & progress state
└── public/
    ├── index.html                 # Single page application markup & guide tab
    ├── app.js                     # Interactive UI, roadmap view & mission driver
    └── styles.css                 # Custom SRE styling tokens & aesthetic theme
```

---

## 📜 Credits & License

- **Curriculum Author:** [Santhosh Kumar Jampala](https://medium.com/@santhoshjsh) — *SRE Roadmap for Beginners* ([Medium Article](https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504)).
- **Original Application:** [Open Course Builder](https://github.com/rayan2162/open-course-builder) by [Rayan Kontar (@rayan2162)](https://github.com/rayan2162).
- **License:** Released under the [MIT License](LICENSE) in accordance with the upstream Open Course Builder license. You are free to modify, self-host, and adapt this coursework for your personal learning journey.
