import { Card } from "@/components/ui/card";
import { mockStats } from "@/data/mockStats";

const AdminStats = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStats.map((stat) => (
          <Card key={stat.id} className="p-6">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;