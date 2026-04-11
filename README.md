# 🚀 Md. Nakibul Islam — Portfolio Website

A vibrant, single-page portfolio built with **HTML · CSS · JavaScript · Three.js**

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles, CSS variables, responsive
├── main.js             ← Three.js 3D background + all interactions
├── assets/
│   └──                 ← Your photo
└── README.md           ← This file
```

---

## ⚡ Quick Start (No Build Step Needed!)

This is a **zero-build** project. No Node.js, no Webpack, no installation required.

### Option A — Live Server (VS Code) ✅ Recommended
1. Install VS Code extension: **Live Server** by Ritwick Dey
2. Right-click `index.html` → **Open with Live Server**


### Option B — Python (built into macOS/Linux)
```bash
cd portfolio/
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option C — Node.js `serve`
```bash
npm install -g serve
serve portfolio/
# Opens on http://localhost:3000
```

---

## 📦 Dependencies

All dependencies are loaded via **CDN** (no npm install needed):

| Library    | Version | Purpose                        | CDN URL |
|------------|---------|--------------------------------|---------|
| Three.js   | r128    | 3D particles & geometric meshes | cdnjs.cloudflare.com |
| Google Fonts | —    | Syne + DM Sans typography      | fonts.googleapis.com |

**Three.js CDN in `index.html`:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

---

## 🎨 Design System

| Token          | Value         | Usage                     |
|----------------|---------------|---------------------------|
| `--accent`     | `#00e5c8`     | Teal — primary highlights |
| `--accent2`    | `#f5a623`     | Amber — secondary accents |
| `--accent3`    | `#7c4dff`     | Violet — tertiary accents |
| `--bg`         | `#080c14`     | Page background           |
| `--font-display`| Syne        | Headings & logos          |
| `--font-body`  | DM Sans       | Body copy                 |

---

## ✨ Features

- **Three.js 3D Canvas Background** — 1800 colored particles + 5 wireframe geometric meshes with mouse parallax
- **Custom Cursor** — Dual-layer cursor with smooth follower and hover scaling
- **Sticky Navbar** — Glassmorphism blur effect on scroll, active section detection
- **Scroll Reveal** — IntersectionObserver-powered staggered entry animations
- **Animated Skill Bars** — Animate only when scrolled into view
- **10 Tech Blog Cards** — Curated JS/Laravel/PHP articles (2025–2026)
- **Contact Form** — Submit handler with loading state and success feedback
- **Fully Responsive** — Mobile hamburger menu, stacked layouts, touch-friendly
- **Photo Hero** — Your photo with animated orbit rings, glow effect, floating badges

---

## 🔧 Customization Guide

### Update Your Info
Edit `index.html` — search for placeholder text and replace:
- Name, phone, email, LinkedIn, GitHub links
- Project descriptions and GitHub URLs

### Change Color Theme
Edit `style.css` `:root` variables:
```css
:root {
  --accent: #00e5c8;   /* Change to any hex */
  --accent2: #f5a623;
  --accent3: #7c4dff;
}
```

### Add/Edit Blog Posts
Edit `main.js` → `BLOG_POSTS` array:
```js
{
  tag: "Laravel",
  title: "Your Article Title",
  desc: "Short description...",
  date: "Apr 2026",
  url: "https://your-link.com",
}
```

### Add Real Contact Form (EmailJS)
1. Sign up at [emailjs.com](https://emailjs.com) (free tier: 200 emails/month)
2. Add to `<head>` in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   <script>emailjs.init("YOUR_PUBLIC_KEY");</script>
   ```
3. Replace the form submit handler in `main.js`:
   ```js
   form.addEventListener('submit', async (e) => {
     e.preventDefault();
     await emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form);
     success.classList.add('show');
   });
   ```


---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Full |

---

## 📄 License
MIT — Free to use, customize, and deploy.

Built with ❤️ in Dhaka, Bangladesh by Md. Nakibul Islam
