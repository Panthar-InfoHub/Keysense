"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useActionState } from "react"
import { fetchHotelByACF } from "@/lib/actions"
import { updateHotelDetails } from "@/lib/postActions"

const GeneralCard = ({ hotel, setSetting }) => {

  const handleUpdateHotel = async (prev, formData) => {
    try {
      const res = await updateHotelDetails(formData);
      if (res.status === "SUCCESS") {
        alert("Hotel details updated successfully!");
        const updatedHotelData = await fetchHotelByACF();
        if (updatedHotelData.status === "SUCCESS") {
          setSetting(updatedHotelData?.data);
        }
      }
    } catch (error) {
      console.error("Error updating hotel details:", error);
    }
  };

  const [state, formAction, isPending] = useActionState(handleUpdateHotel, { error: "", status: "INITIAL" });



  return (
    <Card className="w-full bg-background text-white">
      <CardHeader className="p-4"  >
        <CardTitle className="text-2xl">Hotel Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 !text-xs !text-white">
        <form action={formAction}>
          <div className="space-y-4">

            <div className="space-y-2">
              <label htmlFor="name" className="text-white/60"> Name </label>
              <Input id="name" defaultValue={hotel?.name || "Jhansi Hotel"} name="name" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Hotel name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-white/60"> Email</label>
              <Input id="email" defaultValue={hotel?.email || "Jhansi Hotel"} name="email" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Hotel email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="hotelno" className="text-white/60"> Phone no.</label>
              <Input id="hotelno" defaultValue={hotel?.supportnumber || "Jhansi Hotel"} name="supportnumber" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Hotel number" />
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="text-white/60"> Number for customers service</label>
              <Input id="service" defaultValue={hotel?.supportnumber || "Jhansi Hotel"} name="supportnumber" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Number for customers service" />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-white/60"> City</label>
              <Input id="city" defaultValue={hotel?.city || "Jhansi Hotel"} name="city" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter City" />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-white/60"> Address</label>
              <Textarea id="address" defaultValue={hotel?.location || "Jhansi Hotel"} name="location" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Address" />
            </div>
            <div className="space-y-2">
              <label htmlFor="map_link" className="text-white/60"> Google Map link </label>
              <Input id="map_link" defaultValue={hotel?.locationurl || "Jhansi Hotel"} name="locationurl" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Google Map link" />
            </div>
            <div className="space-y-2">
              <label htmlFor="bussiness_id" className="text-white/60"> Google my business place ID</label>
              <Input id="bussiness_id" defaultValue={hotel?.place_id || "Jhansi Hotel"} name="place_id" className="bg-transparent border-gray-800 text-white !text-xs " placeholder="Enter Google my business place ID" />
            </div>

            <Button disabled={isPending} type="submit" > Create </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default GeneralCard