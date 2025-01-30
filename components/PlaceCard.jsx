import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Image from "next/image"
import AddPlaceCard from "./AddPlaceCard"
import { Button } from "./ui/button"
import { MoreVertical } from "lucide-react"

const PlaceCard = ({ card }) => {
  console.log("Banner : ", card)
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="relative h-[5rem] aspect-square w-[5rem]">
        <Image alt="place" fill className="object-cover" src={card.acf?.place_img} />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full">
        <div className={`h-4 w-4 rounded-full `} />
        <div className="!text-xs">
          <h3>{card.acf?.name}</h3>
          <p> Address : {card.acf?.address} </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-muted">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px] bg-zinc-900 border-zinc-800">
            <DropdownMenuItem className="text-zinc-400 cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default PlaceCard