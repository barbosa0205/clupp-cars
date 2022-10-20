import React from 'react'
import styles from '../styles/components/button.module.scss'

interface Props {
  text?: string
  padding?: string
  textSize?: string
  title?: string
  children?: React.ReactNode
  [x: string]: any
}

export const Button = ({
  text,
  padding,
  title,
  textSize = '1.6rem',
  children,
  ...rest
}: Props) => {
  return (
    <button
      title={title}
      className={styles.button}
      style={{
        padding: padding,
        fontSize: textSize,
      }}
      {...rest}
    >
      {text}
      {children}
    </button>
  )
}
