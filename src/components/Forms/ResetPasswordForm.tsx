import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuth } from '@/firebase/context/authContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../ui/use-toast'
import { authErrorHandler } from '@/firebase/utils/authErrorHandler'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

const ResetPasswordForm = () => {

    const { sendReset } = useAuth()
    const navigate = useNavigate()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const emailSchema = z.object({
        email: z.string().email({
            message: "The email is not valid"
        })
    })

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async ({ email }: z.infer<typeof emailSchema>) => {
        setLoading(true)
        try {
            await sendReset(email)
            toast({
                title: "Email sent",
                description: "Check the email you provided to get a new password.",
            })
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex w-full justify-between'>
                    <Button variant={'ghost'} onClick={() => navigate("/authtest/login")}>Back</Button>
                    {loading ?
                        <Button className='flex' disabled type='submit'>
                            <ReloadIcon className='mr-2 animate-spin' />
                            Reset
                        </Button>
                        :
                        <Button type='submit'>Reset</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default ResetPasswordForm