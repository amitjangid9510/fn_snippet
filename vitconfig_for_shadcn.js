import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})

//-------------commands------------
// extensions :  Material Icon Theme  ,  Turbo Console Log  , Tailwind CSS IntelliSense , Save Typing 
//npm update -g 
// https://v3.tailwindcss.com/docs/guides/vite
// jsconfig.json

//{
//  "compilerOptions": {
//    "baseUrl": ".",
//    "paths": {
//      "@/*": ["./src/*"]
//    }
//  }
//}

//  npx shadcn@latest init
//  npx shadcn@latest add --all
// help : -   https://ui.shadcn.com/docs/components

//  npm install react-router-dom axios @reduxjs/toolkit redux-persist react-redux react-hook-form @hookform/resolvers yup
//  npm install react-router-dom axios @reduxjs/toolkit redux-persist react-redux
//  npm install react-hook-form @hookform/resolvers yup

//--------------# Windows ---------------
// mkdir src\pages
// mkdir src\layout
// mkdir src\utils
// mkdir src\store
// mkdir src\store\features
// mkdir src\validations
// New-Item -Path src\store\store.js -ItemType File
// New-Item -Path src\layout\Layout.jsx -ItemType File
// New-Item -Path src\validations\SchemaValidation.js -ItemType File
// New-Item -Path src\utils\api.js -ItemType File
// New-Item -Path src\store\features\userSlice.js -ItemType File
// New-Item -Path src\pages\Home.jsx -ItemType File

//--------------# linux ---------------
//mkdir -p src/pages src/layout src/utils src/store/features src/validations
//touch src/store/store.js
//touch src/layout/Layout.jsx
//touch src/validations/SchemaValidation.js
//touch src/utils/api.js
//touch src\store\features\userSlice.js
//touch src\pages\Home.jsx





