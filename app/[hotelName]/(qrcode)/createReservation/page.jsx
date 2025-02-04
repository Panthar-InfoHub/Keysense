import { CreateCard } from '@/components/CreateCard'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className=" md:grid md:grid-cols-2 relative h-screen w-full" >

            <div className="md:flex hidden flex-col items-start justify-between py-12 md:p-0 p-8 bg-white" >
                <div className="mx-auto grid w-[350px] gap-6" >

                    <div className='mt-4 text-center text-sm' />
                    <CreateCard />
                </div>
            </div>

            {/* IMAGE PART  */}
            <div className='relative h-screen flex-col items-start justify-center bg-muted text-white flex ' >
                <div className='absolute w-full h-full flex items-start justify-start' >
                    <div className='flex z-10 md:m-10 m-5 flex-col items-start justify-start gap-3' />
                    <Image src="/grandhotel.webp" alt='background' width={1920} height={1080} className='w-full h-full object-cover object-top absolute inset-0' />
                </div>

                {/* // Mobile View */}
                <div className='relative w-full h-full z-20 flex flex-col items-start justify-end text-base font-medium' >
                    <div className='flex md:invisible h-full visible flex-col items-center justify-end w-full' >
                        <CreateCard />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
