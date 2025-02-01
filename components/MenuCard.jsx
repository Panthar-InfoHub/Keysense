import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import MenuEdit from "./edit/MenuEdit"
import { useState } from "react"
import { removeHotelMenu } from "@/lib/removeAction"
import { getHotelMenu } from "@/lib/actions"

const MenuCard = ({ card, setAllMenuItems, setTotalPages }) => {
  const [editOpen, setEditOpen] = useState(false)

  const handleRemove = async (e) => {
    e.preventDefault();
    const postId = parseInt(card.id, 10);

    try {
      const res = await removeHotelMenu(postId)
      if (res.status === "SUCCESS") {
        const res = await getHotelMenu({ page: 1, per_page: 50 }) // Fetch all items
        if (res.status === "SUCCESS") {
          alert("Menu Deleted successfully!");
          setAllMenuItems(res.data)
          setTotalPages(Math.ceil(res.data.length / 20))
          setEditOpen(false); // Close modal after success
        }
      }
    } catch (error) {

    }
  }


  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="relative h-[5rem] aspect-square w-full rounded-t-xl">
        <Image alt="place" fill className="object-cover rounded-t-xl" src={card.acf?.image} />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full rounded-b-xl">
        <div className={`h-4 w-4 rounded-full `} />
        <div className="!text-xs">
          <h3 className="line-clamp-1" >{card.acf?.name}</h3>
          <p className="text-xs line-clamp-1" > Price : {card.acf?.price} </p>
          <p className="text-xs line-clamp-1" > Duration : {card.acf?.duration} </p>
          <p className="text-xs line-clamp-1" > {card.acf?.description} </p>
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
                <MenuEdit setTotalPages={setTotalPages} setAllMenuItems={setAllMenuItems} setEditOpen={setEditOpen} menu={card} />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => handleRemove(e)} >Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default MenuCard