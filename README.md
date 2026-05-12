
# Madarsa Arabia Tajweedul Quran Masauni,kalinjar, district Banda(UP) 

  This project is a web application for an educational institute, designed to showcase its courses, facilities, and events. It is built using React and Vite, utilizing various Radix UI components for a modern and accessible user interface.

  The original design for this project is available at https://www.figma.com/design/1XPUpCMNmaijTlGx2zk5Lh/Educational-Institute-Website.

  ## Project Structure

  The project follows a standard React application structure, with components organized for reusability and maintainability. Key directories include:

```
.gitignore
README.md
build/
├── assets/
│   ├── index-BEPeD88c.js
│   ├── index-BwK4Dxud.css
│   ├── p00.webp
│   ├── p01.webp
│   ├── p1.webp
│   ├── p2.webp
│   ├── p3.webp
│   ├── p4.webp
│   ├── p5.webp
│   └── p6.webp
└── index.html
index.html
package-lock.json
package.json
public/
├── assets/
│   ├── Founder.webp
│   ├── c1.webp
│   ├── c2.webp
│   ├── c3.webp
│   ├── c4.webp
│   ├── c5.webp
│   ├── c6.webp
│   ├── c7.webp
│   ├── chacha.webp
│   ├── foun.webp
│   ├── group.webp
│   ├── h1.webp
│   ├── h10.webp
│   ├── h11.webp
│   ├── h2.webp
│   ├── h3.webp
│   ├── h4.webp
│   ├── h5.webp
│   ├── h6.webp
│   ├── h7.webp
│   ├── h8.webp
│   ├── h9.webp
│   ├── lo.webp
│   ├── m1.webp
│   ├── m2.webp
│   ├── m3.webp
│   ├── m4.webp
│   ├── p00.webp
│   ├── p01.webp
│   ├── p1.webp
│   ├── p2.webp
│   ├── p3.webp
│   ├── p4.webp
│   ├── p5.webp
│   ├── p6.webp
│   ├── pr.webp
│   └── principle.webp
src/
├── App.tsx
├── Attributions.md
├── Guidelines.md
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DepartmentsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── NoticePage.tsx
│   │   ├── ProgramsPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   └── news/
│   │       ├── ArticleView.tsx
│   │       ├── CategoryTabs.tsx
│   │       ├── NewsCard.tsx
│   │       ├── Pagination.tsx
│   │       ├── constants.ts
│   │       ├── fallbackData.ts
│   │       └── utils.ts
│   └── ui/
│       ├── ScrollToTop.tsx
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.ts
│       └── utils.ts
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   ├── departments.json
│   ├── faqs.json
│   ├── news.json
│   └── stats.json
├── guidelines/
│   └── Guidelines.md
├── i18n.ts
├── index.css
├── main.tsx
└── styles/
    └── globals.css
vite.config.ts
```

  ## Technologies Used

  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool that provides a lightning-fast development experience.
  - **TypeScript**: A superset of JavaScript that adds static typing.
  - **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
  - **Radix UI**: A collection of unstyled, accessible UI components for React.
  - **Framer Motion**: A production-ready motion library for React.

  ## Running the code

  To get the project up and running on your local machine, follow these steps:

  ### Prerequisites

  Ensure you have Node.js and npm (Node Package Manager) installed on your system.

  ### Installation

  1. Navigate to the project directory in your terminal:

     ```bash
     cd f:\delhii\MADARSA-ARABIA
     ```

  2. Install the project dependencies:

     ```bash
     npm install
     ```

  ### Development Server

  To start the development server and view the application in your browser:

  ```bash
  npm run dev
  ```

  This will typically start the server at `http://localhost:5173` (or another available port). The application will automatically reload as you make changes to the source code.

  ### Building for Production

  To create a production-ready build of the application:

  ```bash
  npm run build
  ```

  This command will compile and optimize your application for deployment, placing the output in the `build/` directory.

  ### Previewing the Production Build

  You can preview the production build locally using:

  ```bash
  npm run preview
  ```

  This will serve the static files from the `build/` directory.
  