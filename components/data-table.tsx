"use client"

import { useMemo, useState } from "react"

interface DataTableProps {
  data: { [key: string]: any }[]
  columns: { key: string; label: string }[]
}

const DataTable = ({ columns, data }: DataTableProps) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr className="bg-gray-100">
        {columns.map((col) => (
          <th key={col.key} className="cursor-pointer px-4 py-2">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="bg-white">
          {columns.map((col) => (
            <td key={col.key} className="px-4 py-2">
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
