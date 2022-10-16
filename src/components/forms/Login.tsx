import React from 'react'

import styles from '../../styles/components/forms/login.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/useAuth'
import { Input } from '../Input'
export const Login = () => {
  const { errorLogin, login, changeViewScreen } = useAuth()

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  })

  return (
    <>
      <main>
        <h1 className='title'>Iniciar sesión</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className={`${styles.form}`}
        >
          <Input
            label='correo'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'email')
            }
          />
          <Input
            label='contraseña'
            type='password'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'password')
            }
          />

          {errorLogin && <p className='errorText'>{errorLogin}</p>}

          <section className={styles.buttonContainer}>
            <button
              onClick={() => login(email, password)}
              className={styles.button}
              type='submit'
            >
              Iniciar sesión
            </button>
          </section>
        </form>
        <p className={styles.text}>
          ¿No tienes una cuenta?{' '}
          <small
            onClick={changeViewScreen}
            className={`cursor-pointer ${styles.linkStyle}`}
          >
            Registrate
          </small>
        </p>
      </main>
    </>
  )
}
