'use client'
import ReservationTable from "@/components/ReservationTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { getFullHotelReservation } from "@/lib/actions";
import { useEffect, useState } from "react";

const page = () => {

    const [reservation, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await getFullHotelReservation();
                if (res.status == "SUCCESS") {
                    setReservations(res?.data)
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setIsLoading(false)
            }
        };
        fetchReservations();
    }, []);
    return (
        <section className='py-14 px-4 w-full overflow-hidden' >
            <div>
                <h1 className='text-xl font-bold' > Reservations </h1>
            </div>

            <div>
                {isLoading ? (
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-[200px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[200px] w-full" />
                        </CardContent>
                    </Card>
                ) : (
                    <ReservationTable reservations={reservation} />
                )}
            </div>

        </section>
    )
}

export default page