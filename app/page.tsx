"use client";

import { useEffect, useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { Menubar } from "@/components/ui/menubar";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/data-table";
import BarChart from "@/components/bar-chart";
import LineChart from "@/components/line-chart";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function Page() {
  const [flights, setFlights] = useState<any[] | null>(null);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);

  const financeSummary = useMemo(() => {
    if (!transactions) return { totalRevenue: 0 };
    const totalRevenue = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    return { totalRevenue };
  }, [transactions]);

  const flightSummary = useMemo(() => {
    if (!flights) return { passengers: 0, flightHours: 0, flightsPerformed: 0 };
    const passengers = flights.reduce((sum, flight) => sum + (flight.passengers || 0), 0);
    const flightHours = flights.reduce((sum, flight) => sum + (flight.hours || 0), 0);
    const flightsPerformed = flights.length;
    return { passengers, flightHours, flightsPerformed };
  }, [flights]);

  useEffect(() => {
    fetch("/admin/flights/raw").then(res => res.json()).then(setFlights);
    fetch("/admin/finance/raw").then(res => res.json()).then(setTransactions);
    fetch("/admin/users/raw").then(res => res.json()).then(setUsers);
  }, []);

  if (!flights || !transactions || !users) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Progress value={50} className="w-3/5" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Menubar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Total Revenue</h2>
                <p className="text-3xl font-bold">${financeSummary.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500">+20.1% from last month</p>
                <LineChart data={transactions} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Passengers</h2>
                <p className="text-3xl font-bold">+{flightSummary.passengers}</p>
                <p className="text-sm text-gray-500">+180.1% from last month</p>
                <BarChart data={flights} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Flight Hours</h2>
                <p className="text-3xl font-bold">+{flightSummary.flightHours}</p>
                <p className="text-sm text-gray-500">+19% from last month</p>
                <LineChart data={flights} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Flights Performed</h2>
                <p className="text-3xl font-bold">+{flightSummary.flightsPerformed}</p>
                <p className="text-sm text-gray-500">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Overview</h2>
                <BarChart data={transactions} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-sm text-gray-400">Recent Flights</h2>
                <p className="text-sm text-gray-500">You made {flights.length} flights this month.</p>
                <DataTable data={flights} columns={[]} />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
