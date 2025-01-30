import React from "react"
import { MoreVertical, Star } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const ReviewCard = ({ review }) => {
  return (
    <>
      <div key={review.id} className="w-full max-w-md bg-zinc-900 text-white border border-zinc-800 rounded-lg overflow-hidden">
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
      </div>
    </>
  )
}

export default ReviewCard

