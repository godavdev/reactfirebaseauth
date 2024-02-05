import { useAuth } from '@/firebase/context/authContext'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, authentication = true }: { children: ReactNode, authentication?: boolean }) => {
    const { user } = useAuth()

    if (!authentication) {
        if (user) return <Navigate to="/authtest/"/>
        return children
    }

    if (!user) return <Navigate to="/authtest/login"/>
    return children
}

export default PrivateRoute