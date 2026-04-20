import { API_BASE_URL } from "@/constants/api";
import {
  DashboardSummary,
  FilterParams,
  RegionData,
  Report,
  TrendPoint,
  DemographicBreakdown,
} from "@/types/Report";

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function buildQuery(params: FilterParams): string {
  const q = new URLSearchParams();
  if (params.substanceType) q.set("substanceType", params.substanceType);
  if (params.yearFrom) q.set("yearFrom", String(params.yearFrom));
  if (params.yearTo) q.set("yearTo", String(params.yearTo));
  if (params.region) q.set("region", params.region);
  if (params.ageGroup) q.set("ageGroup", params.ageGroup);
  if (params.source) q.set("source", params.source);
  return q.toString() ? `?${q.toString()}` : "";
}

export async function fetchDashboardSummary(token: string): Promise<DashboardSummary> {
  const res = await fetch(`${API_BASE_URL}/dashboard/summary`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`Error al obtener resumen: ${res.status}`);
  return res.json();
}

export async function fetchTrends(params: FilterParams, token: string): Promise<TrendPoint[]> {
  const res = await fetch(`${API_BASE_URL}/analytics/trends${buildQuery(params)}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Error al obtener tendencias: ${res.status}`);
  return res.json();
}

export async function fetchRegions(params: FilterParams, token: string): Promise<RegionData[]> {
  const res = await fetch(`${API_BASE_URL}/analytics/regions${buildQuery(params)}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Error al obtener regiones: ${res.status}`);
  return res.json();
}

export async function fetchDemographics(
  params: FilterParams,
  token: string
): Promise<DemographicBreakdown[]> {
  const res = await fetch(`${API_BASE_URL}/analytics/demographics${buildQuery(params)}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Error al obtener demografía: ${res.status}`);
  return res.json();
}

export async function fetchReports(token: string): Promise<Report[]> {
  const res = await fetch(`${API_BASE_URL}/reports`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`Error al obtener reportes: ${res.status}`);
  return res.json();
}

export async function createReport(
  data: Pick<Report, "title" | "description" | "substanceType" | "year" | "source">,
  token: string
): Promise<Report> {
  const res = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error al crear reporte: ${res.status}`);
  return res.json();
}
