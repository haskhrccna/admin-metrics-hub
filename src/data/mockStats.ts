import { Statistic } from "@/types/statistics";

export const mockStats: Statistic[] = [
  {
    id: 1,
    title: "Total Visitors",
    value: "15,234",
    description: "Active visitors in the last 30 days"
  },
  {
    id: 2,
    title: "Page Views",
    value: "45,678",
    description: "Total page views this month"
  },
  {
    id: 3,
    title: "Bounce Rate",
    value: "32%",
    description: "Average bounce rate"
  }
];

export const visitorLocationData = [
  { name: "United States", value: 40 },
  { name: "United Kingdom", value: 20 },
  { name: "Germany", value: 15 },
  { name: "France", value: 10 },
  { name: "Others", value: 15 }
];

export const pageViewsData = [
  { name: "Mon", views: 2400 },
  { name: "Tue", views: 1398 },
  { name: "Wed", views: 3800 },
  { name: "Thu", views: 3908 },
  { name: "Fri", views: 4800 },
  { name: "Sat", views: 3800 },
  { name: "Sun", views: 4300 }
];

export const visitorDeviceData = [
  { name: "Desktop", value: 60 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 10 }
];