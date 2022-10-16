import React, { useEffect, useState } from 'react'
import { Search } from './Search'
import styles from '../styles/components/carsList.module.scss'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { async } from '@firebase/util'
import { useAuth } from '../context/useAuth'
import { collection, getDocs, doc, setDoc, query } from 'firebase/firestore'
import { db } from '../firebase'
import { CarItem } from './CarItem'

import { Cars } from '../interfaces/Cars.interface'

export const CarsList = () => {
  const navigate = useNavigate()

  const { searchWord } = useAuth()

  const [cars, setCars] = useState<Cars[]>()

  const deleteItemFromArray = (data: Cars, id: string) => {
    setDoc(doc(db, 'vehicles', id), {
      ...data,
      delete: true,
    })
    const newArray = cars?.filter((car) => car.id !== id)
    setCars(newArray)
  }

  const getCarsFromUser = async () => {
    try {
      let vehiclesArray: Cars[] = []
      const querySnapshot = await getDocs(collection(db, 'vehicles'))
      querySnapshot.forEach(async (vehicle) => {
        const data = vehicle.data()
        const vehicleId = vehicle.id
        vehiclesArray.push({
          brand: data.brand,
          model: data.model,
          year: data.year,
          timestamp: data.timestamp,
          delete: data.delete,
          frontPictureURL: data.frontPictureURL,
          id: vehicleId,
        })
      })
      setCars(vehiclesArray)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCarsFromUser()
  }, [])

  useEffect(() => {
    if (!searchWord) {
      getCarsFromUser()
    }
    const newArray = cars?.filter((c) => {
      const title = `${c.brand.toLowerCase()} ${c.model.toLowerCase()} ${
        c.year
      }`.trim()

      console.log(title)

      if (title.indexOf(searchWord) !== -1) {
        return c
      }
    })

    setCars(newArray)
  }, [searchWord])

  return (
    <main className={styles.container}>
      <section className={styles.buttonContainer}>
        <Button
          text='Dar de alta vehiculo'
          padding='1rem'
          textSize='1.4rem'
          onClick={() => navigate('/carsForm')}
        />
      </section>
      <Search />
      {searchWord ? (
        !cars?.length ? (
          <section className={styles.noHaveCars}>
            <p>No se encontraron vehiculos dados de alta</p>
          </section>
        ) : (
          <>
            <section className={styles.carsListContainer}>
              {cars.map(
                (car) =>
                  !car.delete && (
                    <CarItem
                      key={car.id}
                      data={car}
                      deleteItemFromArray={deleteItemFromArray}
                    />
                  )
              )}
            </section>
          </>
        )
      ) : (
        <>
          {!cars?.length ? (
            <section className={styles.noHaveCars}>
              <p>No cuenta con vehiculos dados de alta</p>
            </section>
          ) : (
            <section className={styles.carsListContainer}>
              {cars.map(
                (car) =>
                  !car.delete && (
                    <CarItem
                      key={car.id}
                      data={car}
                      deleteItemFromArray={deleteItemFromArray}
                    />
                  )
              )}
            </section>
          )}
        </>
      )}
    </main>
  )
}
