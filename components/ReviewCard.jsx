"use client"
import { MoreVertical, Star } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { unpublishReview } from "@/lib/edit_action"
import { removeReview } from "@/lib/removeAction"
import { useState } from "react"

const ReviewCard = ({ review, setReviews }) => {
  const [editOpen, setEditOpen] = useState(false)

  const handleUnpublish = async (e) => {
    e.preventDefault();
    try {
      const res = await unpublishReview(review.id, review.acf?.status);
      if (res.status === "SUCCESS") {
        const res = await getHotelReview();
        if (res.status == "SUCCESS") {
          alert("Update review");
          setReviews(res?.data)
          setEditOpen(false)
        }
      }
    } catch (error) {
      console.log("ERROR : ", error)
    }
  }

  const handleRemove = async (e) => {
    e.preventDefault();
    const postId = parseInt(review.id, 10);

    try {
      const res = await removeReview(postId)
      if (res.status === "SUCCESS") {
        const res = await getHotelReview();
        if (res.status == "SUCCESS") {
          alert("Removed review");
          setReviews(res?.data)
          setEditOpen(false)
        }
      }
    } catch (error) {

    }
  }

  return (
    <>
      <div key={review.id} className="w-full max-w-md bg-zinc-900 text-white border border-zinc-800 rounded-lg overflow-hidden relative">
        <span className={`absolute flex justify-center items-center h-3 w-3  rounded-full opacity-75 top-2 left-1 ${review.acf?.status === "publish" ? "bg-green-400" : "bg-red-500"}`}>
          <span className={`relative inline-flex h-4 w-4 rounded-[50%] animate-ping ${review.acf?.status === "publish" ? "bg-green-400/50" : "bg-red-500/50"}`} ></span>
        </span>


        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">{review.acf?.guest_name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{review.acf?.guest_name}</p>
              <p className="text-xs text-zinc-400">ID: {review.acf?.guest_number}</p>
            </div>
          </div>
          <div className="relative">
            <DropdownMenu open={editOpen} onOpenChange={setEditOpen} >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px] bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="text-zinc-400 cursor-pointer" onSelect={(e) => handleUnpublish(e)} >{review.acf?.status === "publish" ? "Unpublish" : "Publish"}</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onSelect={(e) => handleRemove(e)} >Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fill="currentColor"
                className={`h-4 w-4 ${i < Number(review.acf?.stars || 0) ? "text-yellow-400" : "text-zinc-600"}`}
              />
            ))}
          </div>
          <p className="text-sm text-zinc-200">{review.acf?.content || "No review available."}</p>
        </div>
      </div >
    </>
  )
}

export default ReviewCard

