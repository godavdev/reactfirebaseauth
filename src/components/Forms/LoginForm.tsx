import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { authSchema } from '@/schemas/authSchema'
import { useAuth } from "@/firebase/context/authContext"
import { authErrorHandler } from "@/firebase/utils/authErrorHandler"
import { useToast } from "../ui/use-toast"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Checkbox } from "../ui/checkbox"


const LoginForm = () => {

    const { logIn, logInGoogle, logInFacebook } = useAuth()
    const { toast } = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
            persistence: false
        }
    })

    const onSubmit = async ({ email, password, persistence }: z.infer<typeof authSchema>) => {
        setLoading(true)
        try {
            await logIn(email, password, persistence)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast({
                title: "Something went wrong...",
                description: authErrorHandler(error),
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full justify-between">
                        <FormField
                            control={form.control}
                            name="persistence"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-y-0 space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-xs">Keep me logged in</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button asChild variant={"link"} className="text-xs px-0">
                            <Link to={"/authtest/resetPassword"}>Reset password</Link>
                        </Button>
                    </div>
                </div>
                <div className=" flex w-full justify-between">
                    <Button onClick={() => navigate("/authtest/signup")} variant={"ghost"}>Signup</Button>
                    {loading ?
                        <Button disabled type="submit">
                            <ReloadIcon className="animate-spin mr-2" />
                            Submit
                        </Button>
                        :
                        <Button type="submit">Submit</Button>
                    }
                </div>
                <div className=" w-fit text-sm m-2 mx-auto">or</div>
                <div className="flex flex-col items-center space-y-2">
                    <Button type="button" onClick={logInGoogle} className="w-fit" variant={"outline"} >
                        <svg
                            className="size-5 mr-2"
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                        >
                            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
                        </svg>
                        Log in with Google
                    </Button>
                    <Button type="button" onClick={logInFacebook} className="w-fit" variant={"outline"}>
                        <svg
                            fill="none"
                            className="size-5 mr-2"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"
                            />
                        </svg>
                        Log in with Facebook
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm