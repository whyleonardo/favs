"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { toast } from "sonner"

import type { CSSVariableColorState, Colors, ComponentPrefix } from "../types"
import { COLORS } from "../utils"

interface ColorsTableProps {
  data: CSSVariableColorState[]
}

const colorMap: Record<ComponentPrefix, Colors> = {
  sidebar: COLORS[7],
  common: COLORS[13],
  chart: COLORS[15],
}

export const columns: ColumnDef<CSSVariableColorState>[] = [
  {
    accessorKey: "key",
    header: "component",
    cell: (cell) => {
      const key = cell.getValue() as ComponentPrefix
      return (
        <Badge className="rounded-full" color={colorMap[key]} size="xs">
          {key}
        </Badge>
      )
    },
  },
  {
    accessorKey: "color.name",
    header: "name",
    cell: (cell) => {
      const name = cell.getValue() as string
      return <span className="font-semibold">{name}</span>
    },
  },
  {
    accessorKey: "color.value",
    header: "value",
    cell: (cell) => {
      const value = cell.getValue() as string

      return (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(value)
            toast.success("copied to clipboard")
          }}
        >
          <div
            className="border-foreground/20 size-4 rounded-sm border"
            style={{
              backgroundColor: value,
            }}
          />

          <span>{value}</span>
        </button>
      )
    },
  },
]

export const ColorsTable = ({ data }: ColorsTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="h-[calc(100dvh-8rem)] overflow-y-scroll rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="h-10"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
  )
}
