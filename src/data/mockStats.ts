import { LocationData, TrafficData, TimeSeriesData } from "@/types/statistics";

export const visitorStats = {
  total: 145789,
  change: "+12.5%",
  trend: "up" as const,
};

export const locationData: LocationData[] = [
  { country: "United States", visitors: 45000, percentage: 35 },
  { country: "United Kingdom", visitors: 25000, percentage: 20 },
  { country: "Germany", visitors: 20000, percentage: 15 },
  { country: "France", visitors: 15000, percentage: 12 },
  { country: "Others", visitors: 23000, percentage: 18 },
];

export const trafficData: TrafficData[] = [
  { source: "Direct", visitors: 50000, percentage: 40 },
  { source: "Organic Search", visitors: 35000, percentage: 28 },
  { source: "Social Media", visitors: 25000, percentage: 20 },
  { source: "Referral", visitors: 15000, percentage: 12 },
];

export const timeSeriesData: TimeSeriesData[] = [
  { name: "Jan", visitors: 4000, pageViews: 6000 },
  { name: "Feb", visitors: 3500, pageViews: 5500 },
  { name: "Mar", visitors: 5000, pageViews: 7000 },
  { name: "Apr", visitors: 4500, pageViews: 6500 },
  { name: "May", visitors: 6000, pageViews: 8000 },
  { name: "Jun", visitors: 5500, pageViews: 7500 },
];