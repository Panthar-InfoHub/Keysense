import { RecentTable } from '@/components/RecentTable'
import { ReservationCard } from '@/components/ReservationCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <section className='py-14 px-4 w-full overflow-hidden ' >

            <h1 className='text-2xl font-bold' > Dashboard </h1>
            <div className='flex gap-4 flex-wrap' >
                <div className='flex flex-col gap-7 mt-4 w-full ' >
                    <div>
                        <Card className="bg-background" >
                            <CardHeader className="p-4" >
                                <CardTitle>View Reservations</CardTitle>
                                <CardDescription>View all your customers reservation in one place with easy managment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button> View <ArrowUpRight /> </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <RecentTable />
                    </div>
                </div>

                <div className='w-full sm:w-[45%] ' >
                    <ReservationCard />
                </div>
            </div>
        </section>
    )
}

export default page