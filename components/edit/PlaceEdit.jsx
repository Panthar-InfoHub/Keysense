"use client"
import { getHotelPlaces } from '@/lib/actions'
import { editPlace } from '@/lib/edit_action'
import { uploadMedia } from '@/lib/postActions'
import { Images, X } from 'lucide-react'
import Image from 'next/image'
import { useActionState, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'sonner'

const EditPlaceCard = ({ place, setEditOpen, setPosts }) => {
    const [imagePreview, setImagePreview] = useState(place?.acf?.place_img || null);

    // Handle image selection
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Submit form action
    const handleEditPlace = async (prev, formData) => {
        try {
            const name = formData.get("name")
            const address = formData.get("address")
            const distance = formData.get("distance")
            const location = formData.get("location")
            const image = formData.get("image");

            let imageUrl = imagePreview;

            if (image && image.name) {
                const uploadedImage = await uploadMedia(image);
                imageUrl = uploadedImage?.source_url || "";
            }

            const res = await editPlace(place.id, {
                name,
                address,
                distance,
                location,
                image: imageUrl
            });

            if (res.status === "SUCCESS") {
                toast.success('Place Updated successfully')
                const res = await getHotelPlaces();
                if (res.status == "SUCCESS") {
                    setPosts(res.data)
                    setEditOpen(false) // Close modal after success
                }
            }
        } catch (error) {
            console.error("❌ Error updating place:", error);
        }
    };

    const [state, formAction, isPending] = useActionState(handleEditPlace, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='w-full flex'>
            <div className='w-full flex justify-center items-center bg-muted cursor-pointer relative flex-col'>
                {imagePreview && (
                    <>
                        <Image
                            name="image"
                            src={imagePreview}
                            alt="Uploaded Preview"
                            fill
                            className="rounded-lg object-cover"
                        />

                        <Button className='w-4 h-4 flex justify-center items-center rounded-full absolute z-50 top-2 right-6' onClick={() => setImagePreview(null)} >
                            <X />
                        </Button>
                    </>
                )}
                <label className='text-white/40'>
                    <Images /> <span> Upload Here... </span>
                </label>
                <Input name="image" type="file" onChange={handleImageChange} />
            </div>

            <div className='w-full flex flex-col'>
                <div className='p-4 bg-muted/50'>
                    <h3 className='font-semibold'> Edit Place </h3>
                </div>

                <div className='flex flex-col gap-6 p-4 bg-black'>
                    <h3 className=''> Place Details </h3>
                    <div>
                        <label className='text-white/60'> Name </label>
                        <Input id="name" name="name" defaultValue={place?.acf?.name} className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60'> Address </label>
                        <Input id="address" name="address" defaultValue={place?.acf?.address} className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60'> Distance </label>
                        <Input id="distance" name="distance" defaultValue={place?.acf?.distance} className="bg-transparent border-gray-800 text-white" placeholder="Ex: 5km, 500m" />
                    </div>
                    <div>
                        <label className='text-white/60'> Location Link </label>
                        <Input id="location" name="location" defaultValue={place?.acf?.location_url} className="bg-transparent border-gray-800 text-white" placeholder="Ex: https://www.google.com/maps/" />
                    </div>
                </div>

                <div className='w-full justify-between items-center flex p-4 bg-muted/50'>
                    <Button type="button" variant="ghost" onClick={() => setEditOpen(false)} className="text-white/60">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} className="!text-xs !p-2">
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                </div>
            </div>
        </form >
    );
};

export default EditPlaceCard;
