import './App.css'
import Home from './features/home/Home'
import UserDashBoard from './features/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MuseumPage from './features/museum/MuseumPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ContextUserInfo } from './context/context'
import { useState } from 'react'
import RegisterDefault from './features/auth/register/RegisterDefault'
import LoginDefault from './features/auth/login/LoginDefault'
import { ToastContainer, Bounce } from 'react-toastify'

function App() {

  const [userInfo, setUserInfo] = useState(
    {
      name: { firstname: "", lastname: "" },
      email: "",
      password: "",
      confirmPassword: "",
      otpStatus: false,
    }
  )

  return (
    <>
      <BrowserRouter basename="/client">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ContextUserInfo.Provider value={{ userInfo, setUserInfo }}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<UserDashBoard />} />

              <Route path="/login" element={<LoginDefault />} />
              <Route path='/register' element={<RegisterDefault />} />


              <Route path="/museum" element={<MuseumPage />} />
            </Routes>
          </ContextUserInfo.Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
