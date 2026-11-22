# NOVA — Futuristic 3D E-Commerce Platform

NOVA is a high-performance, scalable frontend e-commerce web application engineered with modern web technologies, sleek dark aesthetics, and interactive 3D rendering.

## Tech Stack
- **Framework:** React.js 19 + Vite
- **Styling:** Tailwind CSS (Custom Dark, Purple, & White theme)
- **3D Graphics:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM (v7)

## Project Structure
```text
NOVA/
├── public/
│   ├── images/
│   │   ├── products/
│   │   │   ├── sneakers/
│   │   │   ├── headphones/
│   │   │   ├── watches/
│   │   │   ├── handbags/
│   │   │   ├── gaming/
│   │   │   ├── sunglasses/
│   │   │   └── speakers/
│   │   ├── banners/
│   │   ├── categories/
│   │   └── logo/
│   └── models/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── cart/
│   │   └── ui/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   │   └── admin/
│   ├── routes/
│   ├── styles/
│   └── utils/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
