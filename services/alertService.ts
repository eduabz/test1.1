import { API_BASE_URL } from "@/constants/api";
import { Alert } from "@/types/Alert";

function authHeaders(token: string): HeadersInit {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export async function fetchAlerts(token: string): Promise<Alert[]> {
  const res = await fetch(`${API_BASE_URL}/alerts`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`Error al obtener alertas: ${res.status}`);
  return res.json();
}

export async function markAlertRead(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/alerts/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Error al marcar alerta: ${res.status}`);
}
