import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './routes/App'
import LoginRoute from './routes/LoginRoute'
import SignupRoute from './routes/SignupRoute'
import { ThemeProvider } from './components/ui/theme-provider'
import { AuthProvider } from './firebase/context/authContext'
import PrivateRoute from './routes/PrivateRoute'
import ResetPasswordRoute from './routes/ResetPasswordRoute'
import { Toaster } from './components/ui/toaster'

const router = createBrowserRouter([
  {
    path: "/authtest/", //localhost:3000/
    element: <PrivateRoute><App /></PrivateRoute>
  },
  {
    path: "/authtest/login", //localhost:3000/login
    element: <PrivateRoute authentication={false}><LoginRoute /></PrivateRoute>
  },
  {
    path: "/authtest/signup", //localhost:3000/signup
    element: <PrivateRoute authentication={false}><SignupRoute /></PrivateRoute>
  },
  {
    path: "/authtest/resetPassword", //localhost:3000/signup
    element: <PrivateRoute authentication={false}><ResetPasswordRoute /></PrivateRoute>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
