'use client'
import BannerCard from '@/components/BannerCard'
import PlaceCard from '@/components/PlaceCard'
import SmallBanner from '@/components/SmallBannerCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const page = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/banners")
            .then(response => response.json())
            .then(data => {
                setBanners(data);
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
                    <h1 className='text-xl font-bold' > Banners </h1>
                    <p className='text-xs text-white/80' > Show your customer offer by banners. </p>
                </div>
                <div className="" >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-xs" > <span className='hidden md:flex' > Add Banner </span> <Plus /> </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[30%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <BannerCard />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-8' >
                {banners.map((card, i) => {
                    return (
                        <SmallBanner banner={card} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

export default page