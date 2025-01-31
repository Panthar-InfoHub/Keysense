"use client"
import AddMenu from "@/components/AddMenu"
import MenuCard from "@/components/MenuCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getHotelMenu } from "@/lib/actions"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Page = () => {
    const [allMenuItems, setAllMenuItems] = useState([])
    const [displayedMenu, setDisplayedMenu] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 20

    useEffect(() => {
        const fetchMenu = async () => {
            setIsLoading(true)
            try {
                const res = await getHotelMenu({ page: 1, per_page: 50 }) // Fetch all items
                if (res.status === "SUCCESS") {
                    setAllMenuItems(res.data)
                    setTotalPages(Math.ceil(res.data.length / itemsPerPage))
                }
            } catch (error) {
                console.error("Error fetching menu:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMenu()
    }, [])

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setDisplayedMenu(allMenuItems.slice(startIndex, endIndex))
    }, [currentPage, allMenuItems])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <section className="py-14 px-4 w-full overflow-hidden">
            <div className="flex justify-between w-full">
                <div>
                    <h1 className="text-xl font-bold">Menu</h1>
                    <p className="text-xs text-white/80">Manage your food menu for your customers.</p>
                </div>
                <div className="">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="text-xs">
                                <span className="hidden md:flex">Add Dish</span> <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full sm:max-w-[50%] !text-xs !p-0 !border-none rounded-xl overflow-hidden">
                            <AddMenu setOpen={setOpen} setTotalPages={setTotalPages} setAllMenuItems={setAllMenuItems} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-8">
                {isLoading
                    ? [0, 1, 2, 3].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="!border-none !p-0">
                                <Skeleton className="h-[100px] w-full" />
                            </CardContent>
                        </Card>
                    ))
                    : displayedMenu.map((card, i) => <MenuCard setTotalPages={setTotalPages} setAllMenuItems={setAllMenuItems} card={card} key={i} />)}
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    )
}

export default Page

