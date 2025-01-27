import { ForkKnifeCrossed, Home, MapIcon, Settings, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const Navbar = () => {

    const NavData = [
        { title: "Dashoard", link: "/admin", icon: <Home className='size-4' /> },
        { title: "Reservation", link: "/reservation", icon: <Users className='size-4' /> },
        { title: "Places", link: "/places", icon: <MapIcon className='size-4' /> },
        { title: "Menu", link: "/menu", icon: <ForkKnifeCrossed className='size-4' /> },
        { title: "Banners", link: "/banner", icon: <Home className='size-4' /> },
        { title: "Reviews", link: "/review", icon: <Star className='size-4' /> },
        { title: "Setting", link: "/setting", icon: <Settings className='size-4' /> },
        { title: "Custom Link", link: "/", icon: <Settings className='size-4' /> },
    ]

    return (
        <div className=' hidden md:flex h-full max-h-screen flex-col gap-2 sticky top-0 overflow-hidden bg-black/20 border-r border-white/30' >
            <div className='border-b border-white/30 flex' >
                <Link href="/" className='flex gap-2 items-center px-6 h-14' >
                    <Image src="/logo.webp" width={30} height={30} alt='logo' />
                    <h3> Keysense </h3>
                </Link>
            </div>

            <div className='flex flex-1 ' >
                <div className='flex flex-col gap-2 items-start' >
                    {
                        NavData.map((item) => (
                            <Link href={item.link} key={item.title} className='flex items-center gap-2 cursor-pointer text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-primary text-sm' >
                                <span> {item.icon} </span>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className='mt-auto p-4' >
                <div className='rounded-xl bg-black text-white flex flex-col gap-2 p-4' >
                    <h3> Contact Us </h3>
                    <p className='text-sm' > For any query feel free to contact us any time. </p>
                    <Button className=""  > Contact Now </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar