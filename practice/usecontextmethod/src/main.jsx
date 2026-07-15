
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProviderContext } from './context/PracticeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ProviderContext>
    <App />
  </ProviderContext>,
)
