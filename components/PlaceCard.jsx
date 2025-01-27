import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { EllipsisVertical } from "lucide-react"
import Image from "next/image"
import AddPlaceCard from "./AddPlaceCard"

const PlaceCard = ({ card }) => {
  return (
    <div className="rounded-lg border">
      <div className="relative h-[5rem] aspect-square w-[5rem]">
        <Image alt="place" fill className="object-cover" src="/logo.webp" />
      </div>
      <div className="bg-muted p-2 flex justify-between items-center w-full">
        <div className="!text-xs">
          <h3>{card.name}</h3>
          <p>{card.address}</p>
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <EllipsisVertical className=" size-6 md:size-8" />
            </MenubarTrigger>
            <MenubarContent>
              <Dialog>
                <DialogTrigger asChild>
                  <MenubarItem>Edit</MenubarItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle>Edit Place</DialogTitle>
                  <AddPlaceCard />
                </DialogContent>
              </Dialog>
              <MenubarItem>Remove</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default PlaceCard