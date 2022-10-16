import React from 'react'
import styles from '../styles/components/button.module.scss'

interface Props {
  text: string
  padding?: string
  textSize?: string
  [x: string]: any
}

export const Button = ({
  text,
  padding,
  textSize = '1.6rem',
  ...rest
}: Props) => {
  return (
    <button
      className={styles.button}
      style={{
        padding: padding,
        fontSize: textSize,
      }}
      {...rest}
    >
      {text}
    </button>
  )
}
