'use client'
import BannerCard from '@/components/BannerCard'
import SmallBanner from '@/components/SmallBannerCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getHotelBanner } from '@/lib/actions'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const page = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await getHotelBanner();
                if (res.status == "SUCCESS") {
                    setBanners(res?.data)
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setIsLoading(false)
            }
        };
        fetchBanner();
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
                        isLoading ? (
                            <Card>
                                <CardContent>
                                    <Skeleton className="h-full w-full" />
                                </CardContent>
                            </Card>
                        ) : (
                            <SmallBanner setBanners={setBanners} banner={card} key={i} />
                        )
                    )
                })}
            </div>
        </section>
    )
}

export default page