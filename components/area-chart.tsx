"use client"

import { TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface ChartData {
  month: string
  desktop: number
  mobile: number
}

const chartData: ChartData[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

interface TooltipPayload {
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { name: string; value: number }[]
  label?: string | number
}

const CustomTooltipContent = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded bg-white p-2 shadow">
        {label && <p className="label font-medium">{label}</p>}
        {payload.map((item, index) => (
          <p
            key={index}
            className="intro text-sm"
          >{`${item.name}: ${item.value}`}</p>
        ))}
      </div>
    )
  }

  return null
}

export function Component(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData && chartData.length > 0 ? ( // Перевірка наявності даних
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<CustomTooltipContent />}
                />
                <Area
                  dataKey="mobile"
                  type="monotone"
                  fill="var(--chart-2)"
                  fillOpacity={0.4}
                  stroke="var(--chart-2)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="monotone"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div>Loading data...</div> // Повідомлення про завантаження даних
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="size-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
