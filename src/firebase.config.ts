// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { TChatItem, TUserItem } from 'types'
import { createCollection } from './utils/helpers/firebaseHelper'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string)

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const usersColRef = createCollection<TUserItem>('users')
const chatsColRef = createCollection<TChatItem>('chats')

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, usersColRef, chatsColRef, auth, provider }
