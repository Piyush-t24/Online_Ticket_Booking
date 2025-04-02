import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyProfile from './MyProfile'
import MyTickets from './MyTickets'
import PurchaseHistory from './PurchaseHistory'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const UserDashBoard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('profile'); // Default to 'MyProfile'
  const [resData, setResData] = useState(null)
  // console.log("MyProfile", resData)
  const getData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_HOST}/user`,
        {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        }
      )
      if (!res.ok) {
        window.location.href = "/register";
        throw new Error('user not logged in!')
      }
      const data = await res.json()
      setResData(data)
      // console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const DashNav = [
    {
      active: "profile",
      icon: "fas fa-user",
      name: "My Profile"
    },
    {
      active: "tickets",
      icon: "fas fa-ticket-alt",
      name: "My Tickets"
    },
    {
      active: "history",
      icon: "fas fa-history",
      name: "Purchase History"
    },
  ]

  return (
    <>
      {resData && resData.email ?
        <section id="user-dashboard" className="py-16 bg-gray-100 h-[100vh] min-w-[300px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 bg-gray-800 p-6">
                  <div className="flex items-center justify-center md:justify-start mb-8">
                    <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="object-cover w-16 h-16 rounded-full overflow-hidden bg-gray-600" />
                    <div className="ml-4 text-white w-1/2">
                      <p className="font-bold">Hi! {resData.name.firstname}</p>
                      <p className="text-gray-400 text-sm break-words ">{resData.email}</p>
                    </div>
                  </div>

                  <nav className="min-w-[250px] space-y-2">
                    {DashNav.map((items, index) => {
                      return (
                        <button key={index} onClick={() => setActiveComponent(items.active)} className={`flex items-center text-white ${activeComponent === items.active && "bg-gray-700"} hover:bg-gray-700 px-4 py-2 rounded-lg gap-2`}>
                          <i className={`${items.icon} w-6 flex justify-center items-center`}></i>
                          <span>{items.name}</span>
                        </button>
                      )
                    })}
                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 gap-2 w-fit">
                      <i className="fas fa-home w-6 flex justify-center items-center"></i>
                      <span>Back To Home</span>
                    </button>
                  </nav>
                </div>
                {
                  (() => {
                    switch (activeComponent) {
                      case 'history':
                        return <PurchaseHistory />;
                      case 'profile':
                        return <MyProfile />;
                      case 'tickets':
                        return <MyTickets />;
                      default:
                        return <MyProfile />;
                    }
                  })()
                }
              </div>
            </div>
          </div>
        </section> :
        <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
          <Loading type="spinningBubbles" color="blue" />
        </div>
      }
    </>
  )
}

export default UserDashBoard
