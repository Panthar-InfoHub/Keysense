import { User } from 'lucide-react'
import { ModeToggle } from './Theme'
import MobileNav from './MobileNav'

const ExtraNav = () => {
    return (
        <div className='w-full sticky top-0 h-14 bg-white/10 backdrop-blur-xl border-b border-white/30 flex items-center px-4 gap-4' >
            <MobileNav />
            <div className='w-full flex-1' />
            <ModeToggle />
            <div className='bg-white/50 rounded-lg p-2' >
                <User className='size-4' />
            </div>
        </div>
    )
}

export default ExtraNav