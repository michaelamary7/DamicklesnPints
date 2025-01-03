import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import Homepage from './pages/HomePage.tsx'
import Login from './pages/LoginForm.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import MenuPage from './pages/MenuPage.tsx'
import ReservationPage from './pages/ReservationPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },{
        path: '/login',
        element: <Login />  
      },{
        path: '/menu',
        element: <MenuPage />
      },{
        path: '/reservation',
        element: <ReservationPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
