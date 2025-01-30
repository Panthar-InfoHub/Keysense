'use client'
import { RecentTable } from '@/components/RecentTable'
import { ReservationCard } from '@/components/ReservationCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hotelName } = useParams();
    useEffect(() => {
        fetch("https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reservations")
            .then(response => response.json())
            .then(data => {
                setReservation(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, []);

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
                                <Button> <Link href={`/test/reservation`} > View <ArrowUpRight /> </Link> </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <RecentTable data={reservation} />
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