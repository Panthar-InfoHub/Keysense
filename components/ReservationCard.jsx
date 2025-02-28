"use client"

import { useActionState, useState } from "react"
import { CalendarIcon, LoaderIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { customFormat, generateGuestID } from "@/lib/utils"
import { toast } from "sonner"
import { format } from "date-fns"
import { createReservation } from "@/lib/postActions"

export const ReservationCard = () => {
    const [adults, setAdults] = useState(1)
    const [kids, setKids] = useState(0)
    const [rooms, setRooms] = useState(1)
    const [dates, setDates] = useState([])

    const handleIncrement = (setter, value) => {
        setter(value + 1)
    }

    const handleDecrement = (setter, value) => {
        if (value > 0) {
            setter(value - 1)
        }
    }
    const formatDateRange = (dates) => {
        if (dates.length === 0) return "Pick dates"
        if (dates.length === 1) return format(dates[0], "PPP")

        return `${format(dates[0], "PPP")} - ${format(dates[dates.length - 1], "PPP")}`
    }

    const handleAddReservation = async (prev, formData) => {

        try {
            formData.append('adults', adults);
            formData.append('kids', kids);
            formData.append('rooms', rooms);
            formData.append('check_in', dates[0] ? dates[0].toISOString() : '');
            formData.append('check_out', dates[dates.length - 1] ? dates[dates.length - 1].toISOString() : '');
            const res = await createReservation(formData);
            if (res.status === "SUCCESS") {
                toast.success('Reservation Create Successfully !!');
                setDates([])
            }
        } catch (error) {
            toast.error('Error while creating the reservation !!');
            setDates([])
            console.error("Error:", error);
        }
    }
    const [state, formAction, isPending] = useActionState(handleAddReservation, { error: "", status: "INITIAL" })
    return (
        <Card className="w-full max-w-md bg-background text-white">
            <CardHeader className="p-4"  >
                <CardTitle className="text-2xl">Create Reservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-xs">
                <form action={formAction}>
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-200">Customer Details</h2>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-gray-400">
                                Name
                            </label>
                            <Input id="guest_name" name="guest_name" className="bg-transparent border-gray-800 text-white" placeholder="Enter customer name" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-gray-400">
                                Phone no.
                            </label>
                            <Input id="guest_no" name="guest_no" className="bg-transparent border-gray-800 text-white" placeholder="Enter phone number" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400">Number Of Peoples</label>
                            <div className="flex gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                        onClick={() => handleDecrement(setAdults, adults)}
                                    >
                                        -
                                    </Button>
                                    <div className="min-w-[100px] px-3 py-2 border border-gray-800 rounded-md text-center">
                                        {adults} adults
                                    </div>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        size="icon"
                                        className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                        onClick={() => handleIncrement(setAdults, adults)}
                                    >
                                        +
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                        onClick={() => handleDecrement(setKids, kids)}
                                    >
                                        -
                                    </Button>
                                    <div className="min-w-[100px] px-3 py-2 border border-gray-800 rounded-md text-center">{kids} kids</div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                        onClick={() => handleIncrement(setKids, kids)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400">Number Of Rooms</label>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                    onClick={() => handleDecrement(setRooms, rooms)}
                                >
                                    -
                                </Button>
                                <div className="min-w-[100px] px-3 py-2 border border-gray-800 rounded-md text-center">{rooms}</div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent border-gray-800 text-white hover:bg-gray-800"
                                    onClick={() => handleIncrement(setRooms, rooms)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400">Reservation ID</label>
                            <Input value={generateGuestID()} disabled className="bg-transparent border-gray-800 text-white" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400">Dates</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-800 flex items-center justify-start gap-2"
                                        type="button"
                                    >
                                        <CalendarIcon className="h-4 w-4" />
                                        {formatDateRange(dates)}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-black border-gray-800">
                                    <Calendar mode="multiple" selected={dates} onSelect={setDates} initialFocus className="" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button type="submit" > {isPending ? <>  <LoaderIcon className="animate-spin" /> </> : <> Create </>} </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

