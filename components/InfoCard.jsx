'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MDEditor from '@uiw/react-md-editor';
import { Edit, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from './ui/input';
import TurndownService from "turndown";
import { addWifiToHotel, deleteWifiFromHotel, updateHotelPitch } from "@/lib/postActions";
import { fetchHotelByACF } from "@/lib/actions";


const turndownService = new TurndownService();

const InfoCard = ({ wifis, defaultPitch, setSetting }) => {
  const [pitch, setPitch] = useState(defaultPitch);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (defaultPitch) {
      // Convert raw HTML into Markdown before setting it
      const markdown = turndownService.turndown(defaultPitch);
      setPitch(markdown);
    }
  }, [defaultPitch]);

  const handleAddWifi = async (prev, formData) => {
    try {
      const res = await addWifiToHotel(formData);
      if (res.status === "SUCCESS") {
        const updatedHotelData = await fetchHotelByACF();
        if (updatedHotelData.status === "SUCCESS") {
          setSetting(updatedHotelData?.data); // ✅ Update UI in real-time
        }

        setOpen(false)
        alert("Wifi added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDeleteWifi = async (wifiName) => {
    try {
      const res = await deleteWifiFromHotel(wifiName);
      if (res.status === "SUCCESS") {
        const updatedHotelData = await fetchHotelByACF();
        if (updatedHotelData.status === "SUCCESS") {
          setSetting(updatedHotelData.data); // ✅ Update UI after deleting
        }
        alert("WiFi deleted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSavePitch = async () => {
    try {
      const res = await updateHotelPitch(pitch);
      if (res.status === "SUCCESS") {
        alert("Pitch updated successfully!");
        const updatedHotelData = await fetchHotelByACF();
        if (updatedHotelData.status === "SUCCESS") {
          setSetting(updatedHotelData?.data); // ✅ Update UI in real-time
        }
      }
    } catch (error) {
      console.error("Error updating pitch:", error);
    }
  };


  const [state, formAction, isPending] = useActionState(handleAddWifi, { error: "", status: "INITIAL" })

  return (
    <div className="w-full" >
      <div className="flex items-center justify-between w-full" >
        <h3> Wifi </h3>

        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button className="text-xs" >Add Wifi</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-[425px] !text-xs ">
            <DialogHeader className="!text-xs" >
              <DialogTitle>Add Wifi</DialogTitle>
              <DialogDescription className="mt-4" > Add wifi for you customers. </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="w-full "> Name: </label>
                <Input id="name" name="name" className=" col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className=""> Password: </label>
                <Input id="password" name="password" className="col-span-3" />
              </div>
              <Button disabled={isPending} className="w-fit text-xs" type="submit">Save changes</Button>
            </form>

          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-4 my-4" >
        {wifis?.map((wifi) => (
          <div className=" rounded-lg border border-white/30 overflow-hidden" key={wifi.name} >
            <div className="h-6 p-4  bg-white/20 flex items-center justify-between" >
              <Button type="button" onClick={() => handleDeleteWifi(wifi.name)} className="!py-0 !px-1 hover:bg-muted bg-transparent" > <Trash2 className="size-4 text-red-400" /></Button>
              <Edit className="size-4" />
            </div>
            <div className="py-5 px-4 text-sm flex flex-col gap-4" >
              <div className="text-white/30" > Name : <span className="text-white" > {wifi.name} </span> </div>
              <div className="text-white/30"  > Password : <span className="text-white" > {wifi.password} </span> </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full" >
        <h3> About </h3>

        <div className='flex flex-col gap-4' >
          <MDEditor
            value={pitch} onChange={(value) => setPitch(value)}
            className='startup-form_editor'
            id='pitch' preview='edit' height={300}
            style={{ overflow: 'hidden' }}
            textareaProps={{
              placeholder: 'Rules:'
            }}
            previewOptions={{
              disallowedElements: ["style"]
            }}
          />

          <Button className="w-fit text-sm" onClick={handleSavePitch} type="button" > Save </Button>
        </div>
      </div>
    </div>
  )
}

export default InfoCard