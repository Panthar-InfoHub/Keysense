"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useActionState, useState } from "react"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { createReservation } from "@/lib/postActions"
import { toast } from "sonner"

export const CreateCard = () => {
    const [adults, setAdults] = useState(1)
    const [step, setStep] = useState(1)
    const [kids, setKids] = useState(0)
    const [rooms, setRooms] = useState(1)
    const [dates, setDates] = useState([])

    const handleIncrement = (setter, value) => {
        setter(value + 1)
    }
    const formatDateRange = (dates) => {
        if (dates.length === 0) return "Pick dates"
        if (dates.length === 1) return format(dates[0], "PPP")

        return `${format(dates[0], "PPP")} - ${format(dates[dates.length - 1], "PPP")}`
    }

    const handleDecrement = (setter, value) => {
        if (value > 0) {
            setter(value - 1)
        }
    }

    const handleNext = (e) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handleBack = (e) => {
        e.preventDefault()
        setStep(step - 1)
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
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const [state, formAction, isPending] = useActionState(handleAddReservation, { error: "", status: "INITIAL" })

    return (
        <Card className="w-full max-w-md bg-white text-black">
            <CardHeader className="p-4"  >
                <CardTitle className="flex justify-center flex-col gap-2 items-center">
                    <span className='text-3xl' > 🙏 </span>
                    <div className="text-sm" > Welcome </div>
                    <p className="text-sm font-normal text-muted" > Please fill your deatils to make reservation </p>
                </CardTitle>
            </CardHeader>
            <CardContent className=" text-xs text-black">
                <div className="space-y-4">
                    <form action={formAction} className="flex flex-col gap-4" >
                        <h2 className="text-xs font-semibold">Customer Details</h2>
                        <div className="space-y-2" style={{ display: step === 1 ? "block" : "none" }} >
                            <label> Name </label>
                            <Input id="guest_name" name="guest_name" required className="bg-transparent border-gray-200 text-black placeholder:text-black" placeholder="Enter customer name" />
                        </div>

                        <div className="space-y-2" style={{ display: step === 1 ? "block" : "none" }} >
                            <label>Phone no.</label>
                            <Input id="guest_no" name="guest_no" required className="bg-transparent border-gray-200 text-black placeholder:text-black" placeholder="Enter phone number" />
                        </div>
                        <div className="space-y-2" style={{ display: step === 1 ? "block" : "none" }} >
                            <label>Number Of Rooms</label>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent border-gray-200 hover:bg-gray-800"
                                    onClick={() => handleDecrement(setRooms, rooms)}
                                >
                                    -
                                </Button>
                                <div className="min-w-[100px] px-3 py-2 border border-gray-200 rounded-md text-center">{rooms}</div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent border-gray-200 hover:bg-gray-800"
                                    onClick={() => handleIncrement(setRooms, rooms)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div style={{ display: step === 2 ? "block" : "none" }}>
                            <div className="space-y-2">
                                <label>Dates</label>
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

                            <div className="space-y-2">
                                <label>Number Of Peoples</label>
                                <div className="flex gap-4 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="bg-transparent border-gray-200 hover:bg-gray-800"
                                            onClick={() => handleDecrement(setAdults, adults)}
                                        >
                                            -
                                        </Button>
                                        <div className="min-w-[100px] px-3 py-2 border border-gray-200 rounded-md text-center">
                                            {adults} adults
                                        </div>
                                        <Button
                                            variant="outline"
                                            type="button"
                                            size="icon"
                                            className="bg-transparent border-gray-200 hover:bg-gray-800"
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
                                            className="bg-transparent border-gray-200 hover:bg-gray-800"
                                            onClick={() => handleDecrement(setKids, kids)}
                                        >
                                            -
                                        </Button>
                                        <div className="min-w-[100px] px-3 py-2 border border-gray-200 rounded-md text-center">{kids} kids</div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="bg-transparent border-gray-200 hover:bg-gray-800"
                                            onClick={() => handleIncrement(setKids, kids)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {step === 1 && <>
                                <Button type="button" className="w-full bg-background text-white hover:bg-black/80" onClick={(e) => handleNext(e)}>
                                    Next
                                </Button>
                            </>}
                            {step === 2 && <>
                                <Button type="submit" disabled={isPending} className="w-full bg-background text-white hover:bg-black/80" > Book </Button>
                            </>}


                            {step > 1 && (
                                <Button type="button" variant="outline" className="w-full bg-white text-gray-800 border-gray-200 " onClick={(e) => handleBack(e)}>
                                    Back
                                </Button>
                            )}
                        </div>

                    </form>
                </div>
            </CardContent>
        </Card>
    )
}

