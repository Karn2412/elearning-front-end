import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { UserContextProvider } from './context/Context.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'


export const server = "https://e-learning-server-ssan.onrender.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserContextProvider>
   <CourseContextProvider>
   <App />
   </CourseContextProvider>
   </UserContextProvider>
  </StrictMode>,
)
