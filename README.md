# Portfolio Website

A minimal, clean, and modern portfolio website built with React, TypeScript, and Tailwind CSS. Showcasing my work as a Data Scientist and Python Backend Developer.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.vercel.app)

## ✨ Features

- **Minimal Design**: Clean, developer-focused aesthetic with monospace typography (JetBrains Mono)
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Layout**: Fully responsive design that works on all devices
- **Project Showcase**: Interactive project cards with hover effects and external links
- **Blog Section**: Featured articles and writings
- **Search Functionality**: Command palette-style search (Ctrl+K) for quick navigation
- **Cal.com Integration**: Embedded booking scheduler for consultations
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **TypeScript**: Fully typed for better development experience
- **Production Ready**: Optimized build with Vite for fast loading

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/gohil-gaurav/your-portfolio-repo.git
cd your-portfolio-repo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/
│   │   └── images/          # Images and media files
│   │       ├── avatar.jpeg
│   │       └── project/     # Project screenshots
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Projects.tsx
│   │   ├── SearchModal.tsx
│   │   ├── TechStack.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/                # Data files
│   │   ├── blogs.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── pages/               # Page components
│   │   ├── AllProjects.tsx
│   │   └── Home.tsx
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero.tsx`
   - Update name, title, and description
   - Change social media links
   - Replace profile picture in `src/assets/images/`

2. **Projects**: Edit `src/data/projects.ts`
   - Add/remove projects
   - Update project details, tech stack, and links
   - Add project images to `src/assets/images/project/`

3. **Skills**: Edit `src/data/skills.ts`
   - Update your tech stack and skills

4. **Blog**: Edit `src/data/blogs.ts`
   - Add your blog posts and articles

5. **About Section**: Edit `src/components/About.tsx`
   - Update bio and description

### Change Theme Colors

Edit `src/index.css` to customize the color scheme:
```css
:root {
  --color-bg: #ffffff;
  --color-text: #171717;
  --color-text-muted: rgba(0, 0, 0, 0.6);
}

[data-theme='dark'] {
  --color-bg: #000000;
  --color-text: #f5f5f5;
  --color-text-muted: rgba(255, 255, 255, 0.6);
}
```

## 🔧 Configuration

### Cal.com Integration

Update the Cal.com booking link in `src/components/Contact.tsx`:
```typescript
const calLink = "https://cal.com/your-username/consultation";
```

### Search Functionality

The search modal (Ctrl+K) searches through:
- Sections (Hero, About, Projects, Blog, Contact)
- Projects
- Social media links
- Blog posts

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Gaurav Gohil**

- GitHub: [@gohil-gaurav](https://github.com/gohil-gaurav)
- LinkedIn: [Gaurav Gohil](https://www.linkedin.com/in/gaurav-gohil-344758346/)
- X (Twitter): [@GauravGohi01](https://x.com/GauravGohi01)

## 🙏 Acknowledgments

- Design inspiration from modern developer portfolios
- Icons from [Simple Icons](https://simpleicons.org/)
- Fonts: JetBrains Mono
- Built with ❤️ using React and TypeScript

---

⭐ If you like this portfolio template, please give it a star on GitHub!
