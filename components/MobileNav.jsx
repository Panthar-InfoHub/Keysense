import { getName } from '@/lib/actions'
import { ForkKnifeCrossed, Home, MapIcon, Menu, Settings, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const MobileNav = async() => {

    const NavData = [
        { title: "Dashoard", link: "admin", icon: <Home className='size-4' /> },
        { title: "Reservation", link: "reservation", icon: <Users className='size-4' /> },
        { title: "Places", link: "places", icon: <MapIcon className='size-4' /> },
        { title: "Menu", link: "menu", icon: <ForkKnifeCrossed className='size-4' /> },
        { title: "Banners", link: "banner", icon: <Home className='size-4' /> },
        { title: "Reviews", link: "review", icon: <Star className='size-4' /> },
        { title: "Setting", link: "setting", icon: <Settings className='size-4' /> },
        { title: "Custom Link", link: "/", icon: <Settings className='size-4' /> },
    ]
    const res = await getName();
    return (
        <div className='flex md:hidden' >
            <Sheet>
                <SheetTrigger className='h-8 w-8 p-0 bg-muted flex justify-center items-center rounded-lg hover:bg-accent' >
                    <Menu className="h-4 w-4" />
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col" >
                    <nav className='grid gap-2 items-start px-2 text-sm font-medium lg:px-4' >
                        {
                            NavData.map((item) => (
                                <Link href={`/${res?.name}/${item.link}`} key={item.title} className='hover:bg-muted text-xs text-primary cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary' >
                                    <span> {item.icon} </span>
                                    {item.title}
                                </Link>
                            ))
                        }
                    </nav>
                    <div className='mt-auto' >
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm' >
                            <div className='flex flex-col space-y-1 p-4' >
                                <h3 className='text-xl font-semibold leading-none tracking-normal' > Contact us </h3>
                                <p className='text-sm text-muted-foreground' > For any query feel free to contact us anytime. </p>
                            </div>
                            <div className='p-6 pt-0' >
                                <Button className="!text-xs !p-2" >
                                    Contact Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default MobileNav