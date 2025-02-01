"use client"

import { loginUser } from '@/lib/actions'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const LoginForm = () => {
    const [errors, setErrors] = useState({})
    const router = useRouter();

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const res = await loginUser(formData)
            if (res?.status === "SUCCESS") {
                console.log("RES INFORM :", res)
                router.push(`/${res.data.hotelName}/admin`)
                return { status: "SUCCESS" }
            }
        } catch (error) {
            console.log("ERROR : ", error)
            return { status: "ERROR", error: error.message }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='text-neutral-800 text-xs flex flex-col gap-4'  >
            <div>
                <label htmlFor="username" className='' > Username </label>
                <Input id="username" name="username" required className='border  border-black/80 bg-transparent placeholder:text-neutral-800' placeholder="Enter User name" />
                {errors.username && <p className='startup-form_error'> {errors.username} </p>}
            </div>

            <div>
                <label htmlFor="password" className='startup-form_label' > Password </label>
                <Input id="password" type="password" name="password" required className='border  border-black/80 bg-transparent placeholder:text-neutral-800' placeholder="Enter Password" />
                {errors.password && <p className='startup-form_error'> {errors.password} </p>}
            </div>


            <Button type="submit" className="bg-neutral-800 text-white hover:!bg-neutral-600 transition-all duration-300 ease-in-out w-fit" disbaled={isPending.toString()} >
                {isPending ? 'Signing in...' : 'Sign In'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default LoginForm