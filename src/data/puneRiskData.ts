export type RiskLevel = "low" | "med" | "high" | "critical";

export interface RiskZone {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  radius: number; // meters
  risk: RiskLevel;
  score: number; // 0-100
  factors: { traffic: number; weather: number; history: number; social: number };
  recentIncidents: number;
}

export const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

export const riskZones: RiskZone[] = [
  { id: "z1", name: "Katraj Tunnel", area: "Katraj", lat: 18.4575, lng: 73.8650, radius: 600, risk: "critical", score: 92,
    factors: { traffic: 88, weather: 72, history: 96, social: 81 }, recentIncidents: 7 },
  { id: "z2", name: "Hinjewadi IT Park Jn.", area: "Hinjewadi", lat: 18.5912, lng: 73.7389, radius: 800, risk: "critical", score: 89,
    factors: { traffic: 95, weather: 60, history: 84, social: 90 }, recentIncidents: 5 },
  { id: "z3", name: "Shivajinagar Square", area: "Shivajinagar", lat: 18.5308, lng: 73.8475, radius: 500, risk: "high", score: 78,
    factors: { traffic: 82, weather: 55, history: 80, social: 70 }, recentIncidents: 4 },
  { id: "z4", name: "Chandni Chowk", area: "Bavdhan", lat: 18.5167, lng: 73.7833, radius: 700, risk: "high", score: 75,
    factors: { traffic: 78, weather: 65, history: 76, social: 68 }, recentIncidents: 3 },
  { id: "z5", name: "Swargate Bus Stand", area: "Swargate", lat: 18.5018, lng: 73.8636, radius: 450, risk: "high", score: 72,
    factors: { traffic: 80, weather: 58, history: 70, social: 65 }, recentIncidents: 3 },
  { id: "z6", name: "Nagar Road Flyover", area: "Viman Nagar", lat: 18.5679, lng: 73.9143, radius: 600, risk: "med", score: 58,
    factors: { traffic: 65, weather: 50, history: 55, social: 60 }, recentIncidents: 2 },
  { id: "z7", name: "Sinhagad Road", area: "Wadgaon", lat: 18.4655, lng: 73.8200, radius: 700, risk: "med", score: 55,
    factors: { traffic: 60, weather: 62, history: 52, social: 48 }, recentIncidents: 2 },
  { id: "z8", name: "Baner Main Road", area: "Baner", lat: 18.5590, lng: 73.7868, radius: 550, risk: "med", score: 52,
    factors: { traffic: 68, weather: 45, history: 50, social: 50 }, recentIncidents: 1 },
  { id: "z9", name: "Koregaon Park Lane 5", area: "Koregaon Park", lat: 18.5362, lng: 73.8939, radius: 400, risk: "low", score: 32,
    factors: { traffic: 40, weather: 35, history: 30, social: 28 }, recentIncidents: 0 },
  { id: "z10", name: "Aundh Gaothan", area: "Aundh", lat: 18.5593, lng: 73.8077, radius: 450, risk: "low", score: 28,
    factors: { traffic: 35, weather: 30, history: 28, social: 25 }, recentIncidents: 0 },
  { id: "z11", name: "Kharadi Bypass", area: "Kharadi", lat: 18.5515, lng: 73.9410, radius: 700, risk: "high", score: 70,
    factors: { traffic: 76, weather: 55, history: 72, social: 64 }, recentIncidents: 3 },
  { id: "z12", name: "Pashan-Sus Road", area: "Pashan", lat: 18.5380, lng: 73.7910, radius: 500, risk: "med", score: 48,
    factors: { traffic: 55, weather: 50, history: 45, social: 40 }, recentIncidents: 1 },
];

export const riskColor: Record<RiskLevel, string> = {
  low: "var(--risk-low)",
  med: "var(--risk-med)",
  high: "var(--risk-high)",
  critical: "var(--risk-critical)",
};

export const riskLabel: Record<RiskLevel, string> = {
  low: "Low",
  med: "Moderate",
  high: "High",
  critical: "Critical",
};

export interface LiveIncident {
  id: string;
  time: string;
  type: string;
  area: string;
  source: "Crowdsourced" | "Twitter/X" | "Traffic API" | "Weather Alert";
  severity: RiskLevel;
}

export const liveFeed: LiveIncident[] = [
  { id: "i1", time: "2 min ago", type: "Pothole + waterlogging", area: "FC Road", source: "Crowdsourced", severity: "high" },
  { id: "i2", time: "5 min ago", type: "Heavy congestion", area: "Hinjewadi Phase 2", source: "Traffic API", severity: "high" },
  { id: "i3", time: "8 min ago", type: "Two-wheeler skid reported", area: "Katraj Ghat", source: "Twitter/X", severity: "critical" },
  { id: "i4", time: "11 min ago", type: "Heavy rain advisory", area: "Sinhagad Road", source: "Weather Alert", severity: "med" },
  { id: "i5", time: "14 min ago", type: "Signal outage", area: "Shivajinagar", source: "Crowdsourced", severity: "high" },
  { id: "i6", time: "19 min ago", type: "Truck breakdown - left lane", area: "Nagar Road", source: "Traffic API", severity: "med" },
  { id: "i7", time: "23 min ago", type: "Visibility low - fog", area: "Mulshi outskirts", source: "Weather Alert", severity: "med" },
];

export const cityStats = {
  activeRiskZones: riskZones.filter((z) => z.risk === "high" || z.risk === "critical").length,
  predictionAccuracy: 87.4,
  alertsToday: 142,
  incidentsPrevented: 23,
  citizenReports: 318,
  modelLatencyMs: 184,
};

export const hourlyRisk = [
  { h: "00", v: 38 }, { h: "02", v: 32 }, { h: "04", v: 28 }, { h: "06", v: 52 },
  { h: "08", v: 84 }, { h: "10", v: 71 }, { h: "12", v: 68 }, { h: "14", v: 65 },
  { h: "16", v: 76 }, { h: "18", v: 92 }, { h: "20", v: 81 }, { h: "22", v: 58 },
];
