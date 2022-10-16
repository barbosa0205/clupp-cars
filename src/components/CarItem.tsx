import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../styles/components/cartItem.module.scss'
import { Cars } from '../interfaces/Cars.interface'

export const CarItem = ({
  deleteItemFromArray,
  data,
}: {
  deleteItemFromArray: (data: Cars, id: string) => void
  data: Cars
}) => {
  return (
    <article className={styles.container}>
      <i
        className={styles.deleteIcon}
        onClick={() => deleteItemFromArray(data, data.id)}
      >
        <DeleteIcon />
      </i>

      <img
        className={styles.image}
        src={data.frontPictureURL}
        alt={data.brand}
      />
      <p className={styles.title}>
        {data.brand} {data.model} {data.year}
      </p>
    </article>
  )
}
