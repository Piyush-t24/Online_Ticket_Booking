import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {motion} from 'framer-motion'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-indigo-300">
        <motion.div
          className="text-4xl font-bold text-indigo-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          MuseoPass
        </motion.div>
        <motion.div
          className="text-lg text-indigo-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Preserving culture
        </motion.div>
        <motion.div
          className="animate-spin rounded-full border-t-4 border-b-4 border-indigo-800 h-16 w-16"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
    </>
  )
}

export default App
