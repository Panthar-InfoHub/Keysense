"use client"

import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { loginUser } from '@/lib/actions'

const LoginForm = () => {
    const [errors, setErrors] = useState({})
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const res = await loginUser(formData)
            if (res.status === "SUCCESS") {
                router.push(`/${res.data.hotelName}/admin`)
            }
        } catch (error) {
            console.log("ERROR : ", error)
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='startup-form'  >
            <div>
                <label htmlFor="username" className='startup-form_label' > Username </label>
                <Input id="username" name="username" required className='startup-form_input' placeholder="Enter User name" />
                {errors.username && <p className='startup-form_error'> {errors.username} </p>}
            </div>

            <div>
                <label htmlFor="password" className='startup-form_label' > password </label>
                <Input id="password" type="password" name="password" required className='startup-form_input' placeholder="Enter Password" />
                {errors.password && <p className='startup-form_error'> {errors.password} </p>}
            </div>


            <Button type="submit" className="startup-form_btn text-bg-white" disbaled={isPending.toString()} >
                {isPending ? 'Signing in...' : 'Sign In'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default LoginForm