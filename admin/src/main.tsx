import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReduxProvider from './provides/ReduxProvider.tsx'
import Layout from './Layout.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"

        />
        <App />
      </Layout>
    </ReduxProvider>
  </StrictMode>,
)
