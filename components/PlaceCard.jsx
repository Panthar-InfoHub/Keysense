import { getHotelPlaces } from "@/lib/actions"
import { removePlace } from "@/lib/removeAction"
import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import EditPlaceCard from "./edit/PlaceEdit"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const PlaceCard = ({ card, setPosts }) => {
  const [editOpen, setEditOpen] = useState(false)

  const handleRemove = async (e) => {
    e.preventDefault();
    const postId = parseInt(card.id, 10);
    console.log("🟡 Removing place with ID:", postId);

    if (isNaN(postId)) {
      console.error("❌ Invalid ID: Not a number");
      alert("Invalid place ID.");
      return;
    }

    try {
      const res = await removePlace(postId)
      if (res.status === "SUCCESS") {
        alert("Place deleted successfully!");
        const res = await getHotelPlaces();
        if (res.status == "SUCCESS") {
          setPosts(res.data)
        }
      }
    } catch (error) {

    }
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="relative h-[5rem] aspect-square w-full rounded-t-xl">
        <Image alt="place" fill className="object-cover rounded-t-xl" src={card.acf?.place_img} />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full rounded-b-xl">
        <div className={`h-4 w-4 rounded-full `} />
        <div className="!text-xs">
          <h3 className="line-clamp-1" >{card.acf?.name}</h3>
          <p className="text-xs line-clamp-1" > Address : {card.acf?.address} </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-black">
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
                <EditPlaceCard setPosts={setPosts} setEditOpen={setEditOpen} place={card} />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => handleRemove(e)} >Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default PlaceCard