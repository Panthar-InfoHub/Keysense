import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

const page = () => {
    return (
        <section className='py-14 px-4 w-full overflow-hidden' >
            <div>
                <h1 className='text-xl font-bold' > Reservations </h1>
                <div className="mt-6" >
                    <form action="" className="flex gap-2 w-full md:w-1/2" >
                        <Select defaultValue="Select" >
                            <SelectTrigger className="w-[180px]">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="test">Test</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input id="name" className="bg-transparent text-white" placeholder="Search..." />
                    </form>
                </div>
            </div>

        </section>
    )
}

export default page