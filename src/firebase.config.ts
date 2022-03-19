// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtWp1SvkgBiHtYHyFoFVEJZHLTaNzuiCM',
  authDomain: 'whatsapp-2-b3705.firebaseapp.com',
  projectId: 'whatsapp-2-b3705',
  storageBucket: 'whatsapp-2-b3705.appspot.com',
  messagingSenderId: '1081949004743',
  appId: '1:1081949004743:web:8f5308aaf61db8cf046fe2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const usersColRef = collection(db, 'users')
const chatsColRef = collection(db, 'chats')

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, usersColRef, chatsColRef, auth, provider }
