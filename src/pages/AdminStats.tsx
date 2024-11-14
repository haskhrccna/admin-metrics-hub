import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const mockData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

const statsCards = [
  { title: "Total Users", value: "12,345", icon: Users, change: "+12%" },
  { title: "Revenue", value: "$45,678", icon: DollarSign, change: "+8%" },
  { title: "Orders", value: "1,234", icon: ShoppingCart, change: "+15%" },
  { title: "Growth", value: "23%", icon: TrendingUp, change: "+5%" },
];

const AdminStats = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">Dashboard</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Admin Statistics</h1>
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
                      className="flex items-center text-green-500 text-sm"
                    >
                      {card.change}
                      <ArrowUpRight className="w-4 h-4 ml-1" />
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Growth Overview</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;