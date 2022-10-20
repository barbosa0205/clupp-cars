import React from 'react'
import logo from './assets/logo-clupp.png'
import './App.css'

import { RouterApp } from './router/RouterApp'
import { Button } from './components/Button'
import { useAuth } from './context/useAuth'

function App() {
  const { logout, isAuth } = useAuth()
  return (
    <div className='App'>
      <header className='header'>
        <img src={logo} alt='logo' />
        <div className='logoutContainer'>
          {isAuth && (
            <Button
              padding='.5rem 1.5rem'
              title='cerrar sesión'
              onClick={() => {
                logout()
              }}
            >
              <i className='ri-logout-box-line'></i>
            </Button>
          )}
        </div>
      </header>

      <RouterApp />
    </div>
  )
}

export default App
