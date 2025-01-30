'use client'
import AddPlaceCard from '@/components/AddPlaceCard'
import PlaceCard from '@/components/PlaceCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/places")
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
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
                            <Button className="text-xs" > <span className='hidden md:flex' > Add Places </span> <Plus /> </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full sm:max-w-[50%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <AddPlaceCard />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-8' >
                {posts.map((card, i) => {
                    return (
                        <PlaceCard card={card} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

export default Home