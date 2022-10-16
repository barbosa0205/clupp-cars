import React, { useEffect, useState } from 'react'
import { Login } from '../components/forms/Login'
import { Register } from '../components/forms/Register'

export const Auth = () => {
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)

  useEffect(() => {}, [])

  return (
    <>
      <Login />
    </>
  )
}
