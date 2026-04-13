# Aaron Woods — Personal Portfolio Website

A modern, professional single-page portfolio website for Aaron Woods, Senior AWS DevOps Engineer & AI Automation Specialist.

## 🚀 Live Features

- **Dark / Light Mode Toggle** — persists preference in localStorage, respects OS preference
- **Responsive Design** — mobile-first with Tailwind CSS breakpoints
- **Scroll Reveal Animations** — IntersectionObserver-powered staggered entrance animations
- **Animated Stat Counters** — smooth number counting when stats section enters viewport
- **Sticky Navbar** — hides on scroll down, reappears on scroll up, with blur backdrop
- **Active Nav Section Highlighting** — highlights current section in navbar
- **Mobile Menu** — animated slide-down with auto-close on link click
- **Cursor Glow Effect** — custom cursor dot + ring on desktop (pointer: fine)
- **3D Card Tilt** — subtle perspective tilt on project cards (desktop)
- **Email Copy to Clipboard** — click email link copies to clipboard + toast notification
- **Toast Notifications** — styled feedback messages
- **Load Progress Bar** — animated gradient progress bar on page load
- **Parallax Hero Glow** — subtle hero background parallax on scroll
- **Keyboard Navigation** — Escape key closes mobile menu

## 📄 Sections

| Section | Description |
|---------|-------------|
| Hero | Name, title, location, tagline, CTA buttons, badge |
| Stats Bar | 4 key achievement metrics |
| About | Bio, philosophy, tech tags |
| Experience | Timeline with 3 companies |
| Projects | 4 featured project cards |
| Skills | 6 skill category groups |
| Credentials | 7 certifications |
| Contact | Email, phone, LinkedIn, resume download |
| Footer | Social links, attribution |

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **Tailwind CSS** (CDN) — Utility-first styling
- **Vanilla JavaScript** — No frameworks
- **Google Fonts** — Inter + JetBrains Mono
- **Font Awesome 6** — Icons

## 📁 File Structure

```
index.html          Main portfolio page
css/
  style.css         Custom animations, dark/light mode, components
js/
  main.js           All interactivity: theme, scroll, animations, cursor
aaron-woods-resume-Cloud2026.pdf   Resume PDF for download
README.md           This file
```

## 🔗 Entry Points

- `/index.html` — Main portfolio (single page)
- `#hero` — Hero section
- `#about` — About section
- `#experience` — Experience timeline
- `#projects` — Projects/automations
- `#skills` — Skills & tech stack
- `#credentials` — Certifications
- `#contact` — Contact info

## 📋 Data / Content

No database used — all content is hardcoded in HTML.

## ⚠️ To Do / Not Yet Implemented

- [x] **resume.pdf** — Resume PDF added (aaron-woods-resume-Cloud2026.pdf)
- [ ] **Contact form** — Currently shows only contact info; could add a form via Formspree or similar
- [ ] **Analytics** — Add Google Analytics or Plausible if desired
- [ ] **OG / Social meta tags** — Twitter card, Open Graph for social sharing previews
- [ ] **Favicon** — Custom favicon matching the brand

## 💡 Next Steps

1. ~~Upload resume PDF~~ ✅ Done
2. Add a real headshot/photo to replace the initials avatar
3. Optionally integrate Formspree for a working contact form
4. Add `og:image` meta tag with a screenshot for social sharing
5. Deploy via the **Publish tab**

---

*Built with [Genspark.ai](https://genspark.ai) + AWS Kiro*
