import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { PUNE_CENTER, riskZones, riskLabel, type RiskLevel } from "@/data/puneRiskData";

const colorFor: Record<RiskLevel, string> = {
  low: "#4ade80",
  med: "#facc15",
  high: "#fb923c",
  critical: "#ef4444",
};

function pulseIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:18px;height:18px;">
      <div style="position:absolute;inset:0;border-radius:9999px;background:${color};box-shadow:0 0 16px ${color};"></div>
      <div style="position:absolute;inset:-6px;border-radius:9999px;border:2px solid ${color};opacity:0.6;animation:pulse-ring 2s ease-out infinite;"></div>
    </div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

interface Props {
  filter: RiskLevel | "all";
  onSelect?: (id: string) => void;
}

export function RiskMap({ filter, onSelect }: Props) {
  const zones = useMemo(
    () => (filter === "all" ? riskZones : riskZones.filter((z) => z.risk === filter)),
    [filter]
  );

  return (
    <MapContainer
      center={PUNE_CENTER}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zones.flatMap((z) => {
        const c = colorFor[z.risk];
        return [
          <Circle
            key={`${z.id}-c`}
            center={[z.lat, z.lng]}
            radius={z.radius}
            pathOptions={{
              color: c,
              fillColor: c,
              fillOpacity: z.risk === "critical" ? 0.35 : z.risk === "high" ? 0.28 : 0.18,
              weight: 1.5,
            }}
            eventHandlers={{ click: () => onSelect?.(z.id) }}
          />,
          <Marker
            key={`${z.id}-m`}
            position={[z.lat, z.lng]}
            icon={pulseIcon(c)}
            eventHandlers={{ click: () => onSelect?.(z.id) }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{z.name}</div>
                <div style={{ opacity: 0.7, fontSize: 12, marginBottom: 8 }}>{z.area}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span>Risk:</span>
                  <strong style={{ color: c }}>{riskLabel[z.risk]} ({z.score})</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span>Recent incidents:</span>
                  <strong>{z.recentIncidents}</strong>
                </div>
              </div>
            </Popup>
          </Marker>,
        ];
      })}
    </MapContainer>
  );
}
