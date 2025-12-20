import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'





import 'sweetalert2/src/sweetalert2.scss'
import AdminApp from './Admin/AdminApp'






createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  

 <AdminApp/>


  </StrictMode>,
)
