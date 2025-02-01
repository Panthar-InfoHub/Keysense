"use client"
import { Images, X } from 'lucide-react'
import { useActionState, useState } from 'react'
import Image from 'next/image'
import { uploadMedia } from '@/lib/postActions';
import { editMenu } from '@/lib/edit_action';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getHotelMenu } from '@/lib/actions';

const MenuEdit = ({ menu, setEditOpen, setAllMenuItems, setTotalPages }) => {
    const [imagePreview, setImagePreview] = useState(menu?.acf?.image || null);
    // Handle image selection
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Submit form action
    const handleEditMenu = async (prev, formData) => {
        try {
            const name = formData.get("name")
            const price = formData.get("price")
            const duration = formData.get("duration")
            const description = formData.get("description")
            const image = formData.get("image");

            let imageUrl = imagePreview;
            if (image && image.name) {
                const uploadedImage = await uploadMedia(image);
                imageUrl = uploadedImage?.source_url || "";
            }

            const res = await editMenu(menu.id, {
                name,
                price,
                duration,
                description,
                image: imageUrl
            });

            if (res.status === "SUCCESS") {
                const res = await getHotelMenu({ page: 1, per_page: 50 }) // Fetch all items
                if (res.status === "SUCCESS") {
                    alert("Menu updated successfully!");
                    setAllMenuItems(res.data)
                    setTotalPages(Math.ceil(res.data.length / 20))
                    setEditOpen(false); // Close modal after success
                }
            }
        } catch (error) {
            console.error("❌ Error updating menu:", error);
        }
    };

    const [state, formAction, isPending] = useActionState(handleEditMenu, { error: "", status: "INITIAL" });

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

                        <Button className='w-4 h-4 flex justify-center items-center rounded-full absolute z-50 top-2 right-6' onClick={() => setImagePreview(false)} >
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
                    <h3 className='font-semibold'> Edit Menu Item </h3>
                </div>

                <div className='flex flex-col gap-6 p-4 bg-black'>
                    <h3 className=''> Menu Details </h3>
                    <div>
                        <label className='text-white/60'> Name </label>
                        <Input id="name" name="name" defaultValue={menu?.acf?.name} className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60'> Price </label>
                        <Input id="price" name="price" defaultValue={menu?.acf?.price} className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60'> Duration </label>
                        <Input id="duration" name="duration" defaultValue={menu?.acf?.duration} className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60'> Description </label>
                        <Input id="description" name="description" defaultValue={menu?.acf?.description} className="bg-transparent border-gray-800 text-white" />
                    </div>
                </div>

                <div className='w-full justify-between items-center flex p-4 bg-muted/50'>
                    <Button type="button" variant="ghost" onClick={() => { setEditOpen(false) }} className="text-white/60">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} className="!text-xs !p-2">
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default MenuEdit;
