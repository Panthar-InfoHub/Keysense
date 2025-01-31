'use client'
import GeneralCard from '@/components/GeneralCard'
import InfoCard from '@/components/InfoCard'
import SecurityCard from '@/components/SecurityCard'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchHotelByACF } from '@/lib/actions'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [setting, setSetting] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchHotelByACF();
        if (res.status == "SUCCESS") {
          setSetting(res?.data)
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  return (
    <section className='py-14 px-4 w-full overflow-hidden' >

      <h1 className='text-2xl font-bold' > Dashboard </h1>
      <Tabs defaultValue="info" className="grid md:grid-cols-body h-full">
        <TabsList className="text-sm flex flex-col gap-4" >
          <TabsTrigger value="info"  >Info</TabsTrigger>
          <TabsTrigger value="general"  >General</TabsTrigger>
          <TabsTrigger value="security"  >Security</TabsTrigger>
        </TabsList>


        <TabsContent value="info">
          {isLoading ? (
            [0, 1].map((_, i) => (
              <Card key={i} className="mt-8" >
                <CardContent className="!border-none !p-0 " >
                  <Skeleton className="h-[100px] w-full " />
                </CardContent>
              </Card>
            ))
          ) : (
            <InfoCard wifis={setting?.info?.wifi} setSetting={setSetting} defaultPitch={setting?.info?.about} />
          )}
        </TabsContent>

        <TabsContent value="general">
          <GeneralCard setSetting={setSetting} hotel={setting} />
        </TabsContent>


        <TabsContent value="security">
          <SecurityCard />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default page