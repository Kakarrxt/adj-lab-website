# 🧬 ADJ Lab Website

<div align="center">

![ADJ Lab Website](https://github.com/user-attachments/assets/22ec5ef3-0e13-4d83-bf67-f382fa02ba23)

**Interactive research platform built exclusively for ADJ Lab, Cancer Science Institute of Singapore**

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>


## 🌐 Live Demo

Experience the interactive website here: [ADJ Lab Website](https://adj-lab-website.vercel.app)

<div align="center">
  <img src="https://github.com/user-attachments/assets/4863cc96-fffc-4751-903a-a2392a55df90" alt="Desktop View" width="70%"/>
  <img src="https://github.com/user-attachments/assets/e3999ca7-ac60-4f4c-9d1e-a5e73ad6340b" alt="Mobile View" width="20%"/>
</div>

## ✨ Highlights

- **Custom Animation Experience** - Immersive full-page transitions from nautical/fantasy map to purple cancer cells using Framer Motion
- **Responsive Design** - Seamlessly adapts across desktop, tablet, and mobile devices
- **Dynamic Backgrounds** - Interactive elements that respond to user movement and scroll position
- **Modern Stack** - Built with Next.js, TypeScript, and TSX components for optimal performance and maintainability
- **Content Management** - Easily updateable content structure via centralized constants
- **SEO Optimized** - Structured for search engine discoverability
- **Performance Focused** - Fast load times and optimized assets

## 🎬 Features Showcase

<div align="center">
  <img src="https://github.com/user-attachments/assets/7e016ba1-64a6-49a8-95ce-d61924e1a501" alt="Dr. Anand" width="45%"/>
  <img src="https://github.com/user-attachments/assets/8b61bb88-71eb-4e40-a031-715517692105" alt="Research Page" width="45%"/>
  
  ![Responsive Demo](https://github.com/user-attachments/assets/1ec83c97-79e0-4f80-bc57-70dc6c239194)
</div>


### Interactive Elements

- **Nautical to Cellular Transition** - Smooth animation transforms the landing page from a fantasy map to microscopic cancer cell visualization
- **Parallax Scrolling** - Multi-layered backgrounds create depth and engagement
- **Hover Interactions** - Dynamic feedback on interactive elements enhances user experience
- **Page Transitions** - Seamless content changes maintain immersion throughout the site

## 📂 Project Structure

```
├── public/                     # Static assets
│   └── media/                  # Media assets
│       ├── anand/              # Dr. Anand-related media
│       ├── contact/
│       ├── footer/
│       ├── home/
│       ├── LabMembers/
│       ├── research/
│       └── favicon.ico
├── src/                        # Source code
│   ├── app/                    # App directory (Next.js App Router)
│   │   ├── providers/          # Context providers
│   │   └── translations/       # Internationalization files
│   ├── components/             # Reusable UI components
│   ├── constants/              # Content and configuration constants
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   ├── motion/                 # Framer Motion animations
│   ├── pages/                  # Page components
│   │   ├── anand/              # Dr. Anand profile page
│   │   ├── contact/            # Contact page
│   │   ├── join-us/            # Recruitment page
│   │   ├── lab-events/         # Events page
│   │   ├── members/            # Team members page
│   │   ├── publications/       # Publications page
│   │   ├── research/           # Research page
│   │   ├── _app.tsx            # Custom App component
│   │   ├── index.tsx           # Homepage
│   │   └── page.module.css     # Homepage-specific styles
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Global CSS
│   └── utils/                  # Utility functions
│       ├── app-configurations.ts
│       ├── appState.ts
│       ├── routeConfig.tsx
│       └── types.ts
├── .gitignore                  # Git ignore file
├── components.json             # Component configurations
├── eslint.config.mjs           # ESLint configuration
├── next-env.d.ts               # Next.js TypeScript declarations
└── next.config.ts              # Next.js configuration
```

## 🛠 Installation & Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kakarrxt/adj-lab-website.git
   cd adj-lab-website
   ```

2. **Install dependencies:**
   ```sh
   npm install # or yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev # or yarn dev
   ```
   
   The website will be available at `http://localhost:3000`.

## 🔧 Updating Content

The website is designed for easy content updates without modifying the core codebase. Edit the constants in `src/constants/index.js` to update:

### Research Section
- `ResearchTopics`: Update current research focus areas with descriptions and images
- `Publications`: Add or modify scientific publications with links to journals

### Team Information
- `primaryAffiliations`: Main institutional connections
- `additionalPositions`: Leadership roles and responsibilities
- `awards`: Academic and research achievements

### Lab Members
- `currentMembers`: Profiles and roles of active researchers
- `alumniMembers`: Historical team members and their contributions

### Opportunities
- `openPositions`: Current job openings and application processes

## 🚀 Deployment

This project is automatically deployed via **Vercel** with continuous integration:

```sh
# Manual deployment if needed
vercel
```

## 🧪 Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation
- **TypeScript** - Type-safe JavaScript for improved development experience
- **Framer Motion** - Animation library for interactive UI components
- **CSS Modules** - Scoped styling for components
- **Vercel** - Hosting platform with CI/CD capabilities

## 📱 Mobile Optimization

The site is fully responsive with dedicated mobile layouts and optimized touch interactions:

- **Touch-friendly navigation** - Easy thumb-reach menus
- **Optimized animations** - Reduced motion for better performance
- **Adaptive layouts** - Content reorganization for smaller screens

---

## ❓ Troubleshooting

### Common Issues

**Images not loading**
- Ensure all image paths in `src/constants/index.js` are correct
- Verify that images exist in the specified directories

**Animation performance issues**
- Reduce motion complexity in `src/motion/animations.ts`
- Add the `reduced-motion` class to elements for users with motion preferences

**Build errors**
- Ensure Node.js and npm versions meet requirements
- Clear `.next` cache folder and node_modules: `rm -rf .next node_modules && npm install`

### Getting Support

If you encounter issues not covered here, please:
1. Check existing GitHub issues
2. Open a new issue with detailed reproduction steps
3. Contact the maintainer at [guptakanav67@gmail.com](mailto:guptakanav67@gmail.com)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions to improve the ADJ Lab website are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow the existing code style and TypeScript patterns
- Write meaningful commit messages following conventional commits format
- Update documentation for any new features or changes

---

<div align="center">

**💡 Built exclusively for ADJ Lab, Cancer Science Institute of Singapore**

*Showcasing cutting-edge cancer research through innovative web design*

[Contact Us](mailto:guptakanav67@gmail.com) | [CSI Singapore](https://www.csi.nus.edu.sg/)

</div>
