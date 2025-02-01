import { User } from 'lucide-react'
import { ModeToggle } from './Theme'
import MobileNav from './MobileNav'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

const ExtraNav = () => {
    return (
        <div className='w-full sticky top-0 h-14 bg-white/10 backdrop-blur-xl border-b border-white/30 flex items-center px-4 gap-4' >
            <MobileNav />
            <div className='w-full flex-1' />
            <ModeToggle />
            <div className='bg-white/50 rounded-lg p-2' >

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='cursor-pointer' >
                        <User className='size-3' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] bg-zinc-900 border-zinc-800">
                        <DropdownMenuItem className="text-zinc-400 cursor-pointer">
                            <span className="hidden md:flex">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-400 cursor-pointer">
                            <span className="hidden md:flex">Support</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default ExtraNav