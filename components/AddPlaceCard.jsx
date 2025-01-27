import { Images } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const AddPlaceCard = () => {
    return (
        <div className=' w-full flex' >
            <div className='w-full flex justify-center items-center bg-muted cursor-pointer' >
                <label htmlFor="" className='text-white/40' > <Images /> <span> Upload Here... </span> </label>
                <input type="file" />
            </div>

            <div className='w-full flex flex-col' >
                <div className='p-4 bg-muted/50' >
                    <h3 className='font-semibold' > Add Place </h3>
                </div>

                <div className='flex flex-col gap-6 p-4  bg-black' >
                    <h3 className='' > Place Details </h3>
                    <div>
                        <label className='text-white/60' > Name </label>
                        <Input id="name" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Address </label>
                        <Input id="name" className="bg-transparent border-gray-800 text-white" />
                    </div>
                    <div>
                        <label className='text-white/60' > Distance </label>
                        <Input id="name" className="bg-transparent border-gray-800 text-white" placeholder="Ex: 5km, 500m" />
                    </div>
                    <div>
                        <label className='text-white/60' > Location Link </label>
                        <Input id="name" className="bg-transparent border-gray-800 text-white" placeholder="Ex: https://www.google.com/maps/" />
                    </div>
                </div>

                <div className='w-full justify-between items-center flex p-4 bg-muted/50 ' >
                    <div>
                        Cancel
                    </div>
                    <Button className="!text-xs !p-2" > Create </Button>
                </div>
            </div>
        </div>
    )
}

export default AddPlaceCard
