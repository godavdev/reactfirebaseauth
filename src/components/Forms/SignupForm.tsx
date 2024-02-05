import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { authSchema } from "@/schemas/authSchema"
import { useAuth } from "@/firebase/context/authContext"
import { authErrorHandler } from "@/firebase/utils/authErrorHandler"
import { useToast } from "../ui/use-toast"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Checkbox } from "../ui/checkbox"

const SignupForm = () => {

    const navigate = useNavigate()
    const { signUp } = useAuth()
    const { toast } = useToast()
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
            await signUp(email, password, persistence)
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
                            <FormDescription>This is the email that is going to display</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormDescription>You are going to use this for your login</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <div className=" flex w-full justify-between">
                    <Button onClick={() => navigate("/reactfirebaseauth/login")} variant={"ghost"}>Login</Button>
                    {loading ?
                        <Button disabled type="submit">
                            <ReloadIcon className="animate-spin mr-2" />
                            Submit
                        </Button>
                        :
                        <Button type="submit">Submit</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default SignupForm