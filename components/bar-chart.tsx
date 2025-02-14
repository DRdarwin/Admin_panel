"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface BarChartProps {
  data: { name: string; value: number }[]
  color?: string
}

export default function BarChart({ data, color = "#4F46E5" }: BarChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[5, 5, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
