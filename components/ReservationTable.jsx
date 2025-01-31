"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ReservationTable({ reservations = [] }) {
  const [searchField, setSearchField] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReservations = reservations.filter((reservation) => {
    const searchValue = searchQuery.toLowerCase()
    switch (searchField) {
      case "name":
        return reservation.acf?.guest_name?.toLowerCase().includes(searchValue) ?? false
      case "phone":
        return reservation.acf?.guest_number?.toLowerCase().includes(searchValue) ?? false
      case "id":
        return reservation.acf?.guest_id?.toLowerCase().includes(searchValue) ?? false
      default:
        return true
    }
  })

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString()
  }

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex gap-2">
        <Select defaultValue="name" onValueChange={setSearchField}>
          <SelectTrigger className="w-[100px] bg-[#1c1c1c] border-0">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent className="bg-[#1c1c1c] border-gray-800">
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="id">ID</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder={`Search by ${searchField}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-[#1c1c1c] border-0 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="rounded-lg border text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Peoples</TableHead>
              <TableHead className="text-gray-400">Rooms</TableHead>
              <TableHead className="text-gray-400">Phone</TableHead>
              <TableHead className="text-gray-400">ID</TableHead>
              <TableHead className="text-gray-400">Check In</TableHead>
              <TableHead className="text-gray-400">Check Out</TableHead>
              <TableHead className="w-[28px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="!text-xs" >
            {filteredReservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-400">
                  No reservations found
                </TableCell>
              </TableRow>
            ) : (
              filteredReservations.map((reservation) => (
                <TableRow key={reservation.id} className="!text-xs border-gray-800 hover:bg-gray-800/50">
                  <TableCell className="font-medium text-white">{reservation.acf?.guest_name || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(reservation.acf?.status)}>
                      {reservation.acf?.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{reservation.acf?.number_Of_People || "N/A"}</TableCell>
                  <TableCell className="text-gray-300">{reservation.acf?.rooms || "N/A"}</TableCell>
                  <TableCell className="text-gray-300">{reservation.acf?.guest_number || "N/A"}</TableCell>
                  <TableCell className="text-gray-300">{reservation.acf?.guest_id || "N/A"}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(reservation.acf?.check_in)}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(reservation.acf?.chech_out)}</TableCell>
                  <TableCell>•••</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

