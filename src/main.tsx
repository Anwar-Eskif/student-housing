import './index.css'
import { createRoot } from 'react-dom/client'
import QueryProvider from './providers/QueryProvider'


createRoot(document.getElementById('root')!).render(
  <QueryProvider/>
)
