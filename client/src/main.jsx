import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/styles.css'

createRoot(document.getElementById('root')).render(
  <strictMode>
    <App />
  </strictMode>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
