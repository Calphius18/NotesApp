# 📝 Notes App — React + TypeScript + Vite

This is a simple Notes App built with **React**, **TypeScript**, and **Vite**. It features hot module replacement (HMR), strict linting, and a scalable structure ideal for rapid development.

🧰 Features

- ⚡️ Powered by Vite for fast development  
- 🔥 React Fast Refresh  
- 🧠 Written in TypeScript  
- 📦 Pre-configured with ESLint  
- 📝 Easily extendable and customizable  


---

## 🚀 Getting Started

### 📁 Clone the repository

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
````

### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🧪 Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173/`.

---

## 🧹 Linting & Formatting

This project includes a minimal ESLint setup with TypeScript support.

### 👉 Optional: Enable Type-Aware Linting

To enable stricter type-aware rules, update your `eslint.config.js`:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // or for stricter rules
      // ...tseslint.configs.strictTypeChecked,
      // Optional stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### 👉 Optional: Add React-Specific ESLint Plugins

Install:

```bash
npm install --save-dev eslint-plugin-react-x eslint-plugin-react-dom
```

Then extend your config:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint check         |

---

## 📦 Build

To build for production:

```bash
npm run build
```

Then preview the output:

```bash
npm run preview
```

---
