import ResetPasswordForm from "@/components/Forms/ResetPasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ResetPasswordRoute = () => {
    return (
        <div className="flex w-full h-dvh items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>Reset password of an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordRoute