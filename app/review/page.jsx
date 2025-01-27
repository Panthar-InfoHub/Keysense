import AddPlaceCard from '@/components/AddPlaceCard'
import AddReviewCard from '@/components/AddReviewCard'
import ReviewCard from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

const page = () => {

    const cards = [
        { name: "Test", address: "Test addres", distance: "3Km", location: "Tokyo main street" },
        { name: "Test", address: "Test addres", distance: "3Km", location: "Tokyo main street" },
        { name: "Test", address: "Test addres", distance: "3Km", location: "Tokyo main street" },
        { name: "Test", address: "Test addres", distance: "3Km", location: "Tokyo main street" },
    ]

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
                {cards.map((card, i) => {
                    return (
                        <ReviewCard card={card} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

export default page