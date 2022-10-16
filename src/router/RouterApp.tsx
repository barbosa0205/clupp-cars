import { BrowserRouter, Routes, Route, Link, redirect } from 'react-router-dom'
import App from '../App'

import { Home } from '../pages/Home'
import { CarsFormPage } from '../pages/CarsFormPage'
import { useAuth } from '../context/useAuth'

export const RouterApp = () => {
  const { isAuth } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='carsForm' element={<CarsFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}
