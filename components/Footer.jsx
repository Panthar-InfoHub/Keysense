import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full" >
            <div className="flex items-center justify-center gap-4 sm:flex-row flex-col" >
                <div>
                    <Link href="https://pantharinfohub.com/" className="text-white text-base" >
                        Made by Panthar InfoHub
                    </Link>
                </div>
                <div className="w-[1.5rem] aspect-square rounded-xl bg-white flex justify-center items-center" >
                    <div className="w-[90%] h-[90%] relative" >
                        <Image src="/black_logo.png" alt="logo" fill className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
