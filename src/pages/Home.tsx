import React, { useEffect, useState } from 'react'
import { Login } from '../components/forms/Login'
import { Register } from '../components/forms/Register'
import { useAuth } from '../context/useAuth'
import { CarsList } from '../components/CarsList'

export const Home = () => {
  const { user, isAuth, viewLoginScreen } = useAuth()

  return (
    <>
      {!isAuth ? (
        <>{viewLoginScreen ? <Login /> : <Register />}</>
      ) : (
        <>
          <CarsList />
        </>
      )}
    </>
  )
}
