import React from 'react'
import logo from './assets/logo-clupp.png'
import './App.css'
import { AuthContextProvider } from './context/authContext'
import { RouterApp } from './router/RouterApp'

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <img src={logo} />
      </header>
      <AuthContextProvider>
        <RouterApp />
      </AuthContextProvider>
    </div>
  )
}

export default App
