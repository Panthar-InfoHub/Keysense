'use client'
import { getHotelMenu } from '@/lib/actions'
import { createHotelMenu, uploadMedia } from '@/lib/postActions'
import { Images } from 'lucide-react'
import Image from 'next/image'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

const AddMenu = ({ setOpen, setAllMenuItems, setTotalPages }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const handleAddPlace = async (prev, formData) => {
        try {
            let imageUrl = "";
            const image = formData.get("image")
            if (image && image.name ) {
                const uploadedImage = await uploadMedia(image);
                imageUrl = uploadedImage?.source_url || "";
            }

            const res = await createHotelMenu(formData, imageUrl);
            if (res.status === "SUCCESS") {
                toast.success('Menu Added successfully')
                const res = await getHotelMenu({ page: 1, per_page: 50 });
                if (res.status === "SUCCESS") {
                    setOpen(false)
                    setAllMenuItems(res.data)
                    setTotalPages(Math.ceil(res.data.length / 20))
                }
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


    const [state, formAction, isPending] = useActionState(handleAddPlace, { error: "", status: "INITIAL" })

    return (
        <form action={formAction} className=' w-full flex' >
            <div className='w-full flex justify-center items-center bg-muted cursor-pointer relative flex-col' >
                {imagePreview && (
                    <Image
                        src={imagePreview}
                        alt="Uploaded Preview"
                        fill
                        className="rounded-lg object-cover"
                    />
                )}
                <label htmlFor="" className='text-white/40' > <Images /> <span> Upload Here... </span> </label>
                <Input name="image" type="file" onChange={handleImageChange} />
            </div>

            <div className='w-full flex flex-col' >

                <div className='flex flex-col gap-6 p-4  bg-black' >
                    <h3 className='' > Dish Details </h3>
                    <div>
                        <label className='text-white/60' > Name </label>
                        <Input id="name" name="name" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Price </label>
                        <Input id="price" name="price" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Duration </label>
                        <Input id="duration" name="duration" className="bg-transparent border-gray-800 text-white" placeholder="Ex: 5km, 500m" />
                    </div>
                    <div>
                        <label className='text-white/60' > Description </label>
                        <Textarea id="description" name="description" className="bg-transparent border-gray-800 text-white" placeholder="Ex: https://www.google.com/maps/" />
                    </div>
                </div>

                <div className='w-full justify-between items-center flex p-4 bg-muted/50 ' >
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button disabled={isPending} className="!text-xs !p-2" > Create </Button>
                </div>
            </div>
        </form>
    )
}

export default AddMenu
