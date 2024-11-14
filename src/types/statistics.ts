export interface VisitorStats {
  total: number;
  change: string;
  trend: "up" | "down";
}

export interface LocationData {
  country: string;
  visitors: number;
  percentage: number;
}

export interface TrafficData {
  source: string;
  visitors: number;
  percentage: number;
}

export interface TimeSeriesData {
  name: string;
  visitors: number;
  pageViews: number;
}