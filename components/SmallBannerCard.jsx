import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import BannerEdit from "./edit/BannerEdit"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const PlaceCard = ({ banner, setBanners }) => {
  const [editOpen, setEditOpen] = useState(false)
  return (
    <div className="rounded-xl border ">
      <div className="relative h-[5rem] aspect-square w-full rounded-t-xl">
        <Image alt="place" fill className="object-cover rounded-t-xl" src={banner.acf?.image} />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full rounded-b-xl">
        <div className={`h-4 w-4 rounded-full ${banner.acf?.status === "active" ? "bg-green-400" : "bg-red-500"} `} />
        <div className="!text-xs">
          <h3>{banner.acf?.title}</h3>
          <p> placement :  {banner.acf?.position}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-muted">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px] bg-zinc-900 border-zinc-800">
            <Dialog open={editOpen} onOpenChange={setEditOpen} >
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()} className="text-zinc-400 cursor-pointer">
                  <span className="hidden md:flex">Edit</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="w-full sm:max-w-[50%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                <BannerEdit setBanners={setBanners} setEditOpen={setEditOpen} banner={banner} />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="cursor-pointer">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default PlaceCard