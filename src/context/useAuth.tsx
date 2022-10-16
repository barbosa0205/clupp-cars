import { useContext } from 'react'
import { AuthContext } from './authContext'

export const useAuth = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}
