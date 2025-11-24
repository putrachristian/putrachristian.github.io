import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import App from './App.jsx'
import { ThemeProvider } from '@/components/theme-provider'
import { ApiProvider } from '@/context/ApiContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <App />
      </ThemeProvider>
    </ApiProvider>
  </StrictMode>,
)
