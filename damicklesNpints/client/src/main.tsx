import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import Homepage from './pages/HomePage.tsx'
import Login from './pages/LoginForm.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Homepage />
      },{
        path: '/login',
        element: <Login />  
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)