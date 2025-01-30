import LoginForm from '@/components/LoginForm'
import React from 'react'

const page = () => {
    return (
        <section className='py-14 px-4 w-full overflow-hidden ' >

            <h1 className='text-2xl font-bold' > Dashboard </h1>

            <div>
                <LoginForm />
            </div>
        </section>
    )
}

export default page