'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MDEditor from '@uiw/react-md-editor';
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from './ui/input';

const InfoCard = () => {
  const [pitch, setPitch] = useState("");
  const wifis = [
    { name: "Hari Hotel", password: "123456" },
    { name: "Bedchambers", password: "123456" },
    { name: "Grand Hotel", password: "123456" },
  ]

  return (
    <div className="w-full" >
      <div className="flex items-center justify-between w-full" >
        <h3> Wifi </h3>

        <Dialog> 
          <DialogTrigger asChild>
            <Button className="text-xs" >Add Wifi</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-[425px] !text-xs ">
            <DialogHeader className="!text-xs" >
              <DialogTitle>Add Wifi</DialogTitle>
              <DialogDescription className="mt-4" > Add wifi for you customers. </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="w-full "> Name: </label>
                <Input id="name" className=" col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className=""> Password: </label>
                <Input id="password" className="col-span-3" />
              </div>
              <Button className="w-fit text-xs" type="submit">Save changes</Button>
            </div>

          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-4 my-4" >
        {wifis.map((wifi) => (
          <div className=" rounded-lg border border-white/30 overflow-hidden" key={wifi.name} >
            <div className="h-6 p-4  bg-white/20 flex items-center justify-between" >
              <Trash2 className="size-4 text-red-400" />
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

          <Button className="w-fit text-sm" > Save </Button>
        </div>
      </div>
    </div>
  )
}

export default InfoCard