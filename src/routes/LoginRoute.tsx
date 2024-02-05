import LoginForm from "@/components/Forms/LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const LoginRoute = () => {
    return (
        <div className="flex w-full h-dvh items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Log In</CardTitle>
                    <CardDescription>Log in to access to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginRoute