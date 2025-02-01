"use client"

import React from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const columns = [
  {
    accessorKey: "acf.guest_name",
    header: "Customer",
  },
  {
    accessorKey: "acf.guest_id",
    header: "Guest ID",
  },
  {
    accessorKey: "acf.status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue()
      return (
        <div
          className={`px-2 py-1 rounded-full text-center ${status.toLowerCase() === "approved" ? "bg-green-500/20 text-green-200" : "bg-red-500 text-white"}`}
        >
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "acf.rooms",
    header: "Rooms",
  },
  {
    accessorKey: "acf.check_in",
    header: "Check In",
    cell: ({ getValue }) => {
      const date = new Date(getValue())
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "acf.chech_out",
    header: "Check Out",
    cell: ({ getValue }) => {
      const date = new Date(getValue())
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "acf.hotel_id",
    header: "Hotel ID",
  },
]

export const RecentTable = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs" >{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

