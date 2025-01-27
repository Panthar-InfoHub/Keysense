"use client"

import React, { useState } from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const dummyData = [
    {
        id: "1",
        customer: "John Doe",
        status: "Checked In",
        rooms: "101, 102",
        checkIn: "2023-06-01",
        checkOut: "2023-06-05",
    },
    {
        id: "2",
        customer: "Jane Smith",
        status: "Reserved",
        rooms: "203",
        checkIn: "2023-06-10",
        checkOut: "2023-06-15",
    },
    {
        id: "3",
        customer: "Bob Johnson",
        status: "Checked Out",
        rooms: "305",
        checkIn: "2023-05-28",
        checkOut: "2023-06-02",
    },
    {
        id: "4",
        customer: "Alice Brown",
        status: "In Progress",
        rooms: "401, 402, 403",
        checkIn: "2023-06-05",
        checkOut: "2023-06-12",
    },
    {
        id: "5",
        customer: "Charlie Wilson",
        status: "Cancelled",
        rooms: "504",
        checkIn: "2023-06-20",
        checkOut: "2023-06-25",
    },
]

const columns = [
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "rooms",
        header: "Rooms",
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "checkIn",
        header: "Check In",
    },
    {
        accessorKey: "checkOut",
        header: "Check Out",
    },
]

export const RecentTable = () => {
    const [data] = useState(dummyData)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <div className="rounded-md border border-white/30">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-xs" >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-xs" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}