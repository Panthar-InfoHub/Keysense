"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createReview } from "@/lib/postActions"
import { useActionState, useState } from "react"
import { toast } from "sonner"

export default function CustomReview() {
    const [rating, setRating] = useState(0)
    const handleAddReview = async (prev, formData) => {
        try {
            const res = await createReview(formData, rating);

            if (res.status === "SUCCESS") {
                toast.success('Review added successfully')
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const [state, formAction, isPending] = useActionState(handleAddReview, { error: "", status: "INITIAL" })
    return (
        <Card className=" w-[95%] sm:w-full max-w-md bg-white text-black">
            <CardHeader className="p-4"  >
                <CardTitle className="flex justify-center flex-col gap-2 items-center">
                    <span className='text-3xl' > 🙏 </span>
                    <div className="text-sm" > Welcome </div>
                    <p className="text-sm font-normal text-muted" > Please fill your deatils to submit a review </p>
                </CardTitle>
            </CardHeader>
            <CardContent className=" !text-xs">
                <form action={formAction} className="flex flex-col gap-3" >
                    <div className="flex space-x-1 w-full justify-center items-center">
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
                        <label className="text-xs">Guest Name</label>
                        <Input id="guest_name" name="guest_name" className="bg-transparent border-gray-200 text-black" />
                    </div>

                    <div className="">
                        <label className="text-xs">Guest Number</label>
                        <Input id="guest_no" name="guest_no" className="bg-transparent border-gray-200 text-black" />
                    </div>

                    <div className="">
                        <label className="text-xs">Review</label>
                        <Textarea id="content" name="content" className="bg-transparent border-gray-200 text-black" />
                    </div>
                    <div className="" >
                        <Button disabled={isPending} type="submit" className="!text-xs !p-2 bg-black text-white w-full hover:bg-black/80" >Create</Button>
                    </div>
                </form>
            </CardContent>
        </Card >
    )
}

