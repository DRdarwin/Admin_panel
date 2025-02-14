"use client";

import { useEffect, useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { Menubar } from "@/components/ui/menubar";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/data-table";
import BarChart from "@/components/bar-chart"; // Assuming BarChart expects 'data' prop
import LineChart from "@/components/line-chart"; // Assuming LineChart expects 'data' prop
// import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function Page() {
  const [flights, setFlights] = useState<any[] | undefined>();
  const [transactions, setTransactions] = useState<any[] | undefined>();
  const [users, setUsers] = useState<any[] | undefined>();

  // Move useMemo hooks before the conditional return
  const financeSummary = useMemo(() => {
    const totalRevenue = (transactions || []).filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    return { totalRevenue };
  }, [transactions]);

  const flightSummary = useMemo(() => {
    const passengers = (flights || []).reduce((sum, flight) => sum + (flight.passengers || 0), 0);
    const flightHours = (flights || []).reduce((sum, flight) => sum + (flight.hours || 0), 0);
    const flightsPerformed = (flights || []).length;
    return { passengers, flightHours, flightsPerformed };
  }, [flights]);

  // Define columns for DataTable - assuming flight data structure - MOVE BEFORE CONDITIONAL RETURN
  const columns = useMemo(() => [
    {
      label: 'Flight ID', // Changed header to label
      key: 'id',      // Changed accessorKey to key
    },
    {
      label: 'Departure', // Changed header to label
      key: 'departure', // Changed accessorKey to key
    },
    {
      label: 'Arrival',  // Changed header to label
      key: 'arrival',   // Changed accessorKey to key
    },
    {
      label: 'Hours',   // Changed header to label
      key: 'hours',     // Changed accessorKey to key
    },
    {
      label: 'Passengers', // Changed header to label
      key: 'passengers',// Changed accessorKey to key
    },
    // Add more columns as needed based on your flight data structure
  ], []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsRes = await fetch("/admin/flights/raw");
        setFlights(await flightsRes.json());

        const transactionsRes = await fetch("/admin/finance/raw");
        setTransactions(await transactionsRes.json());

        const usersRes = await fetch("/admin/users/raw");
        setUsers(await usersRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (flights === undefined || transactions === undefined || users === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* <Progress value={50} className="w-3/5" /> */}
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
                <DataTable data={flights} columns={columns} />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
