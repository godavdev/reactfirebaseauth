import Alert from "@/components/Alert/Alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/firebase/context/authContext"
import { useEffect } from "react"

const App = () => {

    const { signOut } = useAuth()
    const { toast } = useToast()
    useEffect(() => {
        toast({
            title: "Welcome",
            description: "Welcome to your aplication!"
        })
    }, [])

    return (
        <div className="flex w-full h-dvh items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                    <CardDescription>This is just an example</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Alert onAction={signOut} />
                </CardContent>
            </Card>
        </div>
    )
}

export default App