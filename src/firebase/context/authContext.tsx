import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    onAuthStateChanged,
    sendPasswordResetEmail,
    User,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} from 'firebase/auth'
import { auth } from "../app";

interface AuthProvider {
    user: User | null,
    logIn(email: string, password: string, persistence: boolean): Promise<void>,
    signUp(email: string, password: string, persistence: boolean): Promise<void>,
    logInGoogle(): Promise<void>,
    logInFacebook(): Promise<void>,
    signOut(): Promise<void>,
    sendReset(email: string): Promise<void>
}

const authContext = createContext<AuthProvider | undefined>(undefined)

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error("There is no auth context")
    }
    return context
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const logIn = async (email: string, password: string, persistence: false) => {
        await setPersistence(auth, persistence ? browserLocalPersistence : browserSessionPersistence)
        await signInWithEmailAndPassword(auth, email, password)
    }

    const signUp = async (email: string, password: string, persistence: false) => {
        await setPersistence(auth, persistence ? browserLocalPersistence : browserSessionPersistence)
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const signOut = async () => await signOutFirebase(auth)

    const sendReset = async (email: string) => await sendPasswordResetEmail(auth, email)

    const logInGoogle = async () => { await signInWithPopup(auth, googleProvider) }

    const logInFacebook = async () => { await signInWithPopup(auth, facebookProvider) }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user))
        return () => unsubscribe()
    }, [])


    return <authContext.Provider value={{ logIn, sendReset, signOut, signUp, user, logInGoogle, logInFacebook }}>{children}</authContext.Provider>
}