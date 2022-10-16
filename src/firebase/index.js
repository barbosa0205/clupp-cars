import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAmY2iWNcyYeuw3bFj2yEuPsltv2D5Hfw',

  authDomain: 'clupp-cars.firebaseapp.com',

  projectId: 'clupp-cars',

  storageBucket: 'clupp-cars.appspot.com',

  messagingSenderId: '931332611939',

  appId: '1:931332611939:web:f072c6c16df32eebad7d56',
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)

export const store = getStorage()
export const db = getFirestore(app)
