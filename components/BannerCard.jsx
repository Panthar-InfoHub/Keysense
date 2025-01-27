"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Images } from "lucide-react"

export default function BannerCard() {
    return (
        <Card className="w-full bg-[#1C1C1C] text-white !border-none">
            <CardHeader className="p-4" >
                <CardTitle className="text-base font-normal">Add Banner</CardTitle>
            </CardHeader>
            <CardContent className="!p-0">
                <div className="flex flex-col items-center justify-center h-[5rem] border-y border-gray-600 bg-[#242424] cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex flex-col items-center space-y-2">
                        <Images />
                        <span className="text-gray-400">Upload Here..</span>
                    </div>
                </div>

                <div className="bg-black/60 px-4 py-2 flex flex-col gap-4">
                    <h3 className="text-sm font-medium">Banner Details</h3>

                    <div className="space-y-2">
                        <label htmlFor="title">Title</label>
                        <Input id="title" className="bg-[#242424] border-gray-600 focus:border-gray-400" />
                    </div>

                    <div className="space-y-2 ">
                        <label>Banner Placement</label>
                        <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="home" defaultChecked />
                                <label htmlFor="home">Home</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="menu" />
                                <label htmlFor="menu">Menu</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label>Status</label>
                        <Select>
                            <SelectTrigger className="w-full bg-[#242424] border-gray-600">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center w-full p-2">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Cancel
                </Button>
                <Button className="!text-xs !p-4" >Create</Button>
            </CardFooter>
        </Card>
    )
}

