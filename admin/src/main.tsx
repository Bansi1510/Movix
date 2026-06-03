import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReduxProvider from './provides/ReduxProvider.tsx'
import Layout from './Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <Layout>
        <App />
      </Layout>
    </ReduxProvider>
  </StrictMode>,
)
