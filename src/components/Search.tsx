import React from 'react'
import { Input } from './Input'
import styles from '../styles/components/search.module.scss'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../context/useAuth'
export const Search = () => {
  const { changeSearchWord } = useAuth()
  const { search, onChange } = useForm({
    search: '',
  })

  return (
    <div className={styles.searchContainer}>
      <Input
        label='Búsqueda'
        placeholder='Ingresa la marca modelo u año'
        onChange={({ target }: { target: HTMLInputElement }) => {
          onChange(target.value, 'search')
          changeSearchWord(target.value)
        }}
      />
    </div>
  )
}
