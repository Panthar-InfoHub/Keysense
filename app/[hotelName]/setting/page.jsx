import GeneralCard from '@/components/GeneralCard'
import InfoCard from '@/components/InfoCard'
import SecurityCard from '@/components/SecurityCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const page = () => {
  return (
    <section className='py-14 px-4 w-full overflow-hidden' >

      <h1 className='text-2xl font-bold' > Dashboard </h1>
      <Tabs defaultValue="info" className="grid md:grid-cols-body h-full">
        <TabsList className="text-sm flex flex-col gap-4" >
          <TabsTrigger value="info"  >Info</TabsTrigger>
          <TabsTrigger value="general"  >General</TabsTrigger>
          <TabsTrigger value="security"  >Security</TabsTrigger>
        </TabsList>
        <TabsContent value="info"> <InfoCard /> </TabsContent>
        <TabsContent value="general"> <GeneralCard /> </TabsContent>
        <TabsContent value="security"> <SecurityCard /> </TabsContent>
      </Tabs>
    </section>
  )
}

export default page