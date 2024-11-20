import React from 'react';
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Admin = () => {
  // Mock data - replace with real API calls
  const { data: visitorStats } = useQuery({
    queryKey: ['visitorStats'],
    queryFn: async () => ({
      totalVisitors: 1234,
      pageViews: 5678,
      locations: [
        { country: 'USA', visitors: 500 },
        { country: 'UK', visitors: 300 },
        { country: 'Canada', visitors: 200 },
        { country: 'Others', visitors: 234 }
      ],
      dailyVisits: [
        { date: '2024-01-01', visitors: 100 },
        { date: '2024-01-02', visitors: 120 },
        { date: '2024-01-03', visitors: 150 },
        { date: '2024-01-04', visitors: 130 },
        { date: '2024-01-05', visitors: 180 }
      ]
    })
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  console.log('Admin page loaded with visitor stats:', visitorStats);

  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-white mb-8">Website Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Total Visitors</h3>
          <p className="text-3xl font-bold">{visitorStats?.totalVisitors || 0}</p>
        </Card>
        
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Page Views</h3>
          <p className="text-3xl font-bold">{visitorStats?.pageViews || 0}</p>
        </Card>
        
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Avg. Time on Site</h3>
          <p className="text-3xl font-bold">3m 45s</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-800">
          <h3 className="text-lg font-medium mb-4 text-white">Daily Visitors</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorStats?.dailyVisits || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800">
          <h3 className="text-lg font-medium mb-4 text-white">Visitor Locations</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visitorStats?.locations || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="visitors"
                >
                  {visitorStats?.locations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;