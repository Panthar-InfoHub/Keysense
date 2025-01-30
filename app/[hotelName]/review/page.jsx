'use client'
import AddReviewCard from '@/components/AddReviewCard'
import ReviewCard from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const page = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reviews")
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
                console.log("DATA : ", data)
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section className='py-14 px-4 w-full overflow-hidden' >
            <div className='flex justify-between w-full' >
                <div>
                    <h1 className='text-xl font-bold' > Places </h1>
                    <p className='text-xs text-white/80' > All famous places near your hotel </p>
                </div>
                <div className="" >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-xs" > <span className='hidden md:flex' > Add Reviews </span> <Plus /> </Button>
                        </DialogTrigger>
                        <DialogContent className=" w-full sm:w-[30%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <AddReviewCard />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3  gap-6 mt-8' >
                {reviews.map((card, i) => {
                    return (
                        <ReviewCard review={card} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

export default page