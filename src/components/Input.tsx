import React from 'react'
import styles from '../styles/components/input.module.scss'

interface Props {
  label: string
  type?: string
  placeholder?: string
  [x: string]: any
}

export const Input = ({
  label,
  type = 'text',
  placeholder = '',
  ...rest
}: Props) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          {...rest}
        ></input>
        <p className={styles.label}>{label}</p>
      </div>
    </>
  )
}
