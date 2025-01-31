"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import { editReview } from "@/lib/postActions"

export default function EditReviewCard({ review, setOpen }) {
  const [rating, setRating] = useState(review?.acf?.stars || 0)

  const handleEditReview = async (prevState, formData) => {
    try {
      const updatedReview = {
        guest_name: formData.get("guest_name"),
        guest_number: formData.get("guest_no"),
        status: formData.get("status"),
        content: formData.get("content"),
        stars: rating,
      }

      const res = await editReview(review.id, updatedReview)
      if (res.status === "SUCCESS") {
        setOpen(false)
        return { message: "Review updated successfully!", status: "SUCCESS" }
      }
      return { message: "Failed to update review", status: "ERROR" }
    } catch (error) {
      console.error("❌ Error updating review:", error)
      return { message: "An error occurred while updating the review", status: "ERROR" }
    }
  }

  const [state, formAction, isPending] = useActionState(handleEditReview, { message: "", status: "INITIAL" })

  return (
    <Card className="!border-none bg-[#121212] text-white">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/50">
        <CardTitle className="text-xl font-normal">Edit Review</CardTitle>
      </CardHeader>
      <CardContent className="!text-xs">
        <form action={formAction} className="flex flex-col gap-3">
          <input type="hidden" name="id" value={review.id} />
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <button key={index} type="button" onClick={() => setRating(index)} className="focus:outline-none">
                <svg
                  className={`h-6 w-6 ${index <= rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              </button>
            ))}
          </div>

          <div className="">
            <label className="text-xs text-gray-400">Guest Name</label>
            <Input
              id="guest_name"
              name="guest_name"
              defaultValue={review?.acf?.guest_name}
              className="bg-[#1c1c1c] border-0"
            />
          </div>

          <div className="">
            <label className="text-xs text-gray-400">Guest Number</label>
            <Input
              id="guest_no"
              name="guest_no"
              defaultValue={review?.acf?.guest_number}
              className="bg-[#1c1c1c] border-0"
            />
          </div>

          <div className="">
            <label className="text-xs text-gray-400">Status</label>
            <Select name="status" defaultValue={review?.acf?.status}>
              <SelectTrigger className="bg-[#1c1c1c] border-0 text-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c1c] text-white border-gray-800">
                <SelectItem value="publish">Publish</SelectItem>
                <SelectItem value="unpublish">Unpublish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <label className="text-xs text-gray-400">Content</label>
            <Textarea
              id="content"
              name="content"
              defaultValue={review?.acf?.content}
              className="bg-[#1c1c1c] border-0 min-h-[50px]"
            />
          </div>

          <div className="flex justify-between w-full items-center">
            <Button
              type="button"
              variant="ghost"
              className="text-white hover:text-gray-300"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit" className="!text-xs !p-2">
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
        {state.status !== "INITIAL" && (
          <div className={`mt-4 ${state.status === "SUCCESS" ? "text-green-500" : "text-red-500"}`}>
            {state.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

