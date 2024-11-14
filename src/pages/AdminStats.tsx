import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const lineChartData = [
  { name: "Jan", ipsum: 400, dolor: 240 },
  { name: "Feb", ipsum: 300, dolor: 450 },
  { name: "Mar", ipsum: 550, dolor: 350 },
  { name: "Apr", ipsum: 450, dolor: 500 },
  { name: "May", ipsum: 600, dolor: 300 },
  { name: "Jun", ipsum: 400, dolor: 450 },
];

const barChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 550 },
  { name: "Apr", value: 450 },
  { name: "May", value: 600 },
  { name: "Jun", value: 400 },
];

const pieChartData = [
  { name: "Lorem", value: 70 },
  { name: "Ipsum", value: 30 },
];

const AdminStats = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stats Cards */}
        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Lorem ipsum</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">1974</span>
                  <span className="ml-2 text-green-500">↑</span>
                </div>
                <span className="text-xs text-muted-foreground">Dolor sit amet, consectetur adipiscing</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Sed fugit</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">287</span>
                  <span className="ml-2 text-red-500">↓</span>
                </div>
                <span className="text-xs text-muted-foreground">Nulla facilisi at vero</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="md:col-span-4">
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Progress and Search */}
        <Card className="md:col-span-5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Commodo</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Dolor sit amet</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ipsum" stroke="#8884d8" />
                <Line type="monotone" dataKey="dolor" stroke="#ffa07a" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Adipiscing</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ffa07a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Charts */}
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Consectetur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="ipsum" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;