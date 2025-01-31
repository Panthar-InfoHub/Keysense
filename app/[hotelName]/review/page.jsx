'use client'
import AddReviewCard from '@/components/AddReviewCard'
import ReviewCard from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getHotelReview } from '@/lib/actions'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const page = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await getHotelReview();
                if (res.status == "SUCCESS") {
                    setReviews(res?.data)
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchBanner();
    }, []);

    return (
        <section className='py-14 px-4 w-full overflow-hidden' >
            <div className='flex justify-between w-full' >
                <div>
                    <h1 className='text-xl font-bold' > Review </h1>
                    <p className='text-xs text-white/80' > What our customer say!! </p>
                </div>
                <div className="" >
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger asChild>
                            <Button className="text-xs" > <span className='hidden md:flex' > Add Reviews </span> <Plus /> </Button>
                        </DialogTrigger>
                        <DialogContent className=" w-full sm:w-[30%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <AddReviewCard setReviews={setReviews} setOpen={setOpen} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3  gap-6 mt-8' >

                {loading ? (
                    [0, 1, 2, 3].map((_, i) => (
                        <Card key={i} >
                            <CardContent className="!border-none !p-0" >
                                <Skeleton className="h-[100px] w-full " />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    reviews.map((card, i) => {
                        return (
                            <ReviewCard setReviews={setReviews} review={card} key={i} />
                        )
                    })
                )}


            </div>
        </section >
    )
}

export default page