import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Leaflet's own stylesheet must be loaded or the map tiles and controls render broken.
import 'leaflet/dist/leaflet.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
