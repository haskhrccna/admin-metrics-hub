import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, Globe, MousePointer, TrendingUp } from "lucide-react";
import { visitorStats, locationData, trafficData, timeSeriesData } from "@/data/mockStats";

const COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#7c3aed", "#6366f1"];

const AdminStats = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const statsCards = [
    { 
      title: "Total Visitors", 
      value: visitorStats.total.toLocaleString(), 
      icon: Users,
      change: visitorStats.change,
      trend: visitorStats.trend 
    },
    { 
      title: "Top Location", 
      value: locationData[0].country, 
      icon: Globe,
      change: `${locationData[0].percentage}%`,
      trend: "up" 
    },
    { 
      title: "Main Traffic Source", 
      value: trafficData[0].source, 
      icon: MousePointer,
      change: `${trafficData[0].percentage}%`,
      trend: "up" 
    },
    { 
      title: "Growth Rate", 
      value: "23%", 
      icon: TrendingUp,
      change: "+5%",
      trend: "up" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">Dashboard</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Visitor Statistics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <motion.div
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                      }}
                      className={`flex items-center ${
                        card.trend === "up" ? "text-green-500" : "text-red-500"
                      } text-sm`}
                    >
                      {card.change}
                      {card.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 ml-1" />
                      )}
                    </motion.div>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </h3>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Visitor Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Visitor Locations</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="visitors"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {locationData.map((location, index) => (
                <div key={location.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{location.country}</span>
                  </div>
                  <span className="font-medium">{location.visitors.toLocaleString()} visitors</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;