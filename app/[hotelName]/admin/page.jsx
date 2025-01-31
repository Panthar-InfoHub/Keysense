'use client'
import { RecentTable } from '@/components/RecentTable'
import { ReservationCard } from '@/components/ReservationCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getHotelReservation } from '@/lib/actions'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const page = () => {
    const [reservation, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true; // ✅ Prevents setting state after unmount
        const fetchReservations = async () => {
            try {
                const res = await getHotelReservation();
                if (isMounted && res.status === "SUCCESS") {
                    setReservations(res?.data);
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        fetchReservations();
        return () => {
            isMounted = false; // ✅ Prevents state updates if component unmounts
        };

    }, []);

    return (
        <section className='py-14 px-4 w-full overflow-hidden ' >

            <h1 className='text-2xl font-bold' > Dashboard </h1>
            <div className='flex gap-4 sm:flex-row flex-col' >
                <div className='flex flex-col gap-7 mt-4 w-full ' >
                    <div>
                        <Card className="bg-background" >
                            <CardHeader className="p-4" >
                                <CardTitle>View Reservations</CardTitle>
                                <CardDescription>View all your customers reservation in one place with easy managment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button> <Link href={`/test/reservation`} className='flex items-center' > View <ArrowUpRight /> </Link> </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        {isLoading ? (
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-8 w-[200px]" />
                                    <Skeleton className="h-4 w-[300px]" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-[200px] w-full" />
                                </CardContent>
                            </Card>
                        ) : (
                            <RecentTable data={reservation} />
                        )}
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