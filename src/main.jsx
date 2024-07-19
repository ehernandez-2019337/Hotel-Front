import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Main = () => {
  const elemntRoutes = useRoutes(routes)
  return (
    <>
      {elemntRoutes}
      <Toaster position='bottom-rigth' reverseOrder={false}/>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>
  </React.StrictMode>,
)
