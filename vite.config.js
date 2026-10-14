import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration: the React plugin enables JSX and fast refresh.
export default defineConfig({
  plugins: [react()],
})
