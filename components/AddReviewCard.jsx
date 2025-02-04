"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getHotelReview } from "@/lib/actions"
import { createReview } from "@/lib/postActions"
import { useActionState, useState } from "react"

export default function AddReviewCard({ setOpen, setReviews }) {
    const [rating, setRating] = useState(0)
    const handleAddReview = async (prev, formData) => {
        try {
            const res = await createReview(formData, rating);
            if (res.status === "SUCCESS") {
                const res = await getHotelReview();
                if (res.status == "SUCCESS") {
                    toast.success('Review added successfully')
                    setOpen(false)
                    setReviews(res?.data)
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const [state, formAction, isPending] = useActionState(handleAddReview, { error: "", status: "INITIAL" })
    return (
        <Card className=" !border-none bg-[#121212] text-white">
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/50 ">
                <CardTitle className="text-xl font-normal">Add Review</CardTitle>
            </CardHeader>
            <CardContent className=" !text-xs">
                <form action={formAction} className="flex flex-col gap-3" >
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
                        <Input id="guest_name" name="guest_name" className="bg-[#1c1c1c] border-0" />
                    </div>

                    <div className="">
                        <label className="text-xs text-gray-400">Guest Number</label>
                        <Input id="guest_no" name="guest_no" className="bg-[#1c1c1c] border-0" />
                    </div>

                    <div className="">
                        <label className="text-xs text-gray-400">Status</label>
                        <Select name="status" defaultValue="publish">
                            <SelectTrigger className="bg-[#1c1c1c] border-0 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1c] text-white border-gray-800">
                                <SelectItem value="publish">publish</SelectItem>
                                <SelectItem value="unpublish">unpublish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="">
                        <label className="text-xs text-gray-400">Content</label>
                        <Textarea id="content" name="content" className="bg-[#1c1c1c] border-0 min-h-[50px]" />
                    </div>
                    <div className="flex justify-between w-full items-center" >
                        <Button type="button" variant="ghost" className="text-white hover:text-gray-300" onClick={() => setOpen(false)} >
                            Cancel
                        </Button>
                        <Button disabled={isPending} type="submit" className="!text-xs !p-2" >Create</Button>
                    </div>
                </form>
            </CardContent>
        </Card >
    )
}

