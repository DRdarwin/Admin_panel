"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define the props interface for LineChartComponent
interface LineChartComponentProps {
  data: any[] // Expecting data prop as array of objects, refine type later if needed
}

const chartConfig = {
  // Keep chartConfig as it seems to be used for styling
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function LineChartComponent({ data }: LineChartComponentProps) {
  // Destructure data prop

  // Use the data prop instead of hardcoded chartData
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Data from prop</CardDescription>{" "}
        {/* Updated Description */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data} // Use data prop here
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month" // Assuming data has 'month' property, adjust if needed
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value?.toString().slice(0, 3)} // Safe slice as value can be undefined
            />
            <YAxis /> {/* Added YAxis for completeness */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop" // Assuming data has 'desktop' property, adjust if needed
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="size-4" />{" "}
          {/* Keep the footer part */}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months{" "}
          {/* Keep the footer part */}
        </div>
      </CardFooter>
    </Card>
  )
}

export default LineChartComponent
