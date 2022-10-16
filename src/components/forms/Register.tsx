import React, { useState } from 'react'

import styles from '../../styles/components/forms/login.module.scss'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/useAuth'
import { Input } from '../Input'
import { ShowPassword } from '../ShowPassword'

export const Register = () => {
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  })

  const { errorRegister, register, changeViewScreen } = useAuth()

  const [visible, setVisible] = useState(false)

  const changeVisibility = (visible: boolean) => {
    setVisible(!visible)
  }

  return (
    <>
      <main>
        <h1 className={'title'}>Crear Cuenta</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className={`${styles.form}`}
        >
          <Input
            label='Correo'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'email')
            }
            type={'text'}
          />
          <Input
            label='Contraseña'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'password')
            }
            type={visible ? 'text' : 'password'}
          >
            <ShowPassword
              changeVisibility={() => changeVisibility(visible)}
              visible={visible}
            />
          </Input>
          {errorRegister && <p className='errorText'>{errorRegister}</p>}
          <section className={styles.buttonContainer}>
            <button
              onClick={() => register(email, password)}
              className={styles.button}
              type='submit'
            >
              Crear cuenta
            </button>
          </section>
        </form>

        <p className={styles.text}>
          Ya tienes una cuenta?{' '}
          <small
            onClick={changeViewScreen}
            className={`cursor-pointer ${styles.linkStyle}`}
          >
            Inicia sesión
          </small>
        </p>
      </main>
    </>
  )
}
