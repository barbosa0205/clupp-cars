import React from 'react'
import styles from '../styles/components/input.module.scss'
import { ReactNode } from 'react'

interface Props {
  label: string
  type?: string
  placeholder?: string
  children?: ReactNode
  [x: string]: any
}

export const Input = ({
  label,
  type = 'text',
  placeholder = '',
  children,
  ...rest
}: Props) => {
  return (
    <>
      <div className={styles.inputContainer}>
        {children}
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
