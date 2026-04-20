export type DataSource = "ENSANUT" | "STATIN" | "OPS" | "INEGI" | "SSA" | "OMS";

export type AgeGroup = "12-17" | "18-24" | "25-34" | "35-44" | "45-59" | "60+";

export type SubstanceType = "TOBACCO" | "VAPING" | "BOTH";

export type TrendPoint = {
  year: number;
  value: number;
  label?: string;
};

export type RegionData = {
  regionId: string;
  regionName: string;
  state?: string;
  prevalence: number;
  totalCases: number;
  change: number; // % vs previous period
};

export type DemographicBreakdown = {
  ageGroup: AgeGroup;
  male: number;
  female: number;
  total: number;
};

export type Report = {
  id: string;
  title: string;
  description: string;
  substanceType: SubstanceType;
  year: number;
  source: DataSource;
  createdAt: string;
  createdBy: string;
  status: "DRAFT" | "PUBLISHED";
};

export type DashboardSummary = {
  totalPrevalence: number;
  prevalenceChange: number;
  activeUsers: number;
  reportsGenerated: number;
  lastUpdated: string;
};

export type FilterParams = {
  substanceType?: SubstanceType;
  yearFrom?: number;
  yearTo?: number;
  region?: string;
  ageGroup?: AgeGroup;
  source?: DataSource;
};
