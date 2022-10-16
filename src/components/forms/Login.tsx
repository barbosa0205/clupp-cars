import styles from '../../styles/components/forms/login.module.scss'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/useAuth'
import { Input } from '../Input'
import { ShowPassword } from '../ShowPassword'
import { useState } from 'react'
export const Login = () => {
  const { errorLogin, login, changeViewScreen } = useAuth()

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  })

  const [visible, setVisible] = useState(false)

  const changeVisibility = (visible: boolean) => {
    setVisible(!visible)
  }

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
            type={visible ? 'text' : 'password'}
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'password')
            }
          >
            <ShowPassword
              changeVisibility={() => changeVisibility(visible)}
              visible={visible}
            />
          </Input>

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
