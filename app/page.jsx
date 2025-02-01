'use client'
import LoginForm from '@/components/LoginForm'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { checkCookie, getName } from '@/lib/actions'
import { Building, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getName();
                if (res?.status === "SUCCESS" && res?.name) {
                    router.push(`/${res.name}/admin`);
                }
            } catch (error) {
                console.error("Error fetching name:", error);
            }
        };
        fetchData();
    }, [router]);

    return (
        <div className=" md:grid md:grid-cols-2 relative h-screen w-full" >
            <div className='relative h-screen flex-col items-start justify-center bg-muted text-white flex ' >
                <div className='absolute w-full h-full flex items-start justify-start' >
                    <div className='flex z-10 md:m-10 m-5 flex-col items-start justify-start gap-3' >

                    </div>
                    <Image src="/grandhotel.webp" alt='background' width={1920} height={1080} className='w-full h-full object-cover object-top absolute inset-0' />
                </div>
                <div className='relative w-full h-full z-20 flex flex-col items-start justify-end text-base font-medium' >
                    <div className='flex md:invisible h-full visible flex-col items-center justify-end w-full' >
                        <Tabs defaultValue="user" className="grid bg-white rounded-lg p-6 gap-4">

                            <TabsContent value="user" className="flex flex-col gap-8" >
                                <div className='grid gap-2 text-center ' >
                                    <h1 className='text-2xl font-medium text-center flex flex-col items-center justify-center text-neutral-800' >
                                        <span className='text-4xl' > 🙏 </span>
                                        <div> Welcome </div>
                                    </h1>

                                    <p className='text-balance !text-xs text-muted-foreground' > Please Enter your reservartion ID to use hotel services. </p>
                                </div>
                                <div className='grid gap-4 text-neutral-800 text-xs' >
                                    <label htmlFor="id"> Reservation ID </label>
                                    <Input id="reservation" name="reservation" className="border  border-black/80 bg-transparent placeholder:text-neutral-800 " placeholder="EX : RJS1425" />
                                </div>
                            </TabsContent>

                            <TabsContent value="hotel" className="flex flex-col gap-8" >
                                <div className='grid gap-2 text-center text-neutral-800' >
                                    <h1 className='text-2xl font-medium text-center flex flex-col items-center justify-center' >
                                        <div> Hotel Login </div>
                                    </h1>

                                    <p className='text-balance !text-xs text-muted-foreground' > Please Enter your credentials to access dashboard. </p>
                                </div>
                                <div className='grid gap-4 ' >
                                    <LoginForm />
                                </div>
                            </TabsContent>

                            <TabsList className="text-sm flex flex-col gap-4 font-bold" >
                                <TabsTrigger value="user" className="!p-2 bg-black/40 flex justify-center items-center gap-2 " > <User className='size-5' /> User Login </TabsTrigger>
                                <TabsTrigger value="hotel" className="!p-2 flex justify-center items-center !text-black/80 shadow-sm border bg-white gap-3 data-[state=active]:!text-white"  > <Building className='size-5' />  Hotel Login</TabsTrigger>
                            </TabsList>

                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="md:flex hidden flex-col items-start justify-between py-12 md:p-0 p-8 bg-white" >
                <div className="mx-auto grid w-[350px] gap-6" >

                    <div className='mt-4 text-center text-sm' ></div>

                    <Tabs defaultValue="user" className="grid h-full gap-4">

                        <TabsContent value="user" className="flex flex-col gap-8" >
                            <div className='grid gap-2 text-center ' >
                                <h1 className='text-2xl font-medium text-center flex flex-col items-center justify-center text-neutral-800' >
                                    <span className='text-4xl' > 🙏 </span>
                                    <div> Welcome </div>
                                </h1>

                                <p className='text-balance !text-xs text-muted-foreground' > Please Enter your reservartion ID to use hotel services. </p>
                            </div>
                            <div className='grid gap-4 text-neutral-800 text-xs' >
                                <label htmlFor="id"> Reservation ID </label>
                                <Input id="reservation" name="reservation" className="border  border-black/80 bg-transparent placeholder:text-neutral-800 " placeholder="EX : RJS1425" />
                            </div>
                        </TabsContent>

                        <TabsContent value="hotel" className="flex flex-col gap-8" >
                            <div className='grid gap-2 text-center text-neutral-800' >
                                <h1 className='text-2xl font-medium text-center flex flex-col items-center justify-center' >
                                    <div> Hotel Login </div>
                                </h1>

                                <p className='text-balance !text-xs text-muted-foreground' > Please Enter your credentials to access dashboard. </p>
                            </div>
                            <div className='grid gap-4 ' >
                                <LoginForm />
                            </div>
                        </TabsContent>

                        <TabsList className="text-sm flex flex-col gap-4 font-bold" >
                            <TabsTrigger value="user" className="!p-2 bg-black/40 flex justify-center items-center gap-2 " > <User className='size-5' /> User Login </TabsTrigger>
                            <TabsTrigger value="hotel" className="!p-2 flex justify-center items-center !text-black/80 shadow-sm border bg-white gap-3 data-[state=active]:!text-white"  > <Building className='size-5' />  Hotel Login</TabsTrigger>

                            <p className='text-center text-neutral-800 text-xs underline font-medium' > Terms and Condition </p>
                        </TabsList>

                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default page