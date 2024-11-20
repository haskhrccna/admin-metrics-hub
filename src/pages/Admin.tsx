import React from 'react';
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const Admin = () => {
  const { data: visitorStats, isLoading } = useQuery({
    queryKey: ['visitorStats'],
    queryFn: async () => {
      console.log('Fetching visitor statistics...');
      const { data: visitors, error } = await supabase
        .from('visitors')
        .select('*')
        .order('visited_at', { ascending: false });

      if (error) {
        console.error('Error fetching visitors:', error);
        throw error;
      }

      // Process visitor data
      const totalVisitors = visitors?.length || 0;
      const pageViews = visitors?.reduce((acc: any, curr: any) => {
        acc[curr.page_url] = (acc[curr.page_url] || 0) + 1;
        return acc;
      }, {});

      // Group by date for daily visits
      const dailyVisits = visitors?.reduce((acc: any, curr: any) => {
        const date = new Date(curr.visited_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return {
        totalVisitors,
        pageViews: Object.entries(pageViews).map(([url, count]) => ({
          url,
          views: count
        })),
        dailyVisits: Object.entries(dailyVisits).map(([date, count]) => ({
          date,
          visitors: count
        }))
      };
    }
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">Loading analytics...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-white mb-8">Website Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Total Visitors</h3>
          <p className="text-3xl font-bold">{visitorStats?.totalVisitors || 0}</p>
        </Card>
        
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Most Visited Page</h3>
          <p className="text-xl font-bold">
            {visitorStats?.pageViews?.[0]?.url || 'N/A'}
          </p>
          <p className="text-sm text-gray-400">
            {visitorStats?.pageViews?.[0]?.views || 0} views
          </p>
        </Card>
        
        <Card className="p-6 bg-slate-800 text-white">
          <h3 className="text-lg font-medium mb-2">Today's Visitors</h3>
          <p className="text-3xl font-bold">
            {visitorStats?.dailyVisits?.[0]?.visitors || 0}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-slate-800">
          <h3 className="text-lg font-medium mb-4 text-white">Daily Visitors Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorStats?.dailyVisits || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
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
          <h3 className="text-lg font-medium mb-4 text-white">Page Views Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorStats?.pageViews || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="url" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="views" fill="#8884d8">
                  {(visitorStats?.pageViews || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;