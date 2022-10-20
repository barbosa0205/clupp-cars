import { createContext, ReactNode, useEffect, useState } from 'react'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/index'

interface Props {
  children: ReactNode
}

interface AuthContextProps {
  isAuth: boolean
  viewLoginScreen: boolean
  user: Object
  errorLogin: string
  errorRegister: string
  searchWord: string
  changeSearchWord: (word: string) => void
  login: (email: string, password: string) => void
  register: (email: string, password: string) => void
  logout: () => void
  changeViewScreen: () => void
}
export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({
    uid: '',
    signedIn: false,
    email: '',
  })
  const [isAuth, setIsAuth] = useState(false)

  const [errorLogin, setErrorLogin] = useState('')
  const [errorRegister, setErrorRegister] = useState('')

  const [searchWord, setSearchWord] = useState('')

  const [viewLoginScreen, setViewLoginScreen] = useState(true)

  const changeSearchWord = (searchWord: string) => {
    setSearchWord(searchWord)
  }

  const checkLoginErrors = (email: string, passoword: string) => {
    if (!email || !passoword) {
      return 'Rellene los campos correctamente'
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const error = checkLoginErrors(email, password)
      if (error) {
        setErrorLogin(`${error}`)
        return
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user
      setUser({
        uid: user.uid,
        signedIn: true,
        email,
      })
      setIsAuth(true)
    } catch (error: any) {
      setErrorLogin('correo o contraseña invalido')
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const error = checkLoginErrors(email, password)
      if (error) {
        setErrorRegister(`${error}`)
        return
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user
      setUser({
        uid: user.uid,
        signedIn: true,
        email,
      })
      setIsAuth(true)
    } catch (error) {
      setErrorRegister('error en campos correo o contraseña')
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const changeViewScreen = () => {
    setViewLoginScreen(!viewLoginScreen)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser({
          email: data.email ? data.email : '',
          signedIn: true,
          uid: data.uid,
        })
        setIsAuth(true)
      } else {
        setUser({
          email: '',
          uid: '',
          signedIn: false,
        })
        setIsAuth(false)
      }
    })
  }, [])

  const value: AuthContextProps = {
    register,
    login,
    isAuth,
    viewLoginScreen,
    changeViewScreen,
    user,
    errorLogin,
    errorRegister,
    searchWord,
    changeSearchWord,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
