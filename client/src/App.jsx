import './App.css'
import Home from './components/home/Home'
import UserDashBoard from './components/dashboard/UserDashBoard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MuseumPage from './components/museum/MuseumPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ContextUserInfo } from './components/context/context'
import  { useState } from 'react'
import RegisterDefault from './components/RegLog/register/RegisterDefault'
import LoginDefault from './components/RegLog/login/LoginDefault'

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
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ContextUserInfo.Provider value={{ userInfo, setUserInfo }}>
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
