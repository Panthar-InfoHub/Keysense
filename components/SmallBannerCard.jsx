import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const PlaceCard = ({ banner }) => {
  console.log("Banner : ", banner)
  return (
    <div className="rounded-lg border">
      <div className="relative h-[5rem] aspect-square w-[5rem]">
        <Image alt="place" fill className="object-cover" src={banner.image} />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full">
        <div className={`h-4 w-4 rounded-full ${banner.acf?.status === "active" ? "bg-green-400" : "bg-red-500"} `}  />
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
                <DropdownMenuItem className="text-zinc-400 cursor-pointer">Unpublish</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
      </div>
    </div>
  )
}

export default PlaceCard