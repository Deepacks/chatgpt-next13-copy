import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyABLad7nt9V4K9g8uZa4t0YxbGVI7-jzzM',
  authDomain: 'chatgpt-messenger-be5c0.firebaseapp.com',
  projectId: 'chatgpt-messenger-be5c0',
  storageBucket: 'chatgpt-messenger-be5c0.appspot.com',
  messagingSenderId: '274601911713',
  appId: '1:274601911713:web:d48ba2b13f959f4fe0d7e0',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
