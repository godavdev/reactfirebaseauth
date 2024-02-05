import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyClMi49RzrB4zxh6c6P2zSGc1psRYnUmGs",
    authDomain: "example-fb-70549.firebaseapp.com",
    projectId: "example-fb-70549",
    storageBucket: "example-fb-70549.appspot.com",
    messagingSenderId: "685802236557",
    appId: "1:685802236557:web:569a483ce26118e40850c4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
