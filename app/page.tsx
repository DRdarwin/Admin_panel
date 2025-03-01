"use client"

import { useMemo, useState } from "react"
// TanStack React Table imports
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format, parseISO, subDays } from "date-fns"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
// Імпорти для Menubar
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LineChart from "@/components/line-chart"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

// =====================
// 1) Генератор випадкових даних (з flights):
// =====================
const generateMonthlyData = (referenceDate: Date) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(referenceDate, i)
    return {
      name: format(date, "MMM d"),
      revenue: Math.floor(Math.random() * 20000 + 5000),
      passengers: Math.floor(Math.random() * 300 + 50),
      flightHours: Math.floor(Math.random() * 100 + 10),
      flights: Math.floor(Math.random() * 10 + 1), // Додаємо виконані рейси
      date: format(date, "yyyy-MM-dd"),
    }
  }).reverse()
}

const pilotNames = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "Chris Brown",
  "Laura Wilson",
  "Daniel Miller",
  "Sarah Taylor",
]

const aircraftTypes = [
  "Boeing 737",
  "Airbus A320",
  "Embraer 175",
  "Cessna 208",
  "Boeing 787",
]

function getRandomPilot() {
  return pilotNames[Math.floor(Math.random() * pilotNames.length)]
}
function getRandomAircraftType() {
  return aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)]
}

// Тестові дані для таблиці (15 рядків)
const generatedFlightData = Array.from({ length: 15 }, (_, i) => {
  const date = subDays(new Date(), i)
  return {
    id: (i + 1).toString(),
    date: format(date, "yyyy-MM-dd"),
    totalRevenue: Math.floor(Math.random() * 20000 + 5000),
    passengers: Math.floor(Math.random() * 300 + 50),
    flightHours: Math.floor(Math.random() * 100 + 10),
    aircraftReg: `N${Math.floor(Math.random() * 900 + 100)}`,
    pilot: getRandomPilot(),
    aircraftType: getRandomAircraftType(),
    aircraftCapacity: Math.floor(Math.random() * 200 + 80),
  }
})

// =====================
// 2) Тип для рядка таблиці + колонки:
// =====================
export type FlightData = {
  id: string
  date: string
  totalRevenue: number
  passengers: number
  flightHours: number
  aircraftReg: string
  pilot: string
  aircraftType: string
  aircraftCapacity: number
}

const columns: ColumnDef<FlightData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-1 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span>{row.getValue("date")}</span>
    },
  },
  {
    accessorKey: "aircraftReg",
    header: "Aircraft Reg.",
    cell: ({ row }) => {
      return <span>{row.getValue("aircraftReg")}</span>
    },
  },
  {
    accessorKey: "pilot",
    header: "Pilot",
    cell: ({ row }) => {
      return <span>{row.getValue("pilot")}</span>
    },
  },
  {
    accessorKey: "aircraftType",
    header: "Aircraft Type",
    cell: ({ row }) => {
      return <span>{row.getValue("aircraftType")}</span>
    },
  },
  {
    accessorKey: "aircraftCapacity",
    header: () => <div className="text-right">Aircraft Capacity</div>,
    cell: ({ row }) => {
      const val = row.getValue("aircraftCapacity") as number
      return <div className="text-right">{val}</div>
    },
  },
  {
    accessorKey: "totalRevenue",
    header: () => <div className="text-right">Revenue</div>,
    cell: ({ row }) => {
      const val = row.getValue("totalRevenue") as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(val)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "passengers",
    header: () => <div className="text-right">Passengers</div>,
    cell: ({ row }) => {
      const val = row.getValue("passengers") as number
      return <div className="text-right">{val}</div>
    },
  },
  {
    accessorKey: "flightHours",
    header: () => <div className="text-right">Flight Hours</div>,
    cell: ({ row }) => {
      const val = row.getValue("flightHours") as number
      return <div className="text-right">{val}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const flight = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(flight.id)}
            >
              Copy Flight ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Flight</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// =====================
// 3) Компонент DataTableTanstack:
// =====================
function DataTableTanstack() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: generatedFlightData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter date..."
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("date")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

// =====================
// 4) Компонент MenubarDemo з кольорами (світла/темна тема):
// =====================
function MenubarDemo() {
  // className="bg-[var(--brand-color)] text-white"
  // – фоновий і текстовий колір через CSS-змінні
  // (див. приклад у globals.css нижче)

  return (
    <Menubar className="bg-[var(--brand-color)] text-white">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

// =====================
// 5) Основний компонент Page:
// =====================
export default function Page() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // referenceDate залежить від вибраної дати або сьогоднішньої
  const referenceDate = useMemo(
    () => (selectedDate ? parseISO(selectedDate) : new Date()),
    [selectedDate]
  )

  // Місячні дані (30 днів), включно з flights
  const monthlyData = useMemo(
    () => generateMonthlyData(referenceDate),
    [referenceDate]
  )

  // Знаходимо кількість рейсів за вибраний день
  const flightsForSelectedDay = useMemo(() => {
    const found = monthlyData.find(
      (d) => d.date === format(referenceDate, "yyyy-MM-dd")
    )
    return found ? found.flights : 0
  }, [monthlyData, referenceDate])

  return (
    <div className="flex text-xs">
      <SidebarProvider>
        <SidebarLeft />
        <div className="flex-1">
          {/* Використовуємо наш кастомний MenubarDemo */}
          <MenubarDemo />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {/* Три картки (зменшені на 20% по висоті) */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* 1) Total Revenue */}
                <Card className="h-4/5">
                  <CardContent className="p-4">
                    <h2 className="text-xs text-gray-400">Total Revenue</h2>
                    <p className="text-2xl font-bold">
                      $
                      {monthlyData
                        .reduce((sum, d) => sum + d.revenue, 0)
                        .toLocaleString()}
                    </p>
                    <LineChart
                      data={monthlyData.map((d) => ({
                        name: d.name,
                        value: d.revenue,
                      }))}
                    />
                  </CardContent>
                </Card>

                {/* 2) Completed Flights (замість Passengers) */}
                <Card className="h-4/5">
                  <CardContent className="p-4">
                    <h2 className="text-xs text-gray-400">Completed Flights</h2>
                    <p className="text-2xl font-bold">
                      {flightsForSelectedDay}
                    </p>
                    <LineChart
                      data={monthlyData.map((d) => ({
                        name: d.name,
                        value: d.flights,
                      }))}
                    />
                  </CardContent>
                </Card>

                {/* 3) Flight Hours */}
                <Card className="h-4/5">
                  <CardContent className="p-4">
                    <h2 className="text-xs text-gray-400">Flight Hours</h2>
                    <p className="text-2xl font-bold">
                      {monthlyData.reduce((sum, d) => sum + d.flightHours, 0)}
                    </p>
                    <LineChart
                      data={monthlyData.map((d) => ({
                        name: d.name,
                        value: d.flightHours,
                      }))}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Демонстраційна таблиця */}
              <div className="mt-6 rounded-lg bg-card p-4 text-card-foreground shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">
                  Recent Flights (Advanced DataTable)
                </h2>
                <DataTableTanstack />
              </div>
            </div>
          </SidebarInset>
        </div>
        <SidebarRight onDateSelect={setSelectedDate} />
      </SidebarProvider>
    </div>
  )
}
