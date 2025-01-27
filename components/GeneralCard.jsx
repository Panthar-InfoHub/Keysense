"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"

const GeneralCard = ({ hotel }) => {

  return (
    <Card className="w-full bg-background text-white">
      <CardHeader className="p-4"  >
        <CardTitle className="text-2xl">Hotel Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 !text-xs !text-white">
        <form action="">
          <div className="space-y-4">

            <div className="space-y-2">
              <label htmlFor="name" className=""> Name </label>
              <Input id="name" defaultValue={hotel?.name || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Hotel name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className=""> Email</label>
              <Input id="email" defaultValue={hotel?.email || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Hotel email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="hotelno" className=""> Phone no.</label>
              <Input id="hotelno" defaultValue={hotel?.hotelno || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Hotel number" />
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className=""> Number for customers service</label>
              <Input id="service" defaultValue={hotel?.service || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Number for customers service" />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className=""> City</label>
              <Input id="city" defaultValue={hotel?.city || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter City" />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className=""> Address</label>
              <Textarea id="address" defaultValue={hotel?.address || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Address" />
            </div>
            <div className="space-y-2">
              <label htmlFor="map_link" className=""> Google Map link </label>
              <Input id="map_link" defaultValue={hotel?.map || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Google Map link" />
            </div>
            <div className="space-y-2">
              <label htmlFor="bussiness_id" className=""> Google my business place ID</label>
              <Input id="bussiness_id" defaultValue={hotel?.bussiness_id || "Jhansi Hotel"} className="bg-transparent border-gray-800 text-white" placeholder="Enter Google my business place ID" />
            </div>

            <Button type="submit" > Create </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default GeneralCard