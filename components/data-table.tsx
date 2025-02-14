"use client"

import { useMemo, useState } from "react"

interface DataTableProps {
  data: { [key: string]: any }[]
  columns: { key: string; label: string }[]
}

export default function DataTable({ data, columns }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Мемоізація відсортованих даних для оптимізації продуктивності
  const sortedData = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortKey, sortOrder])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="cursor-pointer px-4 py-2"
                onClick={() => handleSort(col.key)}
              >
                {col.label}{" "}
                {sortKey === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
