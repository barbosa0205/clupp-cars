import React from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import styles from '../styles/components/showPassword.module.scss'

export const ShowPassword = ({
  visible = false,
  changeVisibility,
}: {
  visible?: boolean
  changeVisibility: () => void
}) => {
  return (
    <>
      <p className={styles.eye} onClick={() => changeVisibility()}>
        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </p>
    </>
  )
}
