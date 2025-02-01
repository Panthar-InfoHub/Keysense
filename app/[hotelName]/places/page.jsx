'use client'
import AddPlaceCard from '@/components/AddPlaceCard'
import PlaceCard from '@/components/PlaceCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getHotelPlaces } from '@/lib/actions'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await getHotelPlaces();
                if (res.status == "SUCCESS") {
                    setPosts(res.data)
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
            <div className='flex justify-between w-full' >
                <div>
                    <h1 className='text-xl font-bold' > Places </h1>
                    <p className='text-xs text-white/80' > All famous places near your hotel </p>
                </div>
                <div className="" >
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger asChild>
                            <Button className="text-xs" > <span className='hidden md:flex' > Add Places </span> <Plus /> </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full sm:max-w-[50%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <DialogTitle className="p-4 bg-muted/50" >Add Place</DialogTitle>
                            <AddPlaceCard setOpen={setOpen} setPosts={setPosts} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-8' >

                {isLoading ? (
                    [0, 1, 2, 3].map((_, i) => (
                        <Card key={i} >
                            <CardContent className="!border-none !p-0" >
                                <Skeleton className="h-[100px] w-full " />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    posts.map((card, i) => {
                        return (
                            <PlaceCard setPosts={setPosts} card={card} key={i} />
                        )
                    })
                )}

            </div>
        </section>
    )
}

export default Home