import React, { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import styles from '../styles/components/pages/carsForm.module.scss'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import noPhoto from '../assets/no-photo.png'
import { useForm } from '../hooks/useForm'
import { useEffect } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { db } from '../firebase'

interface Errors {
  image?: string
  brand?: string
  model?: string
  year?: string
}

export const CarsFormPage = () => {
  const [carImagePreview, setCarImagePreview] = useState('')

  const [loading, setLoading] = useState(false)

  const [imageObj, setImageObj] = useState<Blob | any>({})

  const [errorsText, setErrorsText] = useState<Errors>()

  const navigate = useNavigate()
  const { brand, model, year, onChange } = useForm({
    brand: '',
    model: '',
    year: undefined,
  })

  const { isAuth } = useAuth()

  const onDrop = useCallback((acceptedFiles: Object[]) => {
    // Do something with the files

    let imageUrl: {
      preview?: any
    } = {}
    acceptedFiles.map((file: Object | Blob | any) => {
      imageUrl = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    })

    setImageObj(imageUrl)
    setCarImagePreview(imageUrl.preview)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/svg': [],
    },
    onDrop,
  })

  const checkErrors = () => {
    let errors: Errors = {}
    if (!Object.keys(imageObj).length) {
      errors = {
        ...errors,
        image: 'El Formulario debe incluir una imagen',
      }
    } else {
      errors = {
        ...errors,
        image: '',
      }
    }
    if (!brand) {
      errors = {
        ...errors,
        brand: 'El campo Marca no puede estar vacio',
      }
    } else {
      errors = {
        ...errors,
        brand: '',
      }
    }
    if (!model) {
      errors = {
        ...errors,
        model: 'El campo Modelo no puede estar vacio',
      }
    } else {
      errors = {
        ...errors,
        model: '',
      }
    }
    if (!year) {
      errors = {
        ...errors,
        year: 'El campo Año no puede estar vacio',
      }
    } else {
      errors = {
        ...errors,
        year: '',
      }
    }

    return errors
  }

  const addVehicle = async () => {
    setLoading(true)
    const errors = checkErrors()
    if (errors.image || errors.brand || errors.model || errors.year) {
      setErrorsText(errors)
      setLoading(false)
      return
    } else {
      const storage = getStorage()
      const storageRef = ref(storage, `cars/${nanoid()}`)
      await uploadBytes(storageRef, imageObj)
      const downloadUrl = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'vehicles'), {
        brand,
        model,
        year,
        frontPictureURL: downloadUrl,
        deleted: false,
        timestamp: serverTimestamp(),
      })
      navigate('/')
    }
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [])

  return (
    <main>
      <h1 className='title'>Añadir un vehiculo</h1>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div
          style={{
            margin: '0 3rem',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {carImagePreview ? (
            <img className={styles.image} src={carImagePreview} alt='nophoto' />
          ) : (
            <img className={styles.image} src={noPhoto} alt='nophoto' />
          )}
          {errorsText?.image && <p className='errorText'>{errorsText.image}</p>}
        </div>
        <div>
          <Input
            label='Marca'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'brand')
            }
          />
          {errorsText?.brand && <p className='errorText'>{errorsText.brand}</p>}
          <Input
            label='Modelo'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'model')
            }
          />
          {errorsText?.model && <p className='errorText'>{errorsText.model}</p>}
          <Input
            label='Año'
            type='number'
            onChange={({ target }: { target: HTMLInputElement }) =>
              onChange(target.value, 'year')
            }
          />
          {errorsText?.year && <p className='errorText'>{errorsText.year}</p>}
        </div>
      </form>
      <section className={styles.buttonContainer}>
        {loading ? (
          <Button text='Cargando...' padding='1rem' />
        ) : (
          <Button text='Agregar vehiculo' padding='1rem' onClick={addVehicle} />
        )}
      </section>
    </main>
  )
}
