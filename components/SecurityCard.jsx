import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

const SecurityCard = () => {
    return (
        <Card className="w-full bg-background text-white">
            <CardHeader className="p-4"  >
                <CardTitle className="text-2xl">Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 !text-xs !text-white">
                <form action="">
                    <div className="space-y-4">

                        <div className="space-y-2">
                            <label htmlFor="new" className=""> New Password </label>
                            <Input id="new" className="bg-transparent border-gray-800 text-white" placeholder="" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm" className=""> Confirm Password </label>
                            <Input id="confirm" className="bg-transparent border-gray-800 text-white" placeholder="" />
                        </div>
                    </div>

                    <Button className="text-xs w-fit mt-5" > Save </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default SecurityCard