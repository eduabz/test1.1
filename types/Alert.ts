export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  region: string;
  createdAt: string;
  read: boolean;
};
