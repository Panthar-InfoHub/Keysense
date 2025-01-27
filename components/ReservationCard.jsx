"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { customFormat } from "@/lib/utils"

export const ReservationCard = () => {
    const [adults, setAdults] = useState(1)
    const [kids, setKids] = useState(0)
    const [rooms, setRooms] = useState(1)
    const [date, setDate] = useState()
    const reservationId = "RSV8061"

    const handleIncrement = (setter, value) => {
        setter(value + 1)
    }

    const handleDecrement = (setter, value) => {
        if (value > 0) {
            setter(value - 1)
        }
    }

    return (
        <Card className="w-full max-w-md bg-background text-white">
            <CardHeader className="p-4"  >
                <CardTitle className="text-2xl">Create Reservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-xs">
                <form action="">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-200">Customer Details</h2>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-gray-400">
                                Name
                            </label>
                            <Input id="name" className="bg-transparent border-gray-800 text-white" placeholder="Enter customer name" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-gray-400">
                                Phone no.
                            </label>
                            <Input id="phone" className="bg-transparent border-gray-800 text-white" placeholder="Enter phone number" />
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
                            <Input value={reservationId} disabled className="bg-transparent border-gray-800 text-white" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400">Dates</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-gray-800 text-white hover:bg-gray-800 flex items-center justify-start gap-2"
                                        type="button"
                                    >
                                        <CalendarIcon className="h-4 w-4" />
                                        {date ? customFormat(date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-black border-gray-800">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button type="submit" > Create </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

