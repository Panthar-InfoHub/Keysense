"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBanner, uploadMedia } from "@/lib/postActions"
import { Images } from "lucide-react"
import Image from "next/image"
import { useActionState, useState } from "react"

export default function BannerCard() {

    const [imagePreview, setImagePreview] = useState(null);
    const handleAddBanner = async (prev, formData) => {
        try {
            let imageUrl = "";
            const image = formData.get("image")
            if (image && image.name) {
                const uploadedImage = await uploadMedia(image);
                imageUrl = uploadedImage?.source_url || "";
            }

            const res = await createBanner(formData, imageUrl);
            if (res.status === "SUCCESS") {
                toast.success('Banner Added successfully')
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    };


    const [state, formAction, isPending] = useActionState(handleAddBanner, { error: "", status: "INITIAL" })


    return (
        <Card className="w-full bg-[#1C1C1C] text-white !border-none">
            <CardHeader className="p-4" >
                <CardTitle className="text-base font-normal">Add Banner</CardTitle>
            </CardHeader>
            <CardContent className="!p-0">

                <form action={formAction}>
                    <div className="flex flex-col items-center justify-center h-[5rem] border-y border-gray-600 bg-[#242424] cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                        <div className="flex flex-col items-center space-y-2 relative w-full">
                            {imagePreview && (
                                <Image
                                    src={imagePreview}
                                    alt="Uploaded Preview"
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            )}

                            <Images />
                            <span className="text-gray-400">Upload Here..</span>
                            <Input type="file" className="absolute inset-0 placeholder:hidden w-full h-full border-none opacity-0 file:text-opacity-0" name="image" onChange={handleImageChange} />
                        </div>
                    </div>

                    <div className="bg-black/60 px-4 py-2 flex flex-col gap-4">
                        <h3 className="text-sm font-medium">Banner Details</h3>

                        <div className="space-y-2">
                            <label htmlFor="title">Title</label>
                            <Input id="title" name="title" className="bg-[#242424] border-gray-600 focus:border-gray-400" />
                        </div>

                        <div className="space-y-2 ">
                            <label>Banner Placement</label>
                            <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="home" name="position" value="Home" />
                                    <label htmlFor="home">Home</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="menu" name="position" value="Menu" />
                                    <label htmlFor="menu">Menu</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label>Status</label>
                            <Select name="status">
                                <SelectTrigger className="w-full bg-[#242424] border-gray-600">
                                    <SelectValue placeholder="Select Placement" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">active</SelectItem>
                                    <SelectItem value="deactive">deactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full p-2">
                        <Button variant="ghost" className="text-gray-400 hover:text-white">
                            Cancel
                        </Button>
                        <Button type="submit" className="!text-xs !p-4" >Create</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

