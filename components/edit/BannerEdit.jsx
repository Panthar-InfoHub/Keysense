'use client'
import { Images } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useActionState, useState } from "react"
import Image from "next/image"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { editBanner } from "@/lib/edit_action"
import { uploadMedia } from "@/lib/postActions"
import { getHotelBanner } from "@/lib/actions"
import { toast } from "sonner"

const BannerEdit = ({ banner, setEditOpen, setBanners }) => {
  const [imagePreview, setImagePreview] = useState(banner?.acf?.image || null)

  const handleEditBanner = async (prev, formData) => {
    try {
      const title = formData.get("title")
      const status = formData.get("status")
      const position = formData.getAll("position")
      const image = formData.get("image")


      let imageUrl = imagePreview
      if (image && image.name) {
        const uploadedImage = await uploadMedia(image)
        imageUrl = uploadedImage?.source_url || ""
      }

      const res = await editBanner(banner.id, {
        title,
        status,
        position,
        image: imageUrl,
      })

      if (res.status === "SUCCESS") {
        toast.success('Banner Updated successfully')
        const res = await getHotelBanner();
        if (res.status == "SUCCESS") {
          setBanners(res?.data)
        }
        setEditOpen(false)
      } else {
        alert("Failed to Update!");
      }
    } catch (error) {
      console.error("❌ Error updating banner:", error)
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const [state, formAction, isPending] = useActionState(handleEditBanner, { message: "", status: "INITIAL" })

  return (
    <form action={formAction} className="w-full flex">
      <input type="hidden" name="id" value={banner.id} />
      <div className="w-full flex justify-center items-center bg-muted cursor-pointer relative flex-col">
        {imagePreview && (
          <Image
            name="image"
            src={imagePreview}
            alt="Uploaded Preview"
            fill
            className="rounded-lg object-cover"
          />
        )}
        <label className="text-white/40">
          <Images /> <span> Upload Here... </span>
        </label>
        <Input name="image" type="file" onChange={handleImageChange} />
      </div>

      <div className="w-full flex flex-col">
        <div className="p-4 bg-muted/50">
          <h3 className="font-semibold"> Edit Banner </h3>
        </div>

        <div className="flex flex-col gap-6 p-4 bg-black">
          <h3 className=""> Banner Details </h3>
          <div>
            <label className="text-white/60"> Title </label>
            <Input
              id="title"
              name="title"
              defaultValue={banner?.acf?.title}
              className="bg-transparent border-gray-800 text-white"
            />
          </div>

          <div>
            <label className="text-white/60"> Banner Placement </label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="home"
                  name="position"
                  value="Home"
                  defaultChecked={banner?.acf?.position?.includes("Home")}
                />
                <label htmlFor="home">Home</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="menu"
                  name="position"
                  value="Menu"
                  defaultChecked={banner?.acf?.position?.includes("Menu")}
                />
                <label htmlFor="menu">Menu</label>
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/60"> Status </label>
            <Select name="status" defaultValue={banner?.acf?.status}>
              <SelectTrigger className="w-full bg-[#242424] border-gray-600">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deactive">Deactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full justify-between items-center flex p-4 bg-muted/50">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setEditOpen(false)
            }}
            className="text-white/60"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="!text-xs !p-2">
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default BannerEdit

