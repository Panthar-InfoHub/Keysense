'use client'
import { Images } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useActionState, useState } from 'react'
import { createPlace, uploadMedia } from '@/lib/postActions'
import Image from 'next/image'
import { getHotelPlaces } from '@/lib/actions'
import { toast } from 'sonner'

const AddPlaceCard = ({ setOpen, setPosts }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const handleAddPlace = async (prev, formData) => {
        try {
            let imageUrl = "";
            const image = formData.get("image")
            if (image) {
                const uploadedImage = await uploadMedia(image);
                imageUrl = uploadedImage?.source_url || "";
            }

            const res = await createPlace(formData, imageUrl);
            if (res.status === "SUCCESS") {
                toast.success('Place added successfully')
                const res = await getHotelPlaces();
                if (res.status == "SUCCESS") {
                    setPosts(res.data)
                    setOpen(false)
                }
            }
        } catch (error) {
            alert("Error added successfully!");
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
                    <h3 className='' > Place Details </h3>
                    <div>
                        <label className='text-white/60' > Name </label>
                        <Input id="name" name="name" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Address </label>
                        <Input id="address" name="address" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Distance </label>
                        <Input id="distance" name="distance" className="bg-transparent border-gray-800 text-white" placeholder="Ex: 5km, 500m" />
                    </div>
                    <div>
                        <label className='text-white/60' > Location Link </label>
                        <Input id="location" name="location" className="bg-transparent border-gray-800 text-white" placeholder="Ex: https://www.google.com/maps/" />
                    </div>
                </div>

                <div className='w-full justify-between items-center flex p-4 bg-muted/50 ' >
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button className="!text-xs !p-2" > Create </Button>
                </div>
            </div>
        </form>
    )
}

export default AddPlaceCard
